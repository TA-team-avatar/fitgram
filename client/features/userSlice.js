import { createSlice } from "@reduxjs/toolkit";
import dummyData from "../constants/dummyData";

const initialState = {
  userId: 5,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserId: (state, action) => {
      const token = action.payload.token;
      /**
       * TODO: Make API call to get User ID from the server.
       */
      const res = dummyData.user;

      state.userId = res;
    },
  },
});

export const { getUserId } = userSlice.actions;

export default userSlice.reducer;
