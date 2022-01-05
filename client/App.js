import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import LoginSignupPage from "./LoginSignupPage";

ReactDOM.render(
  <Router>
    <Routes>
      <LoginSignupPage></LoginSignupPage>
    </Routes>
  </Router>,
  document.getElementById("root")
);
