import React, { useState, useEffect } from "react";
import Feed from "./Feed";
import AthleteProfile from "./AthleteProfile";
import Header from "./Header";
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
    <React.Fragment>
      <Header />
      <div
        id="Athlete-Page"
        className="bg-neutral grid grid-cols-1 gap-6 my-5 px-4 md:px-6 lg:px-8"
      >
        <div className="bg-neutral grid grid-cols-2 gap-2 my-5 px-4 md:px-6 lg:px-8">
          <AthleteProfile athleteId={athleteId} />
        </div>
        <Feed workoutsList={workoutsList} />
      </div>
    </React.Fragment>
  );
};

export default AthletePage;
