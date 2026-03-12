import ErrorHandler from '../middleware/error.js'
import { catchAsyncError } from '../middleware/catchAsyncError.js'
import {User} from '../models/userModel.js'
import { sendVerificationCode } from '../utils/sendVerificationCode.js';

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
        if(registrationAttemptsByUser.length >=3){
            return next(new ErrorHandler('You have exceeded the maximum number of attempts (3). Please try again later.',400));
        }

        const userData = {
            name,
            email,
            phone,
            password
        };
        const user = await User.create(userData);
        // Generate verification code and send it to the userrr
        const verificationCode = await user.generateVerificationCode();
        await user.save();
        sendVerificationCode(verificationMethod,verificationCode,email,phone);
        res.status(200).json({
            success:true,
        })
    }catch(error){
         next(error);
    }
})