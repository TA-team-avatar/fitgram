import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import forumReducer from "../features/forumSlice";
import routineReducer from "../features/routineSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    forum: forumReducer,
    routine: routineReducer,
  },
});
