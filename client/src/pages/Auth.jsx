import React,{useContext,useState} from "react";
import "../styles/Auth.css";
import {Context} from "../main"

const Auth = () => {
  const {isAuthenticated} = useContext(Context);
  const [isLogin,setIsLogin] = useState(true);
  if(isAuthenticated){
    return <Navigate to="/"/>
  }
  return <>
     <div className="auth-page">
       <div className="auth-container">
          <div className="auth-toggle">
             <button>Login</button>
          </div>
       </div>
     </div>
  </>;
};

export default Auth;
