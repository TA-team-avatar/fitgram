import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";

export default function GoogleLogin() {
  const clientId = process.env.CLIENT_ID;
  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}
