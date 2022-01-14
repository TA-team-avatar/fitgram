import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserId, getUserName } from '../features/userSlice';
import { getUserForumData } from '../features/forumSlice';
import { keys } from 'regenerator-runtime';
import AddRoutineModal from '../components/modals/AddRoutineModal';

const ProfileContainer = () => {
  const userData = useSelector((state) => state.user.userData);
  const currentUserId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();
  const forumData = useSelector((state) => state.forum.forumData);

  const { user_name, id } = userData;
  const { date_created, likes, dislikes, name, owner_user_id, routine_id } =
    forumData;

  let totalLikes = 0;
  Object.keys(forumData).map(function (key, index) {
    if (forumData.key === 'likes') {
      totalLikes += forumData[key];
    }
  });

  useEffect(() => {
    dispatch(
      getUserId({
        token: 'fakeToken',
      }),
      getUserName({
        userId: currentUserId,
      }),
      getUserForumData({
        userId: currentUserId,
      })
    );
    console.log(userData);
  });

  return (
    <>
      <h1>{user_name} Profile</h1>
      <div>
        <span>Forum Total Likes{totalLikes}</span>
        <hr />
        <AddRoutineModal />
        <hr />
        <button className='btn btn-secondary me-3'>Messages</button>
      </div>
    </>
  );
};

export default ProfileContainer;
