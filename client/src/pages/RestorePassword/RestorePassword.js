import React, { useState } from "react";
import "./RestorePassword.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
const ResetUrl = "/auth/resetPassword/";

const RestorePassword = () => {
  const Navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [visible, setVisible] = useState(true);
  const [visiblePass, setVisiblePass] = useState(true);
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("token");
  console.log(token);
  const HandelSubmit = async () => {
    if (password.length < 8) {
      setErrMsg("Password should be more than 8 characters");
      return;
    }
    if (password !== confirmPassword) {
      setErrMsg("Passwords do not match!");
      return;
    }

    const url = ResetUrl + token;
    const data = {
      password: password,
      passwordConfirm: confirmPassword,
    };
    console.log(data);
    try {
      const response = await axios.patch(url, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(JSON.stringify(response?.data));
      Navigate("/login");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
    }

    console.log(data);
  };

  return (
    <div className="RestorePassword-container">
      <div className="RP_container">
        <p
          style={{ top: "-61px", position: "relative" }}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1 className="name">Sacan</h1>
        <div className="passHolder">
          <input
            type={visible ? "password" : "text"}
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button
            className="visible"
            onClick={() => {
              setVisible(!visible);
              console.log(visible);
            }}
          >
            {visible ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        <div className="passHolder">
          <input
            type={visiblePass ? "password" : "text"}
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
          <button
            className="visible"
            onClick={() => {
              setVisiblePass(!visiblePass);
            }}
          >
            {visiblePass ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>

        <button onClick={HandelSubmit} className="lButton">
          submit
        </button>
        <div className="register">
          Don't have account ?
          <Link to="/register" style={{ color: "Red" }}>
            <span> Register now..</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default RestorePassword;
