import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserName } from '../features/userSlice';
import { getUserForumData } from '../features/forumSlice';
import { getUserRoutines, deleteRoutine } from '../features/routineSlice';
import AddRoutineModal from '../components/modals/AddRoutineModal';

const ProfileContainer = () => {
  const { userId } = useParams();
  const userData = useSelector((state) => state.user.userData);
  const routineData = useSelector((state) => state.routine.userRoutineData);
  const forumList = useSelector((state) => state.forum.forumList);
  const dispatch = useDispatch();

  const { id, owner_user_id, name, duration, date_created } = routineData;

  let totalLikes = forumList.reduce((acc, item) => acc + item.likes, 0);

  useEffect(() => {
    dispatch(
      getUserName({
        userId: Number(userId),
      })
    ),
      dispatch(
        getUserRoutines({
          userId: Number(userId),
        })
      ),
      dispatch(
        getUserForumData({
          userId: Number(userId),
        })
      );
  }, []);

  return (
    <>
      <div>
        <h2 className='container'>{userData.user_name}'s Profile</h2>
        <div>
          <span className='text'>Total Likes {totalLikes}</span>
          <hr />
          <AddRoutineModal />
          <hr />
          <>
            {routineData.map((routine, index) => (
              <div key={index}>
                <span className='text'>{routine.name}</span>
                Date Created:{' '}
                <span className='text'>{routine.date_created}</span>
                <span>
                  <button
                    className='btn-secondary'
                    onClick={() => {
                      dispatch(
                        deleteRoutine({
                          routineId: routine.id,
                        })
                      );
                    }}
                  >
                    Delete Routine
                  </button>
                  <span>
                    <button className='btn-secondary'>Edit Routine</button>
                  </span>
                </span>
              </div>
            ))}
          </>
          <button className='btn-secondary'>Messages</button>
        </div>
      </div>
    </>
  );
};

export default ProfileContainer;
