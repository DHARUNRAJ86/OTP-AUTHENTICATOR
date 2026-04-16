import React,{useContext,useState} from "react";
import "../styles/OtpVerification.css";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const OtpVerification = () => {
  const {isAuthenticated,setIsAuthenticated,setUser} = useContext(Context);
  const {email,phone} = useParams();
  const [otp,setOtp] = useState(["", "", "", "", ""]);

  const handleChange = (value,index)=>{
    if(!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if(value && index < otp.length-1){
      document.getElementById(`otp-input-${index+1}`).focus();
    }
  };

  const handleKeyDown = (e,index)=>{
    if(e.key === "Backspace" && otp[index] === "" && index >0){
      document.getElementById(`otp-input-${index-1}`).focus();
    }
  }

  const handleOtpVerification = async (e)=>{
     e.preventDefault();
     const enteredOtp = otp.join("");
     const data ={
      email,
      otp:enteredOtp,
      phone,
     };
     await axios.post("http://localhost:4000/api/v1/user/otp-verification",data,{
      withCredentials:true,headers:{"Content-Type":"application/json"}
     }).then((res)=>{
      toast.success(res.data.message);
      setIsAuthenticated(true);
      setUser(res.data.user);
     }).catch((err)=>{
      toast.error(err.response.data.message);
      setIsAuthenticated(false);
      setUser(null);
     })
  }
  
  return <></>;
};

export default OtpVerification;
