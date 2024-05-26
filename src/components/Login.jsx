import React, { useState } from "react";
import { Card } from "primereact/card";
import "./Login.css";
import login from "../Assets/Login.jpg";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  // const [bearerToken, setBearerToken] = useState(
  //   localStorage.getItem("access_token") || ""
  // );

  const initial_state = {
    email: "",
    password: "",
  };

  const [userDetails, SetUserDetails] = useState(initial_state);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const value = e.target.value;
    SetUserDetails({ ...userDetails, [e.target.name]: value });
  };

  const validateEmail = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };
  const validate = () => {
    let tempErrors = {};

    if (!userDetails.email) {
      tempErrors.email = "Email is required.";
    } else if (!validateEmail(userDetails.email)) {
      tempErrors.email = "Email is invalid.";
    }

    if (!userDetails.password) {
      tempErrors.password = "Password is required.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (validate()) {
      await axios
        .post("https://rentify-api-rentify-api.onrender.com/rentify/v1/auth/authenticate", userDetails)
        .then((res) => {
          alert("User Logged in Successfully");
          console.log(res.data)
          const token_details = jwtDecode(res.data.access_token);
          const role = token_details.role;
          localStorage.setItem("access_token",res.data.access_token);
          // setBearerToken( localStorage.setItem("access_token",res.data.access_token));
          localStorage.setItem("refresh_token",res.data.refresh_token);
          SetUserDetails(initial_state);
          console.log(token_details)
          if(token_details.role === "ROLE_BUYER"){
            navigate("/Dashboard")
          }else{
            navigate("/SellerDashboard")
          }
        });
    }
  };

  return (
    <div className="al_01 mx-8 my-8 flex align-items-center justify-content-center ">
      <Card className="al_card mx-auto shadow-5 ">
        <div className="flex flex-row ">
          <div className="flex flex-1  justify-content-center align-items-center">
            <img src={login} alt="login Image" className="lg_img"></img>
          </div>
          <div className="flex-1 flex flex-column  justify-content-center gap-3">
            <span>
              <h1>Login!</h1>
            </span>

            <div className="flex flex-column gap-2 lg_ue_01">
              <label htmlFor="useremail">Email</label>
              <InputText
                id="useremail"
                type="text"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
              />
              {errors.email && (
                <small className="p-error">{errors.email}</small>
              )}
            </div>

            <div className="flex flex-column gap-2 lg_pw_01">
              <label htmlFor="userpassword">Password</label>
              <InputText
                id="userpassword"
                type="password"
                name="password"
                value={userDetails.password}
                onChange={handleChange}
              />
              {errors.password && (
                <small className="p-error">{errors.password}</small>
              )}
            </div>

            <div className="lg_btn flex justify-content-between">
              <span>
                <Link to="/Signup" style={{ textDecoration: "none" }}>
                  <p style={{ color: "#2196f3" }}>Create an account?</p>
                </Link>
              </span>
              <span className="lg_btn_id02 flex justify-content-center align-items-center">
                <Button
                  label="Login"
                  icon="pi pi-sign-in"
                  iconPos="right"
                  onClick={handleLogin}
                />
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
