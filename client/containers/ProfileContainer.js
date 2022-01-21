import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserId, getUserName } from '../features/userSlice';
import { getUserForumData } from '../features/forumSlice';
import { getUserRoutines, deleteRoutine } from '../features/routineSlice';
import { getUserRoutineWorkout, getWorkout } from '../features/workoutSlice';
import BuildRoutineModal from '../components/modals/BuildRoutineModal';
import EditRoutineModal from '../components/modals/EditRoutineModal';
import EditWorkoutModal from '../components/modals/EditWorkoutModal';
import ViewWorkoutModal from '../components/modals/ViewWorkoutModal';

const ProfileContainer = () => {
  let { userId } = useParams();
  userId = Number(userId);
  const userData = useSelector((state) => state.user.userData);
  const currentUserId = useSelector((state) => state.user.userId);
  const routineData = useSelector((state) => state.routine.userRoutineData);
  const forumList = useSelector((state) => state.forum.forumList);
  const userRoutineWorkout = useSelector(
    (state) => state.workout.userRoutineWorkoutData
  );
  const dispatch = useDispatch();

  let totalLikes = forumList.reduce((acc, item) => acc + item.likes, 0);

  // Dispatch actions on mount
  useEffect(async () => {
    dispatch(
      getUserId({
        token: sessionStorage.getItem('token'),
      })
    );
    dispatch(
      getUserName({
        userId,
      })
    );
    dispatch(
      getUserRoutines({
        userId,
      })
    );
    dispatch(
      getUserForumData({
        userId,
      })
    );
    dispatch(
      getUserRoutineWorkout({
        userId,
      })
    );
    dispatch(getWorkout());
  }, []);

  console.log('routine', routineData);
  console.log('routineWO', userRoutineWorkout);
  // console.log('rw data', userRoutineWorkout);
  return (
    <>
      <div>
        <h1>UserNameHere</h1>
        <div></div>
        <h3>Total Likes {totalLikes}</h3>
        {currentUserId === userId ? (
          <>
            <BuildRoutineModal userId={userId} />
            <hr />
          </>
        ) : (
          <></>
        )}
        <>
          {routineData.map((routine, index) => (
            <div key={index}>
              <h3>{routine.name}</h3>
              <div>Duration: {routine.duration}</div>
              <div>{routine.date_created}</div>
              {currentUserId === userId ? (
                <span>
                  <EditWorkoutModal
                    routineId={routine.id}
                    workoutData={userRoutineWorkout[routine.id]}
                  />
                  <EditRoutineModal
                    userId={userId}
                    routineId={routine.id}
                    name={routine.name}
                    duration={routine.duration}
                  />
                  <button
                    className='btn btn-success'
                    onClick={async () => {
                      await dispatch(
                        deleteRoutine({
                          routineId: routine.id,
                          userId: Number(userId),
                        })
                      );
                      // Upon deletion of routine, update the state of user's routine workout object
                      await dispatch(
                        getUserRoutineWorkout({
                          userId,
                        })
                      );
                    }}
                  >
                    Delete Routine
                  </button>
                  {/* <span>
                    <button className='btn-success'>Edit Routine</button>
                  </span> */}
                </span>
              ) : (
                <ViewWorkoutModal
                  workoutData={userRoutineWorkout[routine.id]}
                />
              )}
              <hr />
            </div>
          ))}
        </>
      </div>
    </>
  );
};

export default ProfileContainer;
