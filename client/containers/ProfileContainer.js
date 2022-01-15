import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserId, getUserName } from '../features/userSlice';
import { getUserForumData } from '../features/forumSlice';
import { getUserRoutines } from '../features/routineSlice';
import { keys } from 'regenerator-runtime';
import AddRoutineModal from '../components/modals/AddRoutineModal';

const ProfileContainer = () => {
  const userData = useSelector((state) => state.userData);
  const currentUserId = useSelector((state) => state.user.userId);
  const routineList = useSelector((state) => state.routine.userRoutineData);
  const forumList = useSelector((state) => state.forum.forumList);
  const dispatch = useDispatch();

  const { id, owner_user_id, name, duration, date_created } = routineList;
  let profileName = userData[0].user_name;

  //expected 1007 -userId 1: Han
  let totalLikes = forumList.reduce((acc, item) => acc + item.likes, 0);

  useEffect(() => {
    dispatch(
      getUserId({
        token: 'fakeToken',
      })
    ),
      dispatch(
        getUserName({
          userId: currentUserId,
        })
      ),
      dispatch(
        getUserRoutines({
          userId: currentUserId,
        })
      ),
      dispatch(
        getUserForumData({
          userId: currentUserId,
        })
      );
    console.log(userData);
  }, []);

  return (
    <>
      <h1>{profileName} Profile</h1>
      <div>
        <span>Total Likes{totalLikes}</span>
        <hr />
        <AddRoutineModal />
        <hr />
        <>
          {routineList.map((routine, index) => (
            <div key={index}>
              <span>{routine.name}</span>
              Date Created: <span>{routine.date_created}</span>
            </div>
          ))}
        </>
        <button className='btn btn-secondary me-3'>Messages</button>
      </div>
    </>
  );
};

export default ProfileContainer;
