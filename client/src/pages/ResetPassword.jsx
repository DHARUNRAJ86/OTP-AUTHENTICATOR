import React from "react";
import "../styles/ResetPassword.css";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {Context} from "../main";

const ResetPassword = () => {
  const {isAuthenticated,setIsAuthenticated,setUser} = useContext(Context);
  const {token} = useParams();
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");

  const handleResetPassword = async (e) =>{
    e.preventDefault();
    try {
    const res = await axios.put(
      "http://localhost:4000/api/v1/user/password/reset/${token",
      (password,confirmPassword),
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
  }
  if(isAuthenticated){
    return <Navigate to={"/"}/>
  }
  return (
    <>
      <></>
    </>
  );
};

export default ResetPassword;
