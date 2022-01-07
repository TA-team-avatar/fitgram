import React from "react";
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

//All route should establish at the App level
export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginSignupPage />}></Route>
        {/* <Route path="mainpage" element={<DashBoardContainer />}></Route> */}
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

const RequireAuth = () => {
  if (Cookies.get("athleteId")) {
  } else {
    alert("Please sign-in/sing-up to continue");
  }
};
