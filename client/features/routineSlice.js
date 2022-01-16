import { createSlice } from "@reduxjs/toolkit";
import dummyData from "../constants/dummyData";

const initialState = {
  routineData: {},
  userRoutineData: [],
  routineWorkoutData: [],
  userRoutineWorkoutData: {},
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
    createRoutine: (state, action) => {
      const { userId, name, duration } = action.payload;

      /**
       * TODO:
       * Make API call to edit routine
       */

      let routines = JSON.parse(JSON.stringify(dummyData.routines));
      routines.push({
        id: 5,
        name,
        owner_user_id: userId,
        duration,
      });

      routines = routines.filter((routine) => routine.owner_user_id === userId);

      state.userRoutineData = routines;
    },
    editRoutine: (state, action) => {
      const { userId, routineId, name, duration } = action.payload;

      /**
       * TODO:
       * Make API call to edit routine
       */

      let routines = JSON.parse(JSON.stringify(dummyData.routines));

      routines = routines.filter((routine) => routine.owner_user_id === userId);

      routines.forEach((routine) => {
        if (routine.id === routineId) {
          routine.name = name;
          routine.duration = duration;
        }
      });

      state.userRoutineData = routines;
    },
    deleteRoutine: (state, action) => {
      const { userId, routineId } = action.payload;

      /**
       * TODO: Make API call to remove routine
       */

      let res = dummyData.routines.filter(
        (routine) =>
          routine.id !== routineId && routine.owner_user_id === userId
      );

      if (res) {
        res = JSON.parse(JSON.stringify(res));
      }

      state.userRoutineData = res;
    },
  },
});

export const {
  getRoutine,
  getUserRoutines,
  createRoutine,
  editRoutine,
  deleteRoutine,
} = routineSlice.actions;

export default routineSlice.reducer;
