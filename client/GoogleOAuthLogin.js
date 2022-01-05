import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import "regenerator-runtime/runtime";

export default function GoogleOAuthButton() {
  const onLoginFailure = (googleResponse) => {
    console.log("Login failed:", googleResponse);
  };

  //needs to hit the server to verify tokenID
  const onLoginSuccess = async (googleResponse) => {
    console.log("Login successful:", googleResponse.tokenId);

    const serverResponse = await fetch("/api/google-auth", {
      method: "POST",
      body: JSON.stringify({
        token: googleResponse.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // const data = await serverResponse.json()

    //store returned user somehow here?
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
