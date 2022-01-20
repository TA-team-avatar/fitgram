import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import dummyData from '../constants/dummyData';

const initialState = {
  routineWorkoutData: [],
  userRoutineWorkoutData: {},
  workoutData: [],
};

const getWorkout = createAsyncThunk('workout/getWorkout', async () => {
  const workouts = await axios.get('/workout');
  return workouts;
});

const getRoutineWorkout = createAsyncThunk(
  'workout/getRoutineWorkout',
  async (data) => {
    const routineWorkout = await axios.get(
      `/routine/workout/${data.routineid}`
    );
    return routineWorkout;
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
    getUserRoutineWorkout: (state, action) => {
      const userId = action.payload.userId;
      const isAdded = action.payload.isAdded;

      /**
       * TODO:
       * Make API call to get all user routine_workout information
       * Make Server to return join table that include workout name
       */
      let cache = {};
      const routines = dummyData.routines.filter(
        (routine) => routine.owner_user_id === userId
      );

      for (let routine of routines) {
        let res = dummyData.routine_workouts.filter((routine_workout) => {
          routine_workout.workout_name = dummyData.workouts.filter(
            (workout) => workout.id === routine_workout.workout_id
          )[0].name;
          return routine_workout.routine_id === routine.id;
        });
        if (res) {
          res = JSON.parse(JSON.stringify(res));
        }
        cache[routine.id] = res;
      }
      state.userRoutineWorkoutData = cache;

      //test code
      if (isAdded) {
        state.userRoutineWorkoutData[5] = [];
      }
    },
    deleteWorkout: (state, action) => {
      const { routineId, id } = action.payload;
      /**
       * TODO: Make API call to delete routine_workout to db
       */

      state.userRoutineWorkoutData[routineId] = state.userRoutineWorkoutData[
        routineId
      ].filter((data) => data.id !== id);
    },

    createWorkout: (state, action) => {
      const { routine_id, workout_id, set, repetition_motion, weight, day } =
        action.payload;
      /**
       * TODO: Make API call to create routine_workout to db
       */
      state.userRoutineWorkoutData[routine_id].push({
        id: 6,
        routine_id,
        workout_id,
        set,
        repetition_motion,
        weight,
        day,
      });
    },
    editWorkout: (state, action) => {
      const {
        routine_id,
        id,
        workout_id,
        set,
        repetition_motion,
        weight,
        day,
      } = action.payload;

      console.log('edit', {
        routine_id,
        id,
        workout_id,
        set,
        repetition_motion,
        weight,
        day,
      });
      /**
       * TODO: Make API call to create routine_workout to db
       */
      state.userRoutineWorkoutData[routine_id].forEach((workout) => {
        if (workout.id === id) {
          workout.workout_id = workout_id;
          workout.set = set;
          workout.repetition_motion = repetition_motion;
          workout.weight = weight;
          workout.day = day;
        }
      });
    },
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
  },
});

export const {
  getWorkout,
  getRoutineWorkout,
  getUserRoutineWorkout,
  deleteWorkout,
  createWorkout,
  editWorkout,
} = workoutSlice.actions;

export default workoutSlice.reducer;
