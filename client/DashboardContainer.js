import React, { useState, useEffect } from "react";
import PostWorkoutContainer from "./PostWorkoutContainer";
import Feed from "./Feed";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const DashboardContainer = (props) => {
  const [workoutsList, setWorkoutsList] = useState([]);
  const history = useNavigate();
  const athleteId = Cookies.get("athleteId");

  //handle post function takes in nothing
  const getWorkOutsList = () => {
    // console.log("getworkoutlist function is being invoked");
    return (
      fetch("/workouts-list")
        .then((res) => res.json())
        // set state
        .then((data) => setWorkoutsList(data.workoutsList))
    );
  };

  // on mount fetch workout-list from server
  useEffect(() => {
    getWorkOutsList();
  }, []);

  return (
    <div className="dashboard-container">
      <Feed workoutsList={workoutsList} />
      <PostWorkoutContainer getWorkOutsList={getWorkOutsList} />
      <button
        type="submit"
        onClick={() => history(`../athletepage/${athleteId}`)}
        className="bg-primary text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
      >
        My Athlete Profile
      </button>
    </div>
  );
};

export default DashboardContainer;
