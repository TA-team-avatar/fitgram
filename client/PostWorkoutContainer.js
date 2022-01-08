import React, { useState } from "react";
import Cookies from "js-cookie";

const PostWorkoutContainer = ({ getWorkOutsList }) => {
  const [body, setBody] = useState("");
  const [athleteId, setAthleteId] = useState(Cookies.get("athleteId"));

  const onBodyChange = (e) => setBody(e.target.value);

  const handlePost = (e) => {
    e.preventDefault();
    // console.log("You have clicked the submit button.");

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
      .then(() => getWorkOutsList()) //re-render on the feed immidiately
      .catch((err) => console.log("Error: could not post workout to database"));

    //reset the content of text field after post
    setBody("");
  };

  const clearPost = () => {
    setBody("");
  };

  return (
    <div className="bg-neutral bg-center flex mx-auto items-center shadow-lg mt-56 mx-8 mb-4 max-w-lg">
      <div className="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
        <h3 className="px-4 pt-3 pb-2 text-gray-800 text-lg">Post Workout</h3>
        <textarea
          className="bg-gray-100 rounded border border-gray-400 leading-normal resize w-full h-40 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
          type="textarea"
          id="textbox"
          name="description"
          placeholder="Workout description"
          value={body}
          onChange={onBodyChange}
          rows={10}
          cols={50}
        />
        <br></br>
        <div id="button-styling" className="grid grid-cols-2 content-center">
          <button
            type="submit"
            onClick={handlePost}
            className="bg-primary text-white font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
          >
            Post
          </button>

          <button
            type="submit"
            onClick={clearPost}
            className="bg-primary text-white font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostWorkoutContainer;
