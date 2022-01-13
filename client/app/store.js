import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";
import userReducer from "../features/userSlice";
import forumReducer from "../features/forumSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    forum: forumReducer,
  },
});
