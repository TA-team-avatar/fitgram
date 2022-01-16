import { createSlice } from "@reduxjs/toolkit";
import dummyData from "../constants/dummyData";

const initialState = {
  routineWorkoutData: [],
  userRoutineWorkoutData: {},
  workoutData: [],
};

export const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    getWorkout: (state) => {
      let res = dummyData.workouts;
      if (res) {
        res = JSON.parse(JSON.stringify(res));
      }
      state.workoutData = res;
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
    getUserRoutineWorkout: (state, action) => {
      const userId = action.payload.userId;

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
