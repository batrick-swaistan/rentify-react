import React, { useState } from "react";
import "./Signup.css";
import { Card } from "primereact/card";
import signupimg from "../Assets/Signup.jpg";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const Navigate = useNavigate();

  const roles = [
    { label: "BUYER", value: "BUYER" },
    { label: "SELLER", value: "SELLER" },
  ];

  const initial_state = {
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    role: "",
    password: "",
    confirmPassword: "",
  };

  const [user, setUser] = useState(initial_state);
  const [errors, setErrors] = useState({});
  const [bearerToken, setBearerToken] = useState(
    localStorage.getItem("access_token") || ""
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };

  const validate = () => {
    let tempErrors = {};

    if (!user.firstname) tempErrors.firstname = "First Name is required.";
    if (!user.lastname) tempErrors.lastname = "Last Name is required.";
    if (!user.email) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      tempErrors.email = "Email is invalid.";
    }
    if (!user.mobile) {
      tempErrors.mobile = "Mobile number is required.";
    } else if (!/^\d{10}$/.test(user.mobile)) {
      tempErrors.mobile = "Mobile number is invalid. It must be 10 digits.";
    }
    if (!user.role) tempErrors.role = "Role is required.";
    if (!user.password) {
      tempErrors.password = "Password is required.";
    } else if (user.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters long.";
    }
    if (!user.confirmPassword) {
      tempErrors.confirmPassword = "Confirm Password is required.";
    } else if (user.password !== user.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    if (validate()) {
      const { confirmPassword, ...payload } = user;

      await axios
        .post("https://rentify-api-rentify-api.onrender.com/rentify/v1/auth/register", payload)

        .then((res) => {
          alert("User Logged in Successfully");
          
          console.log(res.data);
          localStorage.setItem("access_token", res.data.access_token)
          localStorage.setItem("refresh_token",res.data.refresh_token);
          if(user.role === "BUYER"){
            Navigate("/");
            setUser(initial_state);
          }else{
            Navigate("/SellerDashboard");
            setUser(initial_state);
          }
        })

        .catch((err) => {
          console.log("Error:", err);
        });

      // console.log("Success");

      // console.log(payload);
    } else {
      console.log("Validation failed");
    }
  };

  return (
    <div className="su_main mx-8 my-8 flex align-items-center justify-content-center">
      <Card className="su_card shadow-3">
        <div className="flex flex-row">
          <div className="flex-1">
            <img className="su_img" src={signupimg} alt="signup-img"></img>
          </div>
          <div className="flex-1 flex flex-column justify-content-center">
            <span>
              <h1>Sign Up</h1>
            </span>
            <div className="su_inp_main">
              <div className="su_name_01 flex flex-row gap-3 mb-3">
                <div className="flex-1 flex flex-column gap-2">
                  <label htmlFor="userFirstName">First Name</label>
                  <InputText
                    id="userFirstName"
                    type="text"
                    name="firstname"
                    value={user.firstname}
                    onChange={handleChange}
                  />
                  {errors.firstname && (
                    <small className="p-error">{errors.firstname}</small>
                  )}
                </div>
                <div className="flex-1 flex flex-column gap-2">
                  <label htmlFor="userLastName">Last Name</label>
                  <InputText
                    id="userLastName"
                    type="text"
                    name="lastname"
                    value={user.lastname}
                    onChange={handleChange}
                  />
                  {errors.lastname && (
                    <small className="p-error">{errors.lastname}</small>
                  )}
                </div>
              </div>

              <div className="su_email_01 flex flex-row gap-3 mb-3">
                <div className="su_email_inp flex-1 flex flex-column gap-2">
                  <label htmlFor="useremail">Email</label>
                  <InputText
                    id="useremail"
                    type="text"
                    name="email"
                    value={user.email}
                    className="su_email_inp_02"
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <small className="p-error">{errors.email}</small>
                  )}
                </div>
                <div className="card flex flex-column gap-2 justify-content-end">
                  <label htmlFor="role">Choose</label>
                  <Dropdown
                    id="role"
                    name="role"
                    value={user.role}
                    onChange={handleChange}
                    options={roles}
                    optionLabel="label"
                    optionValue="value"
                    placeholder="I am a ..."
                    className="w-full md:w-14rem"
                  />
                  {errors.role && (
                    <small className="p-error">{errors.role}</small>
                  )}
                </div>
              </div>

              <div className="flex flex-column gap-2 mb-3">
                <label htmlFor="usermobile">Mobile Number</label>
                <InputText
                  id="usermobile"
                  type="tel"
                  name="mobile"
                  value={user.mobile}
                  onChange={handleChange}
                />
                {errors.mobile && (
                  <small className="p-error">{errors.mobile}</small>
                )}
              </div>

              <div className="flex flex-column gap-2 mb-3">
                <label htmlFor="userpassword">Password</label>
                <InputText
                  id="userpassword"
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <small className="p-error">{errors.password}</small>
                )}
              </div>

              <div className="flex flex-column gap-2 mb-3">
                <label htmlFor="confirmPassword">Confirm password</label>
                <InputText
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={user.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <small className="p-error">{errors.confirmPassword}</small>
                )}
              </div>
              <div className="su_verify_btn flex flex-row flex justify-content-between">
                <span>
                  <Link to="/Login" style={{ textDecoration: "none" }}>
                    <p style={{ color: "#2196f3" }}>Already have an account?</p>
                  </Link>
                </span>
                <span className="su_verify_btn_02 flex justify-content-center align-items-center">
                  <Button
                    label="Sign Up"
                    icon="pi pi-user-plus"
                    onClick={handleSignup}
                  ></Button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Signup;
