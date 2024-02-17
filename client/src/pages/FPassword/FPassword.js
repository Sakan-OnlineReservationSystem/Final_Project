import React from "react";
import "./FPassword.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
const FPassword = () => {
  const Navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    Navigate("/login");
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
