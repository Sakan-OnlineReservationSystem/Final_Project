// RegisterForm.js
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./RegisterForm.css";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Country, State } from 'country-state-city';

const REGISTER_URL = "/register";
const fields = [
  {
    label: "User Name",
    type: "text",
    placeholder: "user Name",
    required: true,
    gridCols: 2,
  },
  {
    label: "Email",
    type: "email",
    placeholder: "john.doe@example.com",
    required: true,
    gridCols: 2,
  },
  {
    label: "Phone",
    type: "tel",
    placeholder: "+1 123-456-7890",
    required: true,
    gridCols: 2,
  },
  {
    label: "Country",
    type: "text",
    placeholder: "Egypt",
    required: true,
    gridCols: 1,
  },
  {
    label: "City",
    type: "text",
    placeholder: "Alexandria",
    required: true,
    gridCols: 1,
  },
  {
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    required: true,
    gridCols: 1,
  },
  {
    label: "ConfirmPassword",
    type: "password",
    placeholder: "Confirm your password",
    required: true,
    gridCols: 1,
  },
];

const RegisterForm = () => {
  const Navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [value, setValue] = useState();
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');

  useEffect(() => {});
   const handleCountryChange = (val) => {
    setCountry(val);
    setState('');
    setCity('');
  };

  const handleStateChange = (val) => {
    setState(val);
    setCity('');
  };


  const onSubmit = async (data) => {
    // Password setting
    setPassword(data.password);
    setConfirmPassword(data.confirmpassword);
    // check passwords match
    if (password !== confirmPassword) {
      setErrMsg("Passwords do not match!");
      console.log(JSON.stringify(data));
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ data }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
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
  };

  return (
    <div>
      <div className="container mx-auto">
        <div
          style={{ backgroundColor: "aliceblue" }}
          className="lg:w-7/12 pb-10 pt-5 w-full p-4 flex flex-wrap justify-center shadow-2xl my-20 rounded-md mx-auto"
        >
          <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </p>
          <div className="pb-5">
            <h1 className="name">SAKAN</h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-start items-center w-full m-auto"
          >
            <div className="grid grid-cols-1 mb-6 md:grid-cols-2 gap-3 w-full">
              {fields.map((field, index) => (<div
                  key={index}
                  className={`text-left flex flex-col gap-2 w-full ${
                    field.gridCols === 2 ? "md:col-span-2" : ""
                  }`}
                >
                  <label className="font-semibold">{field.label}</label> 
                  {field.label == "Phone" ?
                    (<PhoneInput className={`border border-gray-300 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-green-500 ${
                      field.gridCols === 2 ? "md:w-full" : ""
                    }`}
                    placeholder="Enter phone number"
                    value={value}
                    onChange={setValue}/>) : ( { field.label == "Country"? (
                      <Country className={`border border-gray-300 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-green-500 ${
                      field.gridCols === 2 ? "md:w-full" : ""
                      }`}
                      value={country}
                      onChange={handleCountryChange}
                      />) : ( { field.label == "City" ? (<State
                            className={`border border-gray-300 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-green-500 ${
                            field.gridCols === 2 ? "md:w-full" : ""}`}                           
                            country={country}
                            value={state}
                            onChange={handleStateChange}
                        />) :(<input 
                    {...register(field.label.toLowerCase(), {
                      required: field.required,
                    })}
                    className={`border border-gray-300 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-green-500 ${
                      field.gridCols === 2 ? "md:w-full" : ""
                    }`}
                    type={field.type}
                    placeholder={field.placeholder}
                    onChange={(e) => {
                      if (field.label.toLowerCase() === "password") {
                        setPassword(e.target.value);
                      } else if (
                        field.label.toLowerCase() === "confirmpassword"
                      ) {
                        setConfirmPassword(e.target.value);
                      }
                    }}
                  />)})})}
                  {errors[field.label.toLowerCase()] && (
                    <span className="warning">This field is required</span>
                  )}
                </div>
              ))}
            </div>

            <div className="w-full text-left">
              <button
                type="submit"
                className="flex justify-center items-center gap-2 w-full py-3 px-4 bg-red-500 text-white text-md font-bold border border-red-500 rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-white hover:text-red-500 lg:m-0 md:px-6"
                title="Confirm Order"
              >
                <span>Register</span>
                <HiOutlineArrowCircleRight size={20} />
              </button>
            </div>
            <div className="register">
              Already have account ?
              <Link to="/login" style={{ color: "blue" }}>
                <span> Login here...</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
