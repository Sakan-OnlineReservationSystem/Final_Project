import "./FPassword.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const apiUrl = process.env.REACT_APP_API_URL;
const FPassword_URL = `${apiUrl}/api/auth/forgotPassword`;

const FPassword = () => {
  const Navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    let id;
    try {
      id = toast.loading("Checking your account");
      const token = localStorage.getItem("user-token");

      await axios.post(FPassword_URL, data, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
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
        <h1 className="name">Sakan</h1>
        <p className="info">
          Enter the email address associated with your account and we will send
          you a link to reset your password
        </p>
        <input
          {...register("email")}
          type="email"
          placeholder="Enter your Email"
          className=" w-2/3"
        ></input>
        <button type="submit" className=" RouterBtn lButton ">
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
