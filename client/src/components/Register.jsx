import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const { isAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleRegister = async (data) => {
    try {
      const formattedData = {
        ...data,
        phone: `+91${data.phone}`,
      };

      const res = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        formattedData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(res.data.message);

      navigateTo(`/otp-verification/${data.email}/${formattedData.phone}`);

    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    }
  };
  return <>
    <div>
      <form className='auth-form' onSubmit={handleSubmit((data) => handleRegister(data))}>
        <h2>Register</h2>
        <input type="text" placeholder="Name" required {...register("name")} />
        <div>
          <span>+91</span>
          <input type="number" placeholder="Phone Number" required {...register("phone")} />
        </div>
        <div>
           <input type="password" placeholder="Password" required {...register("password")} />
        </div>
        <div className='verification-method'>
            <p>Select Verification Method</p>
            <div className='wrapper'>
                  <label>
                     <input type="radio" name='verificationMethod' value={"email"} {...register("verificationMethod")} required/>
                  </label>
                  <label>
                     <input type="radio" name='verificationMethod' value={"phone"} {...register("verificationMethod")} required/>
                  </label>
            </div>
        </div>
      </form>
    </div>
  </>;
};

export default Register;
