import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:{
        type:String,
        minLength:[8,'Password must have at least 8 characters'],
        maxLength:[32,'Password cannot have more than 32 characters'],
    },
    phone:String,
    accountVerified:{
        type:Boolean,
        default:false
    },
    verificationCode:Number,
    verificationCodeExpiry:Date,
    resetPasswordToken:String,
    resetPasswordExpiry:Date,
    createdAt:{
        type:Date,
        default:Date.now
    },

});
// Hash the password before saving the user
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
});

userSchema.methods.comparePassword = async function(enteredpassword){
       return await bcrypt.compare(enteredpassword,this.password);
}

export const User = mongoose.model('User',userSchema);