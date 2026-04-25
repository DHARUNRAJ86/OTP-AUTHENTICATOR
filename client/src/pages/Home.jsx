import React from "react";
import Hero from "../components/Hero";
import Instructor from "../components/Instructor";
import Technologies from "../components/Technologies";
import "../styles/Home.css";
import { toast } from "react-toastify";
import axios from "axios";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import Footer from "../layout/Footer";

const Home = () => {
   
  const {isAuthenticated,setIsAuthenticated,setUser} = useContext(Context);
  const navigate = useNavigate();
  

  return <>
     <section className="home">
          <Hero/>
          <Instructor/>
          <Technologies/>
          <Footer/>
          <button onClick={logout}>Logout</button>
     </section>
  </>;
};

export default Home;
