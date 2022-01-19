import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import forumReducer from "../features/forumSlice";
import routineReducer from "../features/routineSlice";
import commentReducer from "../features/commentSlice";
import workoutReducer from "../features/workoutSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    forum: forumReducer,
    routine: routineReducer,
    comment: commentReducer,
    workout: workoutReducer,
  },
});
