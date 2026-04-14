import ErrorHandler from '../middleware/error.js'
import { catchAsyncError } from '../middleware/catchAsyncError.js'
import {User} from '../models/userModel.js'
import { sendEmail } from '../utilis/sendEmail.js';
import twilio from 'twilio';
import { SecondaryAuthTokenContextImpl } from 'twilio/lib/rest/accounts/v1/secondaryAuthToken.js';
import { sendToken} from '../utilis/sendToken.js';
import crypto from 'crypto';



export const register = catchAsyncError(async(req,res,next)=>{
    try{
        const {name,email,phone,password,verificationMethod} = req.body;
        if(!name || !email || !phone || !password || !verificationMethod){
            return next(new ErrorHandler('All fields are required',400));
        }
        function validatePhoneNumber(phone){
            const phoneRegex =/^\+91\d{10}$/;
            return phoneRegex.test(phone);
        }
        if(!validatePhoneNumber(phone)){
            return next(new ErrorHandler('Invalid phone number',400));
        }
        const existingUser = await User.findOne({
            $or:[
                {
                    email,
                    accountVerified:true
                },
                {
                  phone,
                  accountVerified:true
                }
            ],
            

        });
        if(existingUser){
            return next(new ErrorHandler('Phone or Email is already used.',400));
        }
        const registrationAttemptsByUser = await User.find({
            $or:[
                {  phone,accountVerified:false},
                { email,accountVerified:false},
            ]
        });
        if(registrationAttemptsByUser.length > 3){
            return next(new ErrorHandler('You have exceeded the maximum number of attempts (3). Please try again later.',400));
        }

        const userData = {
            name,
            email,
            phone,
            password
        };
        const user = await User.create(userData);
        // Generate verification code and send it to the user
        const verificationCode = await user.generateVerificationCode();
        await user.save();
        await sendVerificationCode(verificationMethod,verificationCode,name,email,phone,res);
        
    }catch(error){
         next(error);
    }
})

async function sendVerificationCode(verificationMethod,verificationCode,name,email,phone,res){
    try {
        const client = twilio(
            process.env.TWILIO_ACCOUNT_SID,
            process.env.TWILIO_AUTH_TOKEN
        );
        if(verificationMethod === 'email'){
            const message = generateEmailTemplate(verificationCode);
            await sendEmail({email,subject:"Your Verification Code",message})
            res.status(200).json({
            success:true,
            message: `Verification email successfully sent to ${name}`
        })
        }else if(verificationMethod === 'phone'){
            const verificationWithSpace = verificationCode.toString().split('').join(' ');
           await client.messages.create({
  body: `Your OTP is ${verificationCode}`,
  from: process.env.TWILIO_PHONE_NUMBER,
  to: phone
});
          res.status(200).json({
            success:true,
            message: `OTP sent`
        })
        }else{
             return res.status(500).json({
            success:false,
            message: 'Invalid verification method used '
        })
        }
    }catch(error){
        console.log("TWILIO ERROR:", error); 
        return res.status(500).json({
            success:false,
            message: 'Verification code is failed to send.'
        })
    }
}

