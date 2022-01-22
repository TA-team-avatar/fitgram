import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import dummyData from '../constants/dummyData';

const initialState = {
  routineWorkoutData: [],
  userRoutineWorkoutData: {},
  workoutData: [],
};

export const getWorkout = createAsyncThunk('workout/getWorkout', async () => {
  const workouts = await axios.get('/workout');
  return workouts.data;
});

export const getRoutineWorkout = createAsyncThunk(
  'workout/getRoutineWorkout',
  async (data) => {
    const routineWorkout = await axios.get(
      `/routine/workout/${data.routineId}`
    );
    return routineWorkout.data;
  }
);

export const createWorkout = createAsyncThunk(
  'workout/createWorkout',
  async ({ routine_id, workout_id, set, repetition_motion, weight, day }) => {
    const body = {
      routine_id,
      workout_id,
      set,
      repetition_motion,
      weight,
      day,
    };
    const createWorkout = await axios.post('/routine/workout', body);
    console.log('here', createWorkout.data);
    return createWorkout.data.routineWorkout;
  }
);

export const getUserRoutineWorkout = createAsyncThunk(
  'workout/getUserRoutineWorkout',
  async (payload) => {
    const userRW = await axios.get(`/routine/workout/user/${payload.userId}`);
    return userRW.data;
  }
);

export const deleteWorkout = createAsyncThunk(
  'workout/deleteWorkout',
  async (payload) => {
    const res = await axios.delete('/routine/workout', {
      data: {
        id: payload.id,
        routine_id: payload.routineId,
      },
    });
    return res.data;
  }
);

export const editWorkout = createAsyncThunk(
  'workout/editWorkout',
  async ({
    id,
    routine_id,
    workout_id,
    set,
    repetition_motion,
    weight,
    day,
  }) => {
    const body = {
      routine_id,
      workout_id,
      set,
      repetition_motion,
      weight,
      day,
    };
    const res = await axios.put(`/routine/workout/${id}`, body);
    return res.data;
  }
);

export const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {},
  extraReducers: {
    [getWorkout.pending]: (state) => {
      state.status = 'getWorkout api is pending';
    },
    [getWorkout.fulfilled]: (state, { payload }) => {
      state.workoutData = [...payload.workouts];
      state.status = 'getWorkout fulfilled';
    },
    [getWorkout.rejected]: (state) => {
      state.status = 'Something went wrong in getWorkout Call';
    },
    [getRoutineWorkout.pending]: (state) => {
      state.status = 'getRoutineWorkout api is pending';
    },
    [getRoutineWorkout.fulfilled]: (state, { payload }) => {
      state.routineWorkoutData = [...payload.routineWorkouts];
      state.status = 'getRoutineWorkout fulfilled';
    },
    [getRoutineWorkout.rejected]: (state) => {
      state.status = 'Something went wrong in getRoutineWorkout Call';
    },
    [createWorkout.pending]: (state) => {
      state.status = 'createWorkout api is pending';
    },
    [createWorkout.fulfilled]: (state, { payload }) => {
      console.log(payload.routine_id);
      state.userRoutineWorkoutData[payload.routine_id]
        ? state.userRoutineWorkoutData[payload.routine_id].push({
            id: payload.id,
            routine_id: payload.routine_id,
            workout_id: payload.workout_id,
            set: payload.set,
            repetition_motion: payload.repetition_motion,
            weight: payload.weight,
            day: payload.day,
          })
        : (state.userRoutineWorkoutData[payload.routine_id] = {
            id: payload.id,
            routine_id: payload.routine_id,
            workout_id: payload.workout_id,
            set: payload.set,
            repetition_motion: payload.repetition_motion,
            weight: payload.weight,
            day: payload.day,
          });
      state.status = 'createWorkout fulfilled';
    },
    [createWorkout.rejected]: (state) => {
      state.status = 'Something went wrong in createWorkout Call';
    },
    [getUserRoutineWorkout.pending]: (state) => {
      state.status = 'getUserRoutineWorkout api is pending';
    },
    [getUserRoutineWorkout.fulfilled]: (state, { payload }) => {
      state.userRoutineWorkoutData = payload.userRW;
      state.status = 'getUserRoutineWorkout fulfilled';
    },
    [getUserRoutineWorkout.rejected]: (state) => {
      state.status = 'Something went wrong in getUserRoutineWorkout Call';
    },
    [deleteWorkout.pending]: (state) => {
      state.status = 'deleteWorkout api is pending';
    },
    [deleteWorkout.fulfilled]: (state, { payload }) => {
      state.userRoutineWorkoutData[payload.routine_id] =
        state.userRoutineWorkoutData[payload.routine_id].filter(
          (data) => data.routine_workout_id !== payload.id
        );
      state.status = 'deleteWorkout fulfilled';
    },
    [deleteWorkout.rejected]: (state) => {
      state.status = 'Something went wrong in deleteWorkout Call';
    },
    [editWorkout.pending]: (state) => {
      state.status = 'editWorkout api is pending';
    },
    [editWorkout.fulfilled]: (state, { payload }) => {
      state.userRoutineWorkoutData[payload.routine_id].forEach((workout) => {
        if (workout.routine_workout_id === payload.id) {
          workout.workout_id = payload.workout_id;
          workout.set = payload.set;
          workout.repetition_motion = payload.repetition_motion;
          workout.weight = payload.weight;
          workout.day = payload.day;
        }
      });
      state.status = 'editWorkout fulfilled';
    },
    [editWorkout.rejected]: (state) => {
      state.status = 'Something went wrong in editWorkout Call';
    },
  },
});

export const {} = workoutSlice.actions;

export default workoutSlice.reducer;
