import { createSlice } from '@reduxjs/toolkit';
import dummyData from '../constants/dummyData';

const initialState = {
  commentData: [],
  status: null,
};

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
});

export const {
  getForumComments,
  createComments,
  deleteComments,
  editComments,
} = commentSlice.actions;

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllForums.pending]: (state, action) => {
      state.status = 'loading';
    },
  },
});

export const {} = commentSlice.actions;

export default commentSlice.reducer;
