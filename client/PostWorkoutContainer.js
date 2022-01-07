import React, { useState } from "react";
import Cookies from "js-cookie";

const PostWorkoutContainer = ({ getWorkOutsList }) => {
  const [body, setBody] = useState("");
  const [athleteId, setAthleteId] = useState(Cookies.get("athleteId"));

  const onBodyChange = (e) => setBody(e.target.value);

  const handlePost = (e) => {
    e.preventDefault();
    console.log("You have clicked the submit button.");

    //writing to the database
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        athlete_id: athleteId,
        workout_content: body,
      }),
    };

    fetch("/post-workout", requestOptions)
      .then((res) => console.log("Workout Posted"))
      .catch((err) => console.log("Error: could not post workout to database"));

    //post on the feed.
    getWorkOutsList();

    //reset the content of text field after post
    setBody("");
  };

  return (
    <div className="flex mx-auto items-center justify-center shadow-lg mt-56 mx-8 mb-4 max-w-lg">
      <div className="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
        <h3 className="px-4 pt-3 pb-2 text-gray-800 text-lg">Post workout</h3>
        <textarea 
          className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
          type="textarea"
          id="textbox"
          name="description" 
          placeholder="Workout description"
          value={body}
          onChange={onBodyChange}
          rows={10}
          cols={50}
        /><br></br>
        <button 
          type="submit" 
          onClick={handlePost}
          className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100">
          Post
        </button>
      </div>  
    </div>
  );
};

export default PostWorkoutContainer;

// 1. move feed component state up into main page dashboard component (including the fetch
// to the DB to set the initial state). 2. define a setState function that returns a
// copy of DB workouts + an append of the new workout state with a hook inside of it.
// 3. drill the workout card data's state down into the feed, where it will be rendered into
// card components. 4. drill the change state function down into the post workout component.
// 5. invoke the change state function in the post workout component when submit is engaged,
// so that it simultaneously passes the state back up/down, and passes the new data to the DB
//  for future refresh.
