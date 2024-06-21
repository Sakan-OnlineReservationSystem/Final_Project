import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import "./login.css";
const Login_url = "/api/auth/login";
const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const { loading, dispatch } = useContext(AuthContext);
  const [visiblePass, setVisiblePass] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    let id = toast.loading("Validating your details...");
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(Login_url, credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data });
      toast.update(id, {
        render: "Logged in successfully",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      toast.update(id, {
        render: err.response.data.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <h1 className="name">SAKAN</h1>
        <input
          type="text"
          placeholder="Email"
          id="email"
          onChange={handleChange}
          className="lInput"
        />
        <div className="passwordContainer">
          <input
            className="lInput"
            type={!visiblePass ? "text" : "password"}
            placeholder="Password"
            id="password"
            onChange={handleChange}
          />
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
          disabled={loading}
          onClick={handleClick}
          className="lButton RouterBtn"
        >
          Login
        </button>

        <Link to="/FPassword">
          {" "}
          <span className="forgot">Forgot password..</span>
        </Link>
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

export default Login;
