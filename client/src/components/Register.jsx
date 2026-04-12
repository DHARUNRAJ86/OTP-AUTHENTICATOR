import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const {isAuthenticated} = useContext(Context);
  const navigateTo = useNavigate();
  const {register,handleSubmit,formState:{errors}} = useForm();
  const handleRegister = async (data) =>{
     data.phone =`+91${data.phone}`;
     await axios.post("http://localhost:4000/api/v1/user/register",data,{
      withCredentials:true,
      headers:{
        "Content-Type": "application/json"
      }
     }).then
  }
  return <></>;
};

export default Register;
