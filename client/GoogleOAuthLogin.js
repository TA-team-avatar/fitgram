import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
// import dotenv from "dotenv";

export default function GoogleOAuthButton() {
  // const clientId = process.env.REACT_APP_CLIENT_ID;

  const onLoginFailure = (res) => {
    console.log("Login failed:", res);
  };

  const onLoginSuccess = (res) => {
    console.log("Login successful:", res.profileObj);
  };

  return (
    <div>
      <GoogleLogin
        clientId={
          "467096301340-lskbsr95tqn59v25db47f1jsl5raq4g9.apps.googleusercontent.com"
        }
        buttonText="Login with Google"
        onSuccess={onLoginSuccess}
        onFailure={onLoginFailure}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}
