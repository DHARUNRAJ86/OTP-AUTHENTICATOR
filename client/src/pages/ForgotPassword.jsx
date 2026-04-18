import React,{useContext} from "react";
import "../styles/ForgotPassword.css";
import {Context} from "../main";

const ForgotPassword = () => {
  const {isAuthenticated} = useContext(Context);
  const {email,setEmail} = useState("");


  const handleForgotPassword = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      toast.success(res.data.message);
      setIsAuthenticated(true);
      setUser(res.data.user);
      navigateTo("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid email or password");
    }
  };
  return <></>;
};

export default ForgotPassword;
