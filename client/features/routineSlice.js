import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import dummyData from "../constants/dummyData";

const initialState = {
  routineData: {},
  userRoutineData: [],
  routineWorkoutData: [],
  userRoutineWorkoutData: {},
  status: null,
};

export const getRoutines = createAsyncThunk(
  "routine/getRoutine",
  async ({ routineId }) => {
    const res = await axios.get(`/routine/${routineId}`);
    return res.data.routine;
  }
);

export const getUserRoutines = createAsyncThunk(
  "routine/getUserRoutines",
  async ({ userId }) => {
    const res = await axios.get(`/routine/user/${userId}`);
    return res.data.routines;
  }
);

export const createRoutine = createAsyncThunk(
  "routine/createRoutine",
  async ({ userId, name, duration }) => {
    const res = await axios.post(`/routine`, {
      userId,
      name,
      duration,
    });
    return res.data.routine;
  }
);

export const updateRoutine = createAsyncThunk(
  "routine/editRoutine",
  async ({ routineId, userId, name, duration }) => {
    const res = await axios.put(`/routine/${routineId}`, {
      userId,
      name,
      duration,
    });
    return res.data.routine;
  }
);

export const deleteRoutine = createAsyncThunk(
  "routine/deleteRoutine",
  async ({ userId, routineId }) => {
    const res = await axios.delete(`/routine`, { data: { userId, routineId } });
    console.log(res.data);
    return res.data;
  }
);

export const routineSlice = createSlice({
  name: "routine",
  initialState,
  reducers: {},
  extraReducers: {
    [deleteRoutine.pending]: (state, action) => {
      state.status = "loading";
    },
    [deleteRoutine.fulfilled]: (state, { payload }) => {
      state.userRoutineData = state.userRoutineData.filter(
        (routine) => routine.id !== payload.routine_id
      );
      state.status = "success";
    },
    [deleteRoutine.rejected]: (state, action) => {
      state.status = "failed";
    },
    [updateRoutine.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateRoutine.fulfilled]: (state, { payload }) => {
      state.userRoutineData.forEach((routine) => {
        if (routine.id === payload.id) {
          routine.name = payload.name;
          routine.duration = payload.duration;
        }
      });
      state.status = "success";
    },
    [updateRoutine.rejected]: (state, action) => {
      state.status = "failed";
    },
    [createRoutine.pending]: (state, action) => {
      state.status = "loading";
    },
    [createRoutine.fulfilled]: (state, { payload }) => {
      state.userRoutineData.push(payload);
      state.status = "success";
    },
    [createRoutine.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getUserRoutines.pending]: (state, action) => {
      state.status = "loading";
    },
    [getUserRoutines.fulfilled]: (state, { payload }) => {
      state.userRoutineData = payload;
      state.status = "success";
    },
    [getUserRoutines.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getRoutines.pending]: (state, action) => {
      state.status = "loading";
    },
    [getRoutines.fulfilled]: (state, { payload }) => {
      state.routineData = payload; //note where this data goes different than others
      state.status = "success";
    },
    [getRoutines.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});
export const {} = routineSlice.actions;

export default routineSlice.reducer;
