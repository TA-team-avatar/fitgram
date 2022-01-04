import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import GoogleOAuthButton from "./GoogleOAuthLogin";

const LoginSignupPage = (props) => {
  return (
    <div>
      <h1 className="app-name">Follow Fit</h1>
      <h3 className="tagline">marketing copy placeholder</h3>
      <LoginForm />
      <SignupForm />
      <GoogleOAuthButton />
      <img
        src="https://images.pexels.com/photos/3601094/pexels-photo-3601094.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        className="login-page-background-image"
        style={{ width: "100vw" }}
      ></img>
    </div>
  );
};

export default LoginSignupPage;
