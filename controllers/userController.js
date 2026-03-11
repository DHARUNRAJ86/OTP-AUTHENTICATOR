import ErrorHandler from '../middleware/error.js'
import { catchAsyncError } from '../middleware/catchAsyncError.js'
import {User} from '../models/userModel.js'

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
            

        })
    }catch(error){

    }
})