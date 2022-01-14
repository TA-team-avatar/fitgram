import { createSlice } from '@reduxjs/toolkit';
import dummyData from '../constants/dummyData';

const initialState = {
  forumData: {},
  forumList: [],
};

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    getForum: (state, action) => {
      const forumId = action.payload.forumId;
      /**
       * TODO: Make API call to get forum information
       */
      let res = dummyData.forums.filter((forum) => forum.id === forumId)[0];

      if (res) {
        res = JSON.parse(JSON.stringify(res));
      }

      state.forumData = res;
    },

    addRoutineToForum: (state, action) => {
      const forumId = action.payload.forumId;
      const routineId = action.payload.routineId;
      /**
       * TODO: Make API call to add routine id to forum
       */
      let res = dummyData.forums.filter((forum) => forum.id === forumId)[0];

      if (res) {
        res = JSON.parse(JSON.stringify(res));
      }

      res.routine_id = routineId;

      state.forumData = res;
      console.log('Added routine id to target forum');
    },
    removeRoutineToForum: (state, action) => {
      const forumId = action.payload.forumId;

      /**
       * TODO: Make API call to remove routine id to forum
       */
      let res = dummyData.forums.filter((forum) => forum.id === forumId)[0];

      if (res) {
        res = JSON.parse(JSON.stringify(res));
      }

      res.routine_id = undefined;

      state.forumData = res;
      console.log('Removed routine id to target forum');
    },
    getAllForums: (state) => {
      /**
       * TODO: Make API call to get all forum information
       */
      let res = dummyData.forums;

      if (res) {
        res = JSON.parse(JSON.stringify(res));
      }

      state.forumList = res;
    },
    createForum: (state, action) => {
      const { name, owner_user_id } = action.payload;
      /**
       * TODO: Make API call to add forum to db
       */

      const forums = JSON.parse(JSON.stringify(dummyData.forums));
      forums.push({
        id: 5,
        owner_user_id,
        routine_id: undefined,
        name,
        likes: undefined,
        dislikes: undefined,
        date_created: '2022-01-13',
      });

      state.forumList = forums;
    },
    deleteForum: (state, action) => {
      const forumId = action.payload.forumId;
      console.log(forumId);
      let res = dummyData.forums.filter((forum) => forum.id !== forumId);
      console.log(res);
      /**
       * TODO: Make API call to remove forum
       */

      state.forumList = res;
    },
  },
});

export const {
  getForum,
  addRoutineToForum,
  removeRoutineToForum,
  getAllForums,
  createForum,
  deleteForum,
} = forumSlice.actions;

export default forumSlice.reducer;
