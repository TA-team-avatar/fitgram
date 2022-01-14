import { createSlice } from "@reduxjs/toolkit";
import dummyData from "../constants/dummyData";

const initialState = {
  routineData: {},
  userRoutineData: [],
  routineWorkoutData: [],
};

export const routineSlice = createSlice({
  name: "routine",
  initialState,
  reducers: {
    getRoutine: (state, action) => {
      const routineId = action.payload.routineId;

      /**
       * TODO: Make API call to get routine information
       */
      let res = dummyData.routines.filter(
        (routine) => routine.id === routineId
      )[0];

      if (res) {
        res = JSON.parse(JSON.stringify(res));
      }

      state.routineData = res;
    },
    getUserRoutines: (state, action) => {
      const userId = action.payload.userId;

      /**
       * TODO: Make API call to get routine information
       */
      let res = dummyData.routines.filter(
        (routine) => routine.owner_user_id === userId
      );

      if (res) {
        res = JSON.parse(JSON.stringify(res));
      }

      state.userRoutineData = res;
    },
    getRoutineWorkout: (state, action) => {
      const routineId = action.payload.routineId;

      /**
       * TODO:
       * Make API call to get routine_workout information
       * Make Server to return join table that include workout name
       */

      let res = dummyData.routine_workouts.filter((routine_workout) => {
        routine_workout.workout_name = dummyData.workouts.filter(
          (workout) => workout.id === routine_workout.workout_id
        )[0].name;
        return routine_workout.routine_id === routineId;
      });

      if (res) {
        res = JSON.parse(JSON.stringify(res));
      }

      state.routineWorkoutData = res;
    },
  },
});

export const { getRoutine, getRoutineWorkout, getUserRoutines } =
  routineSlice.actions;

export default routineSlice.reducer;
