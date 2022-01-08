import React, { useState, useEffect } from "react";
import Feed from "./Feed";
import AthleteProfile from "./AthleteProfile";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

const AthletePage = ({ athleteId }) => {
  const [workoutsList, setWorkoutsList] = useState([]);

  const params = useParams();
  // console.log(params, "<- params");
  if (!athleteId) athleteId = Cookies.get("athleteId");
  if (params.athleteId) athleteId = params.athleteId;
  // console.log("athleteId after useParams:", athleteId);

  //handle get request to find the workouts for a single athlete (from the cookies athleteId set on login)
  const getWorkOutsList = () => {
    return (
      fetch(`/athlete-workouts?id=${athleteId}`)
        .then((res) => res.json())
        // set state
        .then((data) => setWorkoutsList(data.workoutsList))
    );
  };

  // on mount fetch workout-list for the specific athlete from server
  useEffect(() => {
    getWorkOutsList();
  }, []);

  return (
    <div className="Athlete-Page">
      <Feed workoutsList={workoutsList} />
      <AthleteProfile athleteId={athleteId} />
    </div>
  );
};

export default AthletePage;
