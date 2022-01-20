import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import dummyData from '../constants/dummyData';

const initialState = {
  commentData: {},
  commentList: [],
  status: null;
};

export const getForumComments = createAsyncThunk(
  'comments/getForumComments',
  async ({ forumId }) => {
    const res = await axios.get(`/comments/${forumId}`)
    return res.data.comments;
  }
);

export const deleteComments = createAsyncThunk(
  'comments/deleteComments',
  async ({ owner_user_id, id }) => {
    const res = await axios.delete('/comments', {owner_user_id, id});
    return res.data.comments;
  }
);

export const editComments = createAsyncThunk(
  'comments/editComments',
  async ({ description, id }) => {
    const res = await axios.put('/comments', {description, id})
    return res.data.comment;
  }
)

export const createComments = createAsyncThunk(
  'comments/createComments',
  async ({owner_user_id, forum_id, description}) => {
    const res = await axios.post('/comments', {
      owner_user_id, forum_id, description
    });
    return res.data.comment;
  }
) 

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: {
    [getForumComments.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getForumComments.fulfilled]: (state, action) => {
      state.commentList = payload;
      state.status = 'success'
    },
    [getForumComments.rejected]: (state, action) => {
      state.status = 'failed';
    },


    [deleteComments.pending]: (state, action) => {
      state.status = 'loading';
    },
    [deleteComments.fulfilled]: (state, action) => {
      state.commentList = payload;
      state.status = 'success'
    },
    [deleteComments.rejected]: (state, action) => {
      state.status = 'failed';
    },


    [editComments.pending]: (state, action) => {
      state.status = 'loading';
    },
    [editComments.fulfilled]: (state, action) => {
      state.commentData = payload;
      state.status = 'success'
    },
    [editComments.rejected]: (state, action) => {
      state.status = 'failed';
    },


    [createComments.pending]: (state, action) => {
      state.status = 'loading';
    },
    [createComments.fulfilled]: (state, action) => {
      state.commentList = payload;
      state.status = 'success'
    },
    [createComments.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export const {} = commentSlice.action;

export default commentSlice.reducer;
