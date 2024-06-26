import React, { useState } from "react";
import "./RestorePassword.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
const apiUrl = process.env.REACT_APP_API_URL;
const ResetUrl = `${apiUrl}/api/auth/resetPassword/`;

const RestorePassword = () => {
  const Navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(true);
  const [visiblePass, setVisiblePass] = useState(true);
  const HandelSubmit = async () => {
    if (password.length < 8) {
      toast.error("Password should be more than 8 characters");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    const token = localStorage.getItem("user-token");

    const url = ResetUrl + token;
    const data = {
      password: password,
      passwordConfirm: confirmPassword,
    };

    try {
      await axios.patch(url, data, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      toast.success("password updated successfully!");
      Navigate("/login");
    } catch (err) {
      if (!err?.response) {
        toast.error("No Server Response");
      } else {
        toast.error(err.response.data.message);
      }
    }
  };

  return (
    <div className="RestorePassword-container">
      <div className="RP_container">
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

        <button
          onClick={HandelSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              HandelSubmit();
            }
          }}
          className="lButton"
        >
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
