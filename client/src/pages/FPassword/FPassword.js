import React, { useState } from "react";
import "./FPassword.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const FPassword_URL = "https://sakan-api.onrender.com/api/auth/forgotPassword";

const FPassword = () => {
  const Navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [errMsg, setErrMsg] = useState("");

  const onSubmit = async (data) => {
    try {
      await axios.post(FPassword_URL, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      Navigate("/login");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 404) {
        setErrMsg("server not found");
      } else if (err.response?.status === 204) {
        setErrMsg("There is no user with email address.");
      } else {
        setErrMsg("Registration Failed");
      }
    }
  };

  return (
    <div className="main-container">
      <form onSubmit={handleSubmit(onSubmit)} className="FP_container">
        <p
          style={{ top: "-61px", position: "relative" }}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
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
