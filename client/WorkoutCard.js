import React, { useState, useEffect } from "react";

const WorkoutCard = ({workoutContent, date, athleteId, athleteName}) => {
	return (
    <div className="max-w-xl mx-auto px-4 py-4 bg-white shadow-md rounded-lg hover:bg-gray-100">
			<div>{workoutContent}</div>
			<div>Athlete Name: {athleteName} Date: {date}</div>
		</div>
	);
};

export default WorkoutCard;