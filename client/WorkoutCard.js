import React, { useState, useEffect } from "react";

const WorkoutCard = ({workoutContent, date, athleteId}) => {
	return (
    <div style={styles.container}>
			<div>{workoutContent}</div>
			<div>Athlete Name: {athleteId} Date: {date}</div>
		</div>
	);
};

const styles = {
  container: {
    border: '1px solid black',
    height: 100,
    width: '100%',
    flex: 1,
  },
};

export default WorkoutCard;