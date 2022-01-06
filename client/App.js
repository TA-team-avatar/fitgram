import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSignupPage from "./LoginSignupPage";
import DashBoardContainer from "./DashboardContainer";

//All route should establish at the App level
export default function App() {
  return (
    <div className="App">
      {/* <Routes>
        <Route path="/" element={<LoginSignupPage />}></Route>
        <Route path="mainpage" element={<DashBoardContainer />}></Route>
      </Routes> */}
      <DashBoardContainer />
    </div>
  );
}
