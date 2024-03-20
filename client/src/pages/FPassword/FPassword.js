import React, { useState } from "react";
import "./FPassword.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const FPassword_URL = "https://sakan-api.onrender.com/api/auth/forgotPassword";

const FPassword = () => {
  const Navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    let id;
    try {
      id = toast.loading("Checking your account");
      await axios.post(FPassword_URL, data);
      toast.update(id, {
        render: "Check your email for the account reset message",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      Navigate("/login");
    } catch (err) {
      if (!err?.response) {
        toast.update(id, {
          render: "No Server Response",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        toast.update(id, {
          render: err.response.data.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <div className="main-container">
      <form onSubmit={handleSubmit(onSubmit)} className="FP_container">
        <h1 className="name">Sacan</h1>
        <p className="info">
          Enter the email address associated with your account and we will send
          you a link to reset your password
        </p>
        <input
          {...register("email")}
          onChange={{}}
          type="email"
          placeholder="Enter your Email"
        ></input>
        <button type="submit" className="lButton">
          {" "}
          Continue
        </button>
        <div className="register">
          Don't have account ?
          <Link to="/register" style={{ color: "Red" }}>
            <span> Register now..</span>
          </Link>
        </div>
      </form>
    </div>
  );
};
export default FPassword;
