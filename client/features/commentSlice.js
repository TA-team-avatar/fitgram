import { createSlice } from '@reduxjs/toolkit';
import dummyData from '../constants/dummyData';

const initialState = {
  commentData: [],
};

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    getForumComments: (state, action) => {
      const forumId = action.payload.forumId;

      /**
       * TODO: Make API call to get forum comment information
       */
      let res = dummyData.comments.filter(
        (comment) => comment.forum_id === forumId
      );

      if (res) {
        res = JSON.parse(JSON.stringify(res));
      }

      state.commentData = res;
    },
    createComments: (state, action) => {
      const { description, owner_user_id, forum_id } = action.payload;
      /**
       * TODO: Make API call to add comments to db
       */

      const comments = JSON.parse(JSON.stringify(dummyData.comments));
      comments.push({
        id: 4,
        description,
        owner_user_id,
        forum_id,
        date_created: '2022-01-15',
        user_name: 'Han',
      });
      state.commentData = comments;
    },
    deleteComments: (state, action) => {
      const { id } = action.payload;
      /**
       * TODO: Make API call to delete comments to db
       */

      let res = dummyData.comments.filter((comment) => comment.id !== id);

      if (res) {
        res = JSON.parse(JSON.stringify(res));
      }

      state.commentData = res;
    },
    editComments: (state, action) => {
      const { id, description } = action.payload;
      /**
       * TODO: Make API call to delete comments to db
       */

      const comments = JSON.parse(JSON.stringify(dummyData.comments));
      console.log('Hi');
      comments.forEach((comment) => {
        if (comment.id === id) {
          comment.description = description;
        }
      });

      state.commentData = comments;
    },
  },
});

export const {
  getForumComments,
  createComments,
  deleteComments,
  editComments,
} = commentSlice.actions;

export default commentSlice.reducer;
