import React,{useContext} from "react";
import "../styles/OtpVerification.css";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const OtpVerification = () => {
  const {isAuthenticated,setIsAuthenticated,setUser} = useContext(Context);
  const {email,phone} = useParams();
  const {otp,setOtp} = useState(["","","","",""]);

  const handleChange = (value,index)=>{
    if(!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if(value && index < otp.length-1){
      document.getElementById(`otp-input-${index+1}`).focus();
    }
  }
  return <></>;
};

export default OtpVerification;
