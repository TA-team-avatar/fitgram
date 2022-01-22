import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllForums = createAsyncThunk("forum/getAllForums", async () => {
  const res = await axios.get("/forum");
  return res.data.forums;
});

export const getForum = createAsyncThunk(
  "forum/getForum",
  async ({ forumId }) => {
    const res = await axios.get(`/forum/${forumId}`);
    return res.data.forum;
  }
);

export const addRoutineToForum = createAsyncThunk(
  "forum/addRoutineToForum",
  async ({ forumId, routineId }) => {
    const res = await axios.put(`/forum/${forumId}`, {
      routine_id: routineId,
    });
    return res.data.forum;
  }
);

export const removeRoutineToForum = createAsyncThunk(
  "forum/removeRoutineToForum",
  async ({ forumId }) => {
    const res = await axios.put(`/forum/${forumId}`, {
      routine_id: "NULL",
    });
    return res.data.forum;
  }
);

export const createForum = createAsyncThunk(
  "forum/createForum",
  async ({ name, owner_user_id }) => {
    const res = await axios.post(`/forum`, {
      owner_user_id,
      name,
    });
    return res.data.forums;
  }
);

export const deleteForum = createAsyncThunk(
  "forum/deleteForum",
  async ({ forumId }) => {
    const res = await axios.delete(`/forum/${forumId}`);
    return res.data.forums;
  }
);

export const getUserForumData = createAsyncThunk(
  "forum/getUserForumData",
  async ({ userId }) => {
    const res = await axios.get(`/forum/user/${userId}`);
    return res.data.forums;
  }
);

const initialState = {
  forumData: {},
  forumList: [],
  status: null,
};

export const forumSlice = createSlice({
  name: "forum",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllForums.pending]: (state, action) => {
      state.status = "loading";
    },
    [getAllForums.fulfilled]: (state, { payload }) => {
      state.forumList = payload;
      state.status = "success";
    },
    [getAllForums.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getForum.pending]: (state, action) => {
      state.status = "loading";
    },
    [getForum.fulfilled]: (state, { payload }) => {
      state.forumData = payload;
      state.status = "success";
    },
    [getForum.rejected]: (state, action) => {
      state.status = "failed";
    },
    [addRoutineToForum.pending]: (state, action) => {
      state.status = "loading";
    },
    [addRoutineToForum.fulfilled]: (state, { payload }) => {
      state.forumData = payload;
      state.status = "success";
    },
    [addRoutineToForum.rejected]: (state, action) => {
      state.status = "failed";
    },
    [removeRoutineToForum.pending]: (state, action) => {
      state.status = "loading";
    },
    [removeRoutineToForum.fulfilled]: (state, { payload }) => {
      state.forumData = payload;
      state.status = "success";
    },
    [removeRoutineToForum.rejected]: (state, action) => {
      state.status = "failed";
    },
    [createForum.pending]: (state, action) => {
      state.status = "loading";
    },
    [createForum.fulfilled]: (state, { payload }) => {
      state.forumList = payload;
      state.status = "success";
    },
    [createForum.rejected]: (state, action) => {
      state.status = "failed";
    },
    [deleteForum.pending]: (state, action) => {
      state.status = "loading";
    },
    [deleteForum.fulfilled]: (state, { payload }) => {
      state.forumList = payload;
      state.status = "success";
    },
    [deleteForum.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getUserForumData.pending]: (state, action) => {
      state.status = "loading";
    },
    [getUserForumData.fulfilled]: (state, { payload }) => {
      state.forumList = payload;
      state.status = "success";
    },
    [getUserForumData.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const {} = forumSlice.actions;

export default forumSlice.reducer;
