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
  return workouts;
});

export const getRoutineWorkout = createAsyncThunk(
  'workout/getRoutineWorkout',
  async (data) => {
    const routineWorkout = await axios.get(
      `/routine/workout/${data.routineid}`
    );
    return routineWorkout;
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
    return createWorkout;
  }
);

export const getUserRoutineWorkout = createAsyncThunk(
  'workout/getUserRoutineWorkout',
  async (payload) => {
    const userRW = axios.get(`/routine/workout/user/${payload.userId}`);
    return userRW;
  }
);

export const deleteWorkout = createAsyncThunk(
  'workout/deleteWorkout',
  async (payload) => {
    const data = axios.delete('/routine/workout', {
      id: payload.id,
      routine_id: payload.routineId,
    });
    return data;
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
    const data = axios.put(`/routine/workout/${id}`, body);
    return data;
  }
);

export const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    // getWorkout: (state) => {
    //   let res = dummyData.workouts;
    //   if (res) {
    //     res = JSON.parse(JSON.stringify(res));
    //   }
    //   state.workoutData = res;
    // },
    // getRoutineWorkout: (state, action) => {
    //   const routineId = action.payload.routineId;
    //   /**
    //    * TODO:
    //    * Make API call to get routine_workout information
    //    * Make Server to return join table that include workout name
    //    */
    //   let res = dummyData.routine_workouts.filter((routine_workout) => {
    //     routine_workout.workout_name = dummyData.workouts.filter(
    //       (workout) => workout.id === routine_workout.workout_id
    //     )[0].name;
    //     return routine_workout.routine_id === routineId;
    //   });
    //   if (res) {
    //     res = JSON.parse(JSON.stringify(res));
    //   }
    //   state.routineWorkoutData = res;
    // },
    // getUserRoutineWorkout: (state, action) => {
    //   const userId = action.payload.userId;
    //   const isAdded = action.payload.isAdded;
    //   /**
    //    * TODO:
    //    * Make API call to get all user routine_workout information
    //    * Make Server to return join table that include workout name
    //    */
    //   let cache = {};
    //   const routines = dummyData.routines.filter(
    //     (routine) => routine.owner_user_id === userId
    //   );
    //   for (let routine of routines) {
    //     let res = dummyData.routine_workouts.filter((routine_workout) => {
    //       routine_workout.workout_name = dummyData.workouts.filter(
    //         (workout) => workout.id === routine_workout.workout_id
    //       )[0].name;
    //       return routine_workout.routine_id === routine.id;
    //     });
    //     if (res) {
    //       res = JSON.parse(JSON.stringify(res));
    //     }
    //     cache[routine.id] = res;
    //   }
    //   state.userRoutineWorkoutData = cache;
    //   //test code
    //   if (isAdded) {
    //     state.userRoutineWorkoutData[5] = [];
    //   }
    // },
    // deleteWorkout: (state, action) => {
    //   const { routineId, id } = action.payload;
    //   /**
    //    * TODO: Make API call to delete routine_workout to db
    //    */
    //   state.userRoutineWorkoutData[routineId] = state.userRoutineWorkoutData[
    //     routineId
    //   ].filter((data) => data.id !== id);
    // },
    // createWorkout: (state, action) => {
    //   const { routine_id, workout_id, set, repetition_motion, weight, day } =
    //     action.payload;
    //   /**
    //    * TODO: Make API call to create routine_workout to db
    //    */
    //   state.userRoutineWorkoutData[routine_id].push({
    //     id: 6,
    //     routine_id,
    //     workout_id,
    //     set,
    //     repetition_motion,
    //     weight,
    //     day,
    //   });
    // },
    // editWorkout: (state, action) => {
    //   const {
    //     routine_id,
    //     id,
    //     workout_id,
    //     set,
    //     repetition_motion,
    //     weight,
    //     day,
    //   } = action.payload;
    //   console.log('edit', {
    //     routine_id,
    //     id,
    //     workout_id,
    //     set,
    //     repetition_motion,
    //     weight,
    //     day,
    //   });
    //   /**
    //    * TODO: Make API call to create routine_workout to db
    //    */
    //   state.userRoutineWorkoutData[routine_id].forEach((workout) => {
    //     if (workout.id === id) {
    //       workout.workout_id = workout_id;
    //       workout.set = set;
    //       workout.repetition_motion = repetition_motion;
    //       workout.weight = weight;
    //       workout.day = day;
    //     }
    //   });
    // },
  },
  extraReducers: {
    [getWorkout.pending]: (state) => {
      state.status = 'getWorkout api is pending';
    },
    [getWorkout.fulfilled]: (state, { payload }) => {
      state.workoutData = [...payload.data.workouts];
      state.status = 'getWorkout fulfilled';
    },
    [getWorkout.rejected]: (state) => {
      state.status = 'Something went wrong in getWorkout Call';
    },
    [getRoutineWorkout.pending]: (state) => {
      state.status = 'getRoutineWorkout api is pending';
    },
    [getRoutineWorkout.fulfilled]: (state, { payload }) => {
      state.routineWorkoutData = [...payload.data.routineWorkouts];
      state.status = 'getRoutineWorkout fulfilled';
    },
    [getRoutineWorkout.rejected]: (state) => {
      state.status = 'Something went wrong in getRoutineWorkout Call';
    },
    [createWorkout.pending]: (state) => {
      state.status = 'createWorkout api is pending';
    },
    [createWorkout.fulfilled]: (state, { payload }) => {
      state.userRoutineWorkoutData[payload.data.routine_id].push({
        id: payload.data.id,
        routine_id: payload.data.routine_id,
        workout_id: payload.data.workout_id,
        set: payload.data.set,
        repetition_motion: payload.data.repetition_motion,
        weight: payload.data.weight,
        day: payload.data.day,
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
      state.userRoutineWorkoutData = payload.data.userRW;
      state.status = 'getUserRoutineWorkout fulfilled';
    },
    [getUserRoutineWorkout.rejected]: (state) => {
      state.status = 'Something went wrong in getUserRoutineWorkout Call';
    },
    [deleteWorkout.pending]: (state) => {
      state.status = 'deleteWorkout api is pending';
    },
    [deleteWorkout.fulfilled]: (state, { payload }) => {
      state.userRoutineWorkoutData[payload.data.routine_id] =
        state.userRoutineWorkoutData[payload.data.routine_id].filter(
          (data) => data.id !== payload.data.id
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
      state.userRoutineWorkoutData[payload.data.routine_id].forEach(
        (workout) => {
          if (workout.id === payload.data.id) {
            workout.workout_id = payload.data.workout_id;
            workout.set = payload.data.set;
            workout.repetition_motion = payload.data.repetition_motion;
            workout.weight = payload.data.weight;
            workout.day = payload.data.day;
          }
        }
      );
      state.status = 'editWorkout fulfilled';
    },
    [editWorkout.rejected]: (state) => {
      state.status = 'Something went wrong in editWorkout Call';
    },
  },
});

export const {} = workoutSlice.actions;

export default workoutSlice.reducer;
