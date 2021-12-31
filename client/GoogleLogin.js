import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";

export default function GoogleLogin() {
  const clientId = process.env.CLIENT_ID;

  const onLoginFailure = (res) => {
    console.log("Login Successful:", res.profileObj);
  };

  const onLoginSuccess = (res) => {
    console.log("Login failed:", res);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={onLoginSuccess}
        onFailure={onLoginFailure}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}
