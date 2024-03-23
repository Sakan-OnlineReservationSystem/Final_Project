// RegisterForm.js
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./RegisterForm.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { CountrySelect, StateSelect } from "react-country-state-city";
import { isValidPhoneNumber } from "libphonenumber-js";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
const REGISTER_URL = "https://sakan-api.onrender.com/api/auth/register";
const defCountry = {
  id: 65,
  name: "Egypt",
  iso3: "EGY",
  iso2: "EG",
  numeric_code: "818",
  phone_code: 20,
  capital: "Cairo",
  currency: "EGP",
  currency_name: "Egyptian pound",
  currency_symbol: "ج.م",
  tld: ".eg",
  native: "مصر‎",
  region: "Africa",
  subregion: "Northern Africa",
  latitude: "27.00000000",
  longitude: "30.00000000",
  emoji: "🇪🇬",
};
const defCity = {
  id: 3235,
  name: "Alexandria",
  state_code: "ALX",
};
const fields = [
  {
    label: "UserName",
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
  const [visible, setVisible] = useState(true);
  const [visiblePass, setVisiblePass] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState();
  const [countryid, setCountryid] = useState(65);
  const [country, setCountry] = useState("Egypt");
  const [state, setState] = useState("Alexandria");

  useEffect(() => {});

  const onSubmit = async (data) => {
    if (!isValidPhoneNumber(phone)) {
      toast.error("Wrong Phone Number!");
      return;
    }
    // Password setting
    setPassword(data.password);
    setConfirmPassword(data.confirmpassword);
    // check passwords match
    if (password.length < 8) {
      toast.error("Password should be more than 8 characters");

      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");

      return;
    }
    data.phone = phone;
    try {
      const addr = state + "," + country;
      let q = {
        username: data.username,
        email: data.email,
        phone: phone,
        address: addr,
        password: data.password,
        passwordConfirm: data.confirmpassword,
        isAdmin: false,
      };
      console.log(q);
      await axios.post(REGISTER_URL, q);
      toast.success("Registration success!");
      Navigate("/login");
    } catch (err) {
      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 409) {
        toast.error("email is Registerd Already!!");
      } else {
        toast.error("Registration Failed");
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
          <div className="pb-5">
            <h1 className="name">SAKAN</h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-start items-center w-full m-auto"
          >
            <div className="grid grid-cols-1 mb-6 md:grid-cols-2 gap-3 w-full">
              {fields.map((field, index) => (
                <div
                  key={index}
                  className={`text-left flex flex-col gap-2 w-full ${
                    field.gridCols === 2 ? "md:col-span-2" : ""
                  }`}
                >
                  <label className="font-semibold">{field.label}</label>
                  {field.label === "Phone" ? (
                    <PhoneInput
                      className={`border border-gray-300 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-green-500 ${
                        field.gridCols === 2 ? "md:w-full" : ""
                      }`}
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e);
                      }}
                      required
                    />
                  ) : field.label === "Country" ? (
                    <CountrySelect
                      className={`border border-gray-300 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-green-500 ${
                        field.gridCols === 2 ? "md:w-full" : ""
                      }`}
                      onChange={(e) => {
                        setCountryid(e.id);
                        setCountry(e.name);
                      }}
                      defaultValue={defCountry}
                    />
                  ) : field.label === "City" ? (
                    <StateSelect
                      className={`border border-gray-300 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-green-500 ${
                        field.gridCols === 2 ? "md:w-full" : ""
                      }`}
                      countryid={countryid}
                      onChange={(e) => {
                        setState(e.name);
                      }}
                      placeHolder="Select State /blank for alex"
                      defaultValue={defCity}
                    />
                  ) : field.label === "ConfirmPassword" ||
                    field.label.toLowerCase() === "password" ? (
                    <div style={{ display: "flex" }}>
                      <input
                        {...register(field.label.toLowerCase(), {
                          required: field.required,
                        })}
                        className={`border border-gray-300 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-green-500 ${
                          field.gridCols === 2 ? "md:w-full" : ""
                        }`}
                        type={
                          field.label.toLowerCase() === "password"
                            ? visible
                              ? "password"
                              : "text"
                            : visiblePass
                            ? "password"
                            : "text"
                        }
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
                      />
                      <button
                        className="visible"
                        type=""
                        onClick={(event) => {
                          event.preventDefault();
                          if (field.label.toLowerCase() === "password") {
                            setVisible(!visible);
                          } else if (
                            field.label.toLowerCase() === "confirmpassword"
                          ) {
                            setVisiblePass(!visiblePass);
                          }
                        }}
                      >
                        {field.label.toLowerCase() === "password" ? (
                          visible ? (
                            <FaEye />
                          ) : (
                            <FaEyeSlash />
                          )
                        ) : visiblePass ? (
                          <FaEye />
                        ) : (
                          <FaEyeSlash />
                        )}
                      </button>
                    </div>
                  ) : (
                    <input
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
                    />
                  )}
                  {errors[field.label.toLowerCase()] && (
                    <span className="warning">This field is required</span>
                  )}
                </div>
              ))}
            </div>

            <div className="w-full text-left">
              <button
                type="submit"
                className="flex justify-center items-center gap-2 w-full py-3 px-4
                 bg-red-500 text-white text-md font-bold border
                  border-red-500 rounded-md ease-in-out duration-150
                   shadow-slate-600 hover:bg-white hover:text-red-500 lg:m-0 md:px-6"
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
