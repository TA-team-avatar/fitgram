import { createSlice } from "@reduxjs/toolkit";
import dummyData from "../constants/dummyData";

const initialState = {
  forumData: {},
};

export const forumSlice = createSlice({
  name: "forum",
  initialState,
  reducers: {
    getForum: (state, action) => {
      const forumId = action.payload.forumId;
      /**
       * TODO: Make API call to get forum information
       */
      let res = dummyData.forums.filter((forum) => forum.id === forumId)[0];

      if (res) {
        res = JSON.parse(JSON.stringify(res));
      }

      state.forumData = res;
    },

    addRoutineToForum: (state, action) => {
      const forumId = action.payload.forumId;
      const routineId = action.payload.routineId;
      /**
       * TODO: Make API call to add routine id to forum
       */
      let res = dummyData.forums.filter((forum) => forum.id === forumId)[0];

      if (res) {
        res = JSON.parse(JSON.stringify(res));
      }

      res.routine_id = routineId;

      state.forumData = res;
      console.log("Added routine id to target forum");
    },
    removeRoutineToForum: (state, action) => {
      const forumId = action.payload.forumId;

      /**
       * TODO: Make API call to remove routine id to forum
       */
      let res = dummyData.forums.filter((forum) => forum.id === forumId)[0];

      if (res) {
        res = JSON.parse(JSON.stringify(res));
      }

      res.routine_id = undefined;

      state.forumData = res;
      console.log("Removed routine id to target forum");
    },
  },
});

export const { getForum, addRoutineToForum, removeRoutineToForum } =
  forumSlice.actions;

export default forumSlice.reducer;
