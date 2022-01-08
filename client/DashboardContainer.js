import React, { useState, useEffect } from "react";
import PostWorkoutContainer from "./PostWorkoutContainer";
import Feed from "./Feed";
import { useNavigate } from "react-router-dom";

const DashboardContainer = (props) => {
  const [workoutsList, setWorkoutsList] = useState([]);
  const history = useNavigate();

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
    <div id="dashboard-container">
      <div id="nav-bar" className="bg-red50">
        <button
          type="submit"
          onClick={() => history("../athletepage")}
          className="bg-primary content-center text-white font-medium py-1 px-4 border  rounded-lg tracking-wide mr-1 hover:bg-gray-100 first-letter  "
        >
          Profile
        </button>
      </div>
      <div className="bg-neutral grid grid-cols-2 gap-2 my-6 px-4 md:px-6 lg:px-8 relative">
        <Feed workoutsList={workoutsList} />
        <PostWorkoutContainer
          id="styling-PostWorkoutCentainer"
          className=""
          getWorkOutsList={getWorkOutsList}
        />
      </div>
    </div>
  );
};

export default DashboardContainer;
