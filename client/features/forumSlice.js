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
      const res = dummyData.forums.filter(
        (forum) => forum.id === Number(forumId)
      )[0];

      state.forumData = res;
    },
  },
});

export const { getForum } = forumSlice.actions;

export default forumSlice.reducer;
