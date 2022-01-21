import React, { useEffect } from 'react';
import { getRoutines } from '../features/routineSlice';
import { getRoutineWorkout } from '../features/workoutSlice';
import { useSelector, useDispatch } from 'react-redux';

const RoutineTemplate = () => {
  const routineId = useSelector((state) => state.forum.forumData).routine_id;
  const routineData = useSelector((state) => state.routine.routineData);
  const routineWorkoutData = useSelector(
    (state) => state.workout.routineWorkoutData
  );

  const dispatch = useDispatch();

  // Dispatch actions on mount
  useEffect(() => {
    dispatch(
      getRoutines({
        routineId: routineId,
      })
    );
    dispatch(
      getRoutineWorkout({
        routineId: routineId,
      })
    );
  }, []);

  return (
    <>
      <div className='containers'>
        <div className='div-span'>Routine Name: {routineData?.name}</div>
        <div className='first-span'>
          Routine Duration: {routineData?.duration}
        </div>
        <hr />
        {routineWorkoutData.map((rw, idx) => (
          <div key={idx}>
            <span>Day: {rw.day}</span>&nbsp;
            <span>Workout: {rw.workout_name}</span>&nbsp;
            <span>Set: {rw.set}</span>&nbsp;
            <span>RM: {rw.repetition_motion}</span>&nbsp;
            <span>Weight: {rw.weight}</span>&nbsp;
          </div>
        ))}
      </div>
    </>
  );
};

export default RoutineTemplate;
