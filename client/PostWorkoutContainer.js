import React from "react";


const PostWorkoutContainer = (props) => {
  return (
    <div className='post-workout-container'>
      <h3>Post workout</h3>
      <label for="fname">Workout description:</label><br></br>
      <textarea type="textarea"
        id="textbox"
        name="description" 
        rows={10}
        cols={50}
      /><br></br>
      <button type="submit">Post</button>
    </div>
  );
};

export default PostWorkoutContainer;