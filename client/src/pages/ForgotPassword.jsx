import React,{useContext} from "react";
import "../styles/ForgotPassword.css";
import {Context} from "../main";
import axios from "axios";
import {toast} from "react-toastify";

const ForgotPassword = () => {
  const {isAuthenticated} = useContext(Context);
  const {email,setEmail} = useState("");


  const handleForgotPassword = async (e) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/user/password/forgot",
        {email},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      toast.success(res.data.message);
      
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid email or password");
    }
  };
  return <></>;
};

export default ForgotPassword;
