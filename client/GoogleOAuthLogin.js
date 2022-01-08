import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import "regenerator-runtime/runtime";
import Cookies from "js-cookie";

export default function GoogleOAuthButton() {
  const [userAthleteId, setUserAthleteId] = useState(Cookies.get("athleteId"));
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
      .then((res) => {
        // console.log(res);
        const athleteId = Cookies.get("athleteId");
        return setUserAthleteId(athleteId);
      })
      .catch((err) => console.log("error received from fetch post:", err));

    //force to redirect
    history("mainpage");
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
        // redirectUri={"/mainpage"}
      />
    </div>
  );
}
