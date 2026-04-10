import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const {isAuthenticated,setIsAuthenticated,user,setUser} = useContext(Context);
  const navigateTo = useNavigate();

  const {register,handleSubmit,formState:{errors}} = useForm();
  return <>
     <form>
      <h2>Login</h2>
      <input type="email" placeholder="Email" required />
     </form>
  </>;
};

export default Login;
