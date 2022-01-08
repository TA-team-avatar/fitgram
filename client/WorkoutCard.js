import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const WorkoutCard = ({ workoutContent, date, cardAthleteId, athleteName }) => {
  return (
    <div className="max-w-xl mx-auto px-4 py-4 bg-white shadow-md rounded-lg hover:bg-gray-100">
      <div>{workoutContent}</div>
      <div>
        Athlete Name: {athleteName} Date: {date}
      </div>
      <div>
        <Link
          to={`../athletepage/${cardAthleteId}`}
          // params={{ cardAthleteId }}
        >
          View {athleteName}'s Profile:
        </Link>
      </div>
    </div>
  );
};

export default WorkoutCard;
