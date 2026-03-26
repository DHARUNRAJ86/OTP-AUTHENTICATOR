export const sendToken = (user,statusCode,message,res)=>{
    try {
        const token = user.generateToken();
        res.status(statusCode).cookie("token", token, {
            expires: new Date(Date.now() + Number(process.env.COOKIE_EXPIRE) * 24*60*60*1000),
            httpOnly: true
        }).json({
            success: true,
            message,
            token,
            user,
        });
    } catch (err) {
        console.error("SendToken Error:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}