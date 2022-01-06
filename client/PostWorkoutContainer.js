import React, { useState } from "react";

const PostWorkoutContainer = (props) => {
  const [body, setBody] = useState("");
  const onBodyChange = (e) => setBody(e.target.value);

  const handlePost = (e) => {
    e.preventDefault();
    console.log("You have clicked the submit button.");

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        athlete_id: 1,
        workout_content: body,
      }),
    };

    fetch("/post-workout", requestOptions)
      .then((res) => console.log("Workout Posted"))
      .catch((err) => console.log("Error: could not post workout to database"));
  };

  return (
    <div className="post-workout-container">
      <h3>Post workout</h3>
      <label>Workout description:</label>
      <br></br>
      <textarea
        type="textarea"
        id="textbox"
        name="description"
        value={body}
        onChange={onBodyChange}
        laceholder="Body"
        rows={10}
        cols={50}
      />
      <br></br>
      <button onClick={handlePost}>Post</button>
    </div>
  );
};

export default PostWorkoutContainer;
