import React, { useState, useEffect } from "react";

const WorkoutCard = ({ workoutContent, date, athleteId, athleteName }) => {
  return (
    <div className=" bg-center max-w-xl px-4 py-4 bg-white shadow-md rounded-lg hover:bg-gray-100">
      <div className="bg-blue100 shadow-md rounded-lg hover:bg-gray-100">
        {workoutContent}
      </div>
      <div>
        Athlete Name: {athleteName} Date: {date}
      </div>
      <div>Date: {date}</div>
    </div>
  );
};

export default WorkoutCard;
