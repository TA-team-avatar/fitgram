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
    <div className="h-screen bg-cover bg-[url('https://images.pexels.com/photos/3621168/pexels-photo-3621168.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')] ">
      <div className="pt-10 ">
        <h1 className="text-8xl font-extrabold font-sans text-center text-transparent bg-clip-text bg-gradient-to-br from-primary-400 to-secondary-600">
          fit haús
        </h1>
        <div className="flex flex-col justify-center items-center max-w-xl text-2xl mx-auto px-4 py-4 bg-neutral shadow-md rounded-lg my-10">
          <h4>
            Never go without a workout plan again. <br></br>
            Share your daily workout with friends. <br></br>
            Follow the exercise programming of celebs, fitness stars, and top
            athletes and coaches.
          </h4>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center max-w-xl mx-auto px-4 py-4 shadow-md bg-neutral rounded-lg">
        <LoginForm />
        <SignupForm />
        <GoogleOAuthButton />
      </div>
      {/* <nav><Link to="/mainpage"> Mainpage </Link></nav> */}

      {/* <img
        src="https://images.pexels.com/photos/3601094/pexels-photo-3601094.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        className="login-page-background-image"
        style={{ width: "100vw" }}
      ></img> */}
    </div>
  );
};

export default LoginSignupPage;

//https://images.pexels.com/photos/3601094/pexels-photo-3601094.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260
