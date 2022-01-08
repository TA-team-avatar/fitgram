import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Link,
} from "react-router-dom";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import GoogleOAuthButton from "./GoogleOAuthLogin";

const LoginSignupPage = (props) => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Follow Fit</h1>
      <h3 className="tagline">
        Never go without a workout plan again. <br></br>
        Share your daily workout with friends. <br></br>
        Follow the exercise programming of celebs, fitness stars, and top
        athletes and coaches.
      </h3>
      <LoginForm />
      <SignupForm />
      <GoogleOAuthButton />

      {/* <nav><Link to="/mainpage"> Mainpage </Link></nav> */}

      <img
        src="https://images.pexels.com/photos/3601094/pexels-photo-3601094.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        className="login-page-background-image"
        style={{ width: "100vw" }}
      ></img>
    </div>
  );
};

export default LoginSignupPage;
