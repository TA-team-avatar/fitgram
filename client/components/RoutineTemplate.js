import React, { useEffect } from "react";
import { getRoutines } from "../features/routineSlice";
import { getRoutineWorkout } from "../features/workoutSlice";
import { useSelector, useDispatch } from "react-redux";

const RoutineTemplate = () => {
  const routineId = useSelector((state) => state.forum.forumData).routine_id;
  const routineData = useSelector((state) => state.routine.routineData);
  const routineWorkoutData = useSelector(
    (state) => state.workout.routineWorkoutData
  );
  console.log("here", routineWorkoutData);
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
        <table className='table'>
          <thead>
            <tr>
              <th>Day</th>
              <th>Workout</th>
              <th>Set</th>
              <th>RM</th>
              <th>Weight</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {routineWorkoutData.map((rw, idx) => (
              <tr key={idx}>
                <td>{rw.day}</td>
                <td>{rw.workout_name}</td>
                <td>{rw.set}</td>
                <td>{rw.repetition_motion}</td>
                <td>{rw.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RoutineTemplate;
