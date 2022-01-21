import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import dummyData from '../constants/dummyData';

const initialState = {
  commentList: [],
  status: null,
};

export const getForumComments = createAsyncThunk(
  'comments/getForumComments',
  async ({ forumId }) => {
    console.log('entered createAsyncThunk getForumComments');
    const res = await axios.get(`/comments/${forumId}`);
    return res.data.comments;
  }
);

export const deleteComments = createAsyncThunk(
  'comments/deleteComments',
  async ({ forum_id, id }) => {
    const res = await axios.delete('/comments', {
      data: {
        forum_id,
        id,
      },
    });

    return res.data.comments;
  }
);

export const editComments = createAsyncThunk(
  'comments/editComments',
  async ({ description, id, forum_id }) => {
    const res = await axios.put('/comments', { description, id, forum_id });
    return res.data.comments;
  }
);

export const createComments = createAsyncThunk(
  'comments/createComments',
  async ({ owner_user_id, forum_id, description }) => {
    const res = await axios.post('/comments', {
      owner_user_id,
      forum_id,
      description,
    });
    return res.data.comments;
  }
);

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: {
    [getForumComments.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getForumComments.fulfilled]: (state, { payload }) => {
      console.log('getForumComments success case');
      state.commentList = payload;
      state.status = 'success';
    },
    [getForumComments.rejected]: (state, action) => {
      state.status = 'failed';
    },

    [deleteComments.pending]: (state, action) => {
      state.status = 'loading';
    },
    [deleteComments.fulfilled]: (state, { payload }) => {
      state.commentList = payload;
      state.status = 'success';
    },
    [deleteComments.rejected]: (state, action) => {
      state.status = 'failed';
    },

    [editComments.pending]: (state, action) => {
      state.status = 'loading';
    },
    [editComments.fulfilled]: (state, { payload }) => {
      state.commentList = payload;
      state.status = 'success';
    },
    [editComments.rejected]: (state, action) => {
      state.status = 'failed';
    },

    [createComments.pending]: (state, action) => {
      state.status = 'loading';
    },
    [createComments.fulfilled]: (state, { payload }) => {
      state.commentList = payload;
      state.status = 'success';
    },
    [createComments.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export const {} = commentSlice.actions;

export default commentSlice.reducer;
