import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AthleteProfile = ({ athleteId, ...rest }) => {
  const [athleteName, setAthleteName] = useState("Awesome Athlete");
  const history = useNavigate();

  useEffect(() => {
    fetch(`/athlete-info?id=${athleteId}`)
      .then((data) => data.json())
      .then(({ athleteName }) => {
        setAthleteName(athleteName);
      });
  });

  return (
    <div className="athlete-card">
      <button
        type="submit"
        onClick={() => history("../mainpage")}
        className="bg-primary text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
      >
        Main Page
      </button>
      <div>Athlete Id: {athleteId}</div>
      <div>Athlete Name: {athleteName}</div>
    </div>
  );
};

export default AthleteProfile;
