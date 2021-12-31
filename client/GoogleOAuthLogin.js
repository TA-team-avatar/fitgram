import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
// import dotenv from "dotenv";

export default function GoogleOAuthButton() {
  // const clientId = process.env.REACT_APP_CLIENT_ID;

  const onLoginFailure = (res) => {
    console.log("Login Successful:", res);
  };

  const onLoginSuccess = (res) => {
    console.log("Login failed:", res);
  };

  return (
    <div>
      <GoogleLogin
        clientId={
          "467096301340-m38npsr4v0bo4d1aqqrav0t33fkoml09.apps.googleusercontent.com"
        }
        buttonText="Login with Google"
        onSuccess={onLoginSuccess}
        onFailure={onLoginFailure}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}
