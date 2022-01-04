import React from "react";
import PostWorkoutContainer from "./PostWorkoutContainer";
import Feed from "./Feed";


const DashboardContainer = (props) => {
  return (
    <div className='dashboard-container'>
      <Feed /> 
      <PostWorkoutContainer />
    </div>
  );
};

export default DashboardContainer;
