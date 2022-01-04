import React, { useState, useEffect } from "react";
import WorkoutCard from "./WorkoutCard";

const Feed = (props) => {
	const [workoutList, setWorkoutList] = useState([]);

	// on mount fetch workout-list from server
	useEffect(() => {
    fetch('/workoutsList')
		  .then(response)
		// set state
    
	}, [])

	const workoutCards = []
	workoutList.forEach((workout, i) => {
		workoutCards.push(<WorkoutCard workout={workout} key={i}></WorkoutCard>);
	});

	return(
		<div id="feed">
			{workoutCards}
		</div>
	)


};

export default Feed;