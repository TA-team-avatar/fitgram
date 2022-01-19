import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import dummyData from '../constants/dummyData';
import axios from 'axios';

const initialState = {
  userId: null,
  userData: {},
};

export const loginUser = createAsyncThunk('user/loginUser', async (user) => {
  const data = {
    user_name: user.username,
    password: user.password,
  };
  const userData = await axios.post('/user/login', data);
  return userData;
});

export const signUpUser = createAsyncThunk('user/signUpUser', async (user) => {
  const userData = await axios.post('/user/signup', user);
  return userData;
});

export const getUserId = createAsyncThunk('user/getUserId', async (payload) => {
  const data = {
    token: payload.token,
  };
  const userId = await axios.post('/session/token', data, {
    headers: { 'Content-Type': 'application/json' },
  });
  console.log('userData==>', userId);
  return userId;
});

export const getUserName = createAsyncThunk(
  'user/getUserName',
  async (payload) => {
    const userInfo = await axios.get(`/user/${payload.userId}`);
    return userInfo;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // getUserId: (state, action) => {
    //   const token = action.payload.token;
    //   /**
    //    * TODO: Make API call to get User ID from the server.
    //    */
    //   const res = dummyData.user;
    //   state.userId = res;
    // },
    // getUserName: (state, action) => {
    //   const userId = action.payload.userId;
    //   // console.log('line 25', userId);
    //   /**
    //    * TODO: Make API call to get User Name from the server.
    //    */
    //   let res = dummyData.users.filter((user) => user.id === userId)[0];
    //   if (res) {
    //     res = JSON.parse(JSON.stringify(res));
    //   }
    //   // console.log('line 29', res);
    //   state.userData = res;
    //   // console.log('state.userData', state.userData);
    // },
  },
  extraReducers: {
    [loginUser.pending]: () => {
      console.log('loginUser api is pending');
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.userId = payload.data.userID;
      sessionStorage.setItem('token', payload.data.token);
      console.log('loginUser fulfilled');
    },
    [loginUser.rejected]: (state) => {
      state.userId = null;
      console.log('Something went wrong in loginUser Call');
    },
    [getUserId.pending]: () => {
      console.log('getUserId api is pending');
    },
    [getUserId.fulfilled]: (state, { payload }) => {
      state.userId = payload.data.user_id;
      console.log('getUserId fulfilled');
    },
    [getUserId.rejected]: (state) => {
      state.userId = null;
      console.log('Something went wrong in getUserId Call');
    },
    [getUserName.pending]: () => {
      console.log('getUserName api is pending');
    },
    [getUserName.fulfilled]: (state, { payload }) => {
      state.userData = payload.data;
      console.log('getUserName fulfilled');
    },
    [getUserName.rejected]: () => {
      console.log('Something went wrong in getUserName Call');
    },
    [signUpUser.pending]: () => {
      console.log('signUpUser api is pending');
    },
    [signUpUser.fulfilled]: (state, { payload }) => {
      state.userId = payload.data.user_id;
      sessionStorage.setItem('token', payload.data.token);
      console.log('signUpUser fulfilled');
    },
    [signUpUser.rejected]: () => {
      console.log('Something went wrong in signUpUser Call');
    },
  },
});

// export const { getUserId, getUserName } = userSlice.actions;

export default userSlice.reducer;
