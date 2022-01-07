import React, { useState, useEffect } from "react";
import PostWorkoutContainer from "./PostWorkoutContainer";
import Feed from "./Feed";

const DashboardContainer = (props) => {
  const [workoutsList, setWorkoutsList] = useState([]);

  //handle post function takes in nothing
  const getWorkOutsList = () => {
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
    </div>
  );
};

export default DashboardContainer;
