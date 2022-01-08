import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const WorkoutCard = ({ workoutContent, date, cardAthleteId, athleteName }) => {
  return (
    <div className=" bg-center max-w-xl px-4 py-4 bg-white shadow-md rounded-lg hover:bg-gray-100">
      <div className="bg-blue100 shadow-md rounded-lg hover:bg-gray-100">
        {workoutContent}
      </div>
      {/* <div>Athlete Name: {athleteName}</div> */}
      <div>
        {athleteName}:{" "}
        <Link to={`../athletepage/${cardAthleteId}`} className="underline">
          View Profile
        </Link>
      </div>
      <div>Date: {date}</div>
    </div>
  );
};

export default WorkoutCard;
