import React, { useState, useEffect } from "react";
import WorkoutCard from "./WorkoutCard";

const Feed = ({ workoutsList }) => {
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
    <div
      id="feed"
      className="bg-neutral rounded grid  grid-cols-1 gap-6 my-6 px-4 md:px-6 lg:px-8"
    >
      {workoutCards}
    </div>
  );
};

export default Feed;
