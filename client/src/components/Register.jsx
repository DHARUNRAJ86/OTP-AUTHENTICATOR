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
    const cleanedPhone = data.phone.replace(/\D/g, "").slice(0, 10);

    const formattedData = {
      ...data,
      phone: `+91${cleanedPhone}`,
    };

    console.log("FINAL DATA:", formattedData); // ✅ DEBUG

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
  } catch (error) {
    console.log("ERROR:", error.response?.data); // ✅ DEBUG
    toast.error(error.response?.data?.message || "Registration Failed");
  }
};
  return <>
    <div>
      <form className='auth-form' onSubmit={handleSubmit((data) => handleRegister(data))}>
        <h2>Register</h2>
        <input type="text" placeholder="Name" required {...register("name")} />
        <input type="email" placeholder="Email" required {...register("email")} />
        <div>
          
          <input
  type="text"
  placeholder="Enter 10-digit phone number"
  {...register("phone", {
    required: "Phone required",
    pattern: {
      value: /^[0-9]{10}$/,
      message: "Enter valid 10-digit number",
    },
  })}
/>
        </div>
        <div>
           <input type="password" placeholder="Password" required {...register("password")} />
        </div>
        <div className='verification-method'>
            <p>Select Verification Method</p>
            <div className='wrapper'>
                  <label>
                     <input type="radio" name='verificationMethod' value={"email"} {...register("verificationMethod")} required/>
                     Email
                  </label>
                  <label>
                     <input type="radio" name='verificationMethod' value={"phone"} {...register("verificationMethod")} required/>
                     Phone
                  </label>
            </div>
        </div>
        <button type='submit'>Register</button>
      </form>
    </div>
  </>;
};

export default Register;