function generateEmailTemplate(verificationCode){
    return`
        <div style='font-family: Arial,sans-serif; max-width:600px;margin:0 auto; padding:20px; border:1px solid #ddd;border-radius:8px ;background-color:#f9f9f9'>
            <h2 style='color :#4CAF50; text-align:center;'>Verification Code</h2>
            <p style='font-size:16px;color:#333'>Dear User,</p>
            <p style='font-size:16px;color:#333'>Your Verification code is</p>
            <div style='text-align:center;margin:20px 0'>
                <span style='display:inline-block;font-size:24px;font-weight:bold;color:#4CAF50;padding:10px 20px; border:1px solid #4CAF50; border-radius:5px;background-color:#e8f5e9'>${verificationCode}</span>
            </div>
            <p style='font-size:16px;color:#333'>Please use this code to verify your email address. The code will expire in 10 minutes.</p>
            <p style='font-size:16px;color:#333'>If you did not request this , please ignore this email.</p>
            <footer style='margin-top:20px;text-align:center;font-size:14px;color:#999'>
                <p>Thank you,<br>Your Company Team</br></p>
                <p style='font-size:12px;color:#aaa'>This is an automated message. Please do no reply to this email.</p>
            </footer>
        </div>
    `
}
export const verifyOTP = catchAsyncError(async(req,res,next)=>{
    const {email,otp,phone} = req.body;
      function validatePhoneNumber(phone){
            const phoneRegex =/^\+91\d{10}$/;
            return phoneRegex.test(phone);
        }
        if(!validatePhoneNumber(phone)){
            return next(new ErrorHandler('Invalid phone number',400));
        }
        try{
           const userAllEntries = await  User.find({
            $or:[
                {
                    email,accountVerified:false
                },
                {
                    phone,accountVerified:false
                }
            ]
           }).sort({createdAt:-1});
           if(!userAllEntries){
            return next(new ErrorHandler('User not found',404));
           }
           let user;
           if(userAllEntries.length > 1){
            user = userAllEntries[0];

            await User.deleteMany({
                _id:{$ne:user._id},
                $or:[
                    {phone,accountVerified:false},
                    {email,accountVerified:false}
                ]
            })
           }
           else{
            user = userAllEntries[0];
           }

           if(user.verificationCode !== Number(otp)){
             return next(new ErrorHandler('Invalid OTP',400));
           }

           const currentTime = Date.now();
          const verificationCodeExpire = new Date(user.verificationCodeExpiry).getTime();
           console.log("Current Time:",currentTime);
           console.log("Verification Code Expire Time:",verificationCodeExpire);
           if(currentTime > verificationCodeExpire){
            return next(new ErrorHandler('OTP Expired.',400));
           }

           user.accountVerified = true;
           user.verificationCode = null;
           user.verificationCodeExpiry = null;
           await user.save({validateBeforeSave:false});

           return sendToken(user,200,'Account Verified Successfully',res);
        }
        catch(error){
            return next(new ErrorHandler('Internal Server Error',500));
        }
});

export const login = catchAsyncError(async(req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return next(new ErrorHandler('Email and Password are required',400));
    }
    const user = await User.findOne({email,accountVerified:true}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password.",400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password.",400));
    }
    sendToken(user,200,"User logged in successfully.",res);
})

export const logout = catchAsyncError(async(req,res,next)=>{
        res.status(200).cookie("token","",{
            expires: new Date(Date.now()),
            httpOnly: true
        }).json({
            success: true,
            message :"Logged out successfully."
        });
})

export const getUser = catchAsyncError(async(req,res,next)=>{
        const user = req.user;
        res.status(200).json({
            success:true,
            user,
        })
})

export const forgotPassword =  catchAsyncError(async(req,res,next)=>{
    const user = await User.findOne({
        email:req.body.email,
        accountVerified:true
    });
    if(!user){
        return next(new ErrorHandler('User not found',404));
    }
    const resetToken = user.generateResetPasswordToken();
    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
    const message = `Your Reset Password Token is:- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, please ignore it.`;

    try{
        sendEmail({
            email:user.email,
            subject:"MERN AUTHENTICATION APP RESET PASSWORD",
            message,
        });
        res.status(200).json({
            success:true,
            message:`Email send to ${user.email} successfully.`
        })
    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiry = undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message ? error.message : 'Cannot send reset password token',500));
    }
});

export const resetPassword = catchAsyncError(async(req,res,next)=>{
    const {token} = req.params;
    const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpiry:{$gt:Date.now()}
    })
    if(!user){
        return next(new ErrorHandler('Reset Password Token is invalid or has been expired',400));
    }
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Password & confirm Password does not match',400));
    }
    user.password =  req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    
    await user.save();
    sendToken(user,200,'Reset Password Successfully.',res);

});
