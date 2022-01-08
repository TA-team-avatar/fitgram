import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import Cookies from "js-cookie";

import LoginSignupPage from "./LoginSignupPage";
import DashBoardContainer from "./DashboardContainer";
import AthletePage from "./AthletePage";

//All route should establish at the App level
export default function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const history = useNavigate();

  const RequireAuth = () => {
    if (Cookies.get("athleteId")) {
      console.log(Cookies.get("athleteId"));
      return <DashBoardContainer />;
    } else {
      return (
        <div>
          <h1>Please log in to continue</h1>
          <button
            onClick={() => {
              console.log("fail to-log");
              return history("");
            }}
          >
            Try again
          </button>
        </div>
      );
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginSignupPage />}></Route>
        <Route
          path="mainpage"
          element={
            <RequireAuth>
              <DashBoardContainer />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}
