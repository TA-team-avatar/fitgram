import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DashboardContainer from "./containers/DashboardContainer";
import ForumContainer from "./containers/ForumContainer";
import NavContainer from "./containers/NavContainer";
import ProfileContainer from "./containers/ProfileContainer";

const App = () => {
  return (
    <Router>
      <div>
        <NavContainer />
        <Routes>
          <Route exact path="/" element={<DashboardContainer />}></Route>
          <Route exact path="/forum/:id" element={<ForumContainer />}></Route>
          <Route
            exact
            path="/profile/:id"
            element={<ProfileContainer />}
          ></Route>
          <Route exact path="/login" element={<DashboardContainer />}></Route>
          <Route exact path="/signup" element={<DashboardContainer />}></Route>
          <Route
            exact
            path="/message/:id"
            element={<DashboardContainer />}
          ></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
