import React, { useState, useEffect } from "react";
import WorkoutCard from "./WorkoutCard";

const Feed = (props) => {
<<<<<<< HEAD
	const [workoutsList, setWorkoutsList] = useState([]);

	// on mount fetch workout-list from server
	useEffect(() => {
    fetch('/workouts-list')
			.then(res => res.json())
			// set state
			.then(data => setWorkoutsList(data.workoutsList));
	}, [])
  
	// populate array with workout card components
	const workoutCards = []
	workoutsList.forEach((workout, i) => {
		workoutCards.push(<WorkoutCard 
			workoutContent={workout['workout_content']}
			date={workout['date']}
			athleteId={workout['athlete_id']}
			athleteName={workout['athlete_name']}
			key={workout['_id']}
			>
			</WorkoutCard>);
	});

	return(
		<div id="feed" style={styles.container}>
			{workoutCards}
		</div>
	)


=======
  const [workoutsList, setWorkoutsList] = useState([]);

  // on mount fetch workout-list from server
  useEffect(() => {
    fetch("/workouts-list")
      .then((res) => res.json())
      // set state
      .then((data) => setWorkoutsList(data.workoutsList));
  }, []);

  // populate array with workout card components
  const workoutCards = [];
  workoutsList.forEach((workout, i) => {
    workoutCards.push(
      <WorkoutCard
        workoutContent={workout["workout_content"]}
        date={workout["date"]}
        athleteId={workout["athlete_id"]}
        athleteName={workout["athlete_name"]}
        key={workout["_id"]}
      ></WorkoutCard>
    );
  });

  return (
    <div id="feed" style={styles.container}>
      {workoutCards}
    </div>
  );
>>>>>>> 2ec74327bfa0df982e7d4fdea75d2857ced1902d
};

const styles = {
  container: {
    border: "1px black solid",
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
  },
};

export default Feed;
