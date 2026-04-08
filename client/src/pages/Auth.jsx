import React,{useContext,useState} from "react";
import "../styles/Auth.css";
import {Context} from "../main"

const Auth = () => {
  const {isAuthenticated} = useContext(Context);
  const [isLogin,setIsLogin] = useState(true);
  return <></>;
};

export default Auth;
