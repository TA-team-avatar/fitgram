import React from "react";


const PostWorkoutContainer = (props) => {
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
          rows={10}
          cols={50}
        /><br></br>
        <button 
          type="submit" 
          className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100">
          Post
        </button>
      </div>  
    </div>
  );
};

export default PostWorkoutContainer;