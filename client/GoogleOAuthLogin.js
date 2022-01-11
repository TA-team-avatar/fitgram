import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import "regenerator-runtime/runtime";
import Cookies from "js-cookie";

export default function GoogleOAuthButton() {
  const history = useNavigate();

  const onLoginFailure = (googleResponse) => {
    console.log("Login failed:", googleResponse);
  };

  //needs to hit the server to verify tokenID
  const onLoginSuccess = async (googleResponse) => {
    console.log("Login successful");

    const serverResponse = await fetch("/api/google-auth", {
      method: "POST",
      body: JSON.stringify({
        token: googleResponse.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      //after cookie with userId is received in response, gets the cookie on the front-end
      //and sets the state with it
      .then(() => {
        console.log("OAuth verification successful");
      })
      .catch((err) => console.log("error received from fetch post:", err));

    //force to redirect
    history("dashboard");
  };

  return (
    <div className="my-5">
      <GoogleLogin
        clientId={
          "<CLIENT ID STRING FROM GOOGLE HERE>"
        }
        buttonText="Login with Google"
        onSuccess={onLoginSuccess}
        onFailure={onLoginFailure}
        cookiePolicy={"single_host_origin"}
        className="bg-primary text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
      />
    </div>
  );
}
