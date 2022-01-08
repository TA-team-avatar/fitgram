import React, { useState, useEffect } from "react";

const AthleteProfile = ({ athleteId, ...rest }) => {
  const [athleteName, setAthleteName] = useState("Awesome Athlete");

  useEffect(() => {
    fetch(`/athlete-info?id=${athleteId}`)
      .then((data) => data.json())
      .then(({ athleteName }) => {
        setAthleteName(athleteName);
      });
  });

  return (
    <div className="athlete-card">
      <div>Athlete Id: {athleteId}</div>
      <div>Athlete Name: {athleteName}</div>
    </div>
  );
};

export default AthleteProfile;
