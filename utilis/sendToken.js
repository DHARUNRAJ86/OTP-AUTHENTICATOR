export const sendToken = (user,statusCode,message,res)=>{
    const token = user.generateToken();
    res.status(statusCode).cookie("token",token,{
        
    })
}