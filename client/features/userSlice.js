import { createSlice } from '@reduxjs/toolkit';
import dummyData from '../constants/dummyData';

const initialState = {
  userId: 2,
  userData: {},
};

export const userSlice = createSlice({
  name: 'user',
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

    getUserName: (state, action) => {
      const userId = action.payload.userId;
      console.log(userId);
      /**
       * TODO: Make API call to get User Name from the server.
       */
      let res = dummyData.users.filter((user) => user.id === userId);
      console.log(res);

      state.userData = res;
    },
  },
});

export const { getUserId, getUserName } = userSlice.actions;

export default userSlice.reducer;
