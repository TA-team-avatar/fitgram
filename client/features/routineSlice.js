import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import dummyData from '../constants/dummyData';

const initialState = {
  routineData: {},
  userRoutineData: [],
  routineWorkoutData: [],
  userRoutineWorkoutData: {},
  status: null,
};

export const getRoutines = createAsyncThunk(
  'routine/getAllRoutines',
  async () => {
    const res = await axios.get(`/routine/${routineId}`);
    return res.data.routines;
  }
);

export const getUserRoutines = createAsyncThunk(
  'routine/getUserRoutines',
  async ({ userId }) => {
    const res = await axios.get(`/routine/${userId}`);
    return res.userRoutineData;
  }
);

export const createRoutine = createAsyncThunk(
  'routine/createRoutine',
  async ({ userId, name, duration }) => {
    const res = await axios.post(`/routine`, {
      userId,
      name,
      duration,
    });
    return res.userRoutineData;
  }
);

export const updateRoutine = createAsyncThunk(
  'routine/editRoutine',
  async ({ userId, name, duration }) => {
    const res = await axios.put(`/routine`, { userId, name, duration });
    return res.userRoutineData;
  }
);

export const deleteRoutine = createAsyncThunk(
  'routine/deleteRoutine',
  async ({ userId, routineId }) => {
    const res = await axios.delete(`/routine`, { userId, routineId });
    return res.userRoutineData;
  }
);

// export const deleteRoutineWorkout = createAsyncThunk(
//   'routine/deleteRoutineWorkout',
//   async({})
// );

export const routineSlice = createSlice({
  name: 'routine',
  initialState,
  reducers: {},
  extraReducers: {
    [deleteRoutine.pending]: (state, action) => {
      state.status = 'loading';
    },
    [deleteRoutine.fulfilled]: (state, { payload }) => {
      state.userRoutineData = payload;
      state.status = 'success';
    },
    [deleteRoutine.rejected]: (state, action) => {
      state.status = 'failed';
    },
    [updateRoutine.pending]: (state, action) => {
      state.status = 'loading';
    },
    [updateRoutine.fulfilled]: (state, { payload }) => {
      state.userRoutineData = payload;
      state.status = 'success';
    },
    [updateRoutine.rejected]: (state, action) => {
      state.status = 'failed';
    },
    [createRoutine.pending]: (state, action) => {
      state.status = 'loading';
    },
    [createRoutine.fulfilled]: (state, { payload }) => {
      state.userRoutineData = payload;
      state.status = 'success';
    },
    [createRoutine.rejected]: (state, action) => {
      state.status = 'failed';
    },
    [getUserRoutines.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getUserRoutines.fulfilled]: (state, { payload }) => {
      state.userRoutineData = payload;
      state.status = 'success';
    },
    [getUserRoutines.rejected]: (state, action) => {
      state.status = 'failed';
    },
    [getRoutines.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getRoutines.fulfilled]: (state, { payload }) => {
      state.data.routine = payload; //note where this data goes different than others
      state.status = 'success';
    },
    [getRoutines.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});
export const {} = routineSlice.actions;

export default routineSlice.reducer;

// export const routineSlice = createSlice({
//   name: 'routine',
//   initialState,
//   reducers: {
//     getRoutine: (state, action) => {
//       const routineId = action.payload.routineId;

//       /**
//        * TODO: Make API call to get routine information
//        */
//       let res = dummyData.routines.filter(
//         (routine) => routine.id === routineId
//       )[0];

//       if (res) {
//         res = JSON.parse(JSON.stringify(res));
//       }

//       state.routineData = res;
//     },

// getUserRoutines: (state, action) => {
//   const userId = action.payload.userId;
//   /**
//    * TODO: Make API call to get routine information
//    */
//   let res = dummyData.routines.filter(
//     (routine) => routine.owner_user_id === userId
//   );

//   if (res) {
//     res = JSON.parse(JSON.stringify(res));
//   }
//   state.userRoutineData = res;
// },
// createRoutine: (state, action) => {
//   const { userId, name, duration } = action.payload;

//   /**
//    * TODO:
//    * Make API call to edit routine
//    */
//   state.userRoutineData.push({
//     id: 5,
//     name,
//     owner_user_id: userId,
//     duration,
//   });
// },
// editRoutine: (state, action) => {
//   const { userId, routineId, name, duration } = action.payload;

//   /**
//    * TODO:
//    * Make API call to edit routine
//    */

//   let routines = JSON.parse(JSON.stringify(dummyData.routines));

//   routines = routines.filter((routine) => routine.owner_user_id === userId);

//   routines.forEach((routine) => {
//     if (routine.id === routineId) {
//       routine.name = name;
//       routine.duration = duration;
//     }
//   });

//   state.userRoutineData = routines;
// },
//   deleteRoutine: (state, action) => {
//     const { userId, routineId } = action.payload;

//     /**
//      * TODO: Make API call to remove routine
//      */

//     let res = dummyData.routines.filter(
//       (routine) =>
//         routine.id !== routineId && routine.owner_user_id === userId
//     );

//     if (res) {
//       res = JSON.parse(JSON.stringify(res));
//     }

//     state.userRoutineData = res;
//   },
// },
// });
