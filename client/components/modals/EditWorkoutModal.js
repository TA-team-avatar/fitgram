import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteWorkout } from '../../features/workoutSlice';
import AddWorkoutModal from './AddWorkoutModal';
import EditWorkoutDetailsModal from './EditWorkoutDetailsModal';

const EditWorkoutModal = ({ routineId, workoutData }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  return (
    <>
      {/* <Button className='btn-dark-modal-edit-workout' onClick={handleShow}> */}
      <Button className='btn btn-success' onClick={handleShow}>
        Edit Workout
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Routine Workouts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Workouts</div>
          <hr />
          <AddWorkoutModal routineId={routineId} />
          <hr />
          {workoutData?.length > 0 ? (
            workoutData.map((rw, idx) => (
              <div key={idx}>
                <span>Day: {rw.day}</span>&nbsp;
                <span>Workout: {rw.workout_name}</span>&nbsp;
                <span>Set: {rw.set}</span>&nbsp;
                <span>RM: {rw.repetition_motion}</span>&nbsp;
                <span>Weight: {rw.weight}</span>&nbsp;
                <EditWorkoutDetailsModal
                  routineId={routineId}
                  workoutData={rw}
                />
                <button
                  className='btn btn-success'
                  onClick={() => {
                    dispatch(
                      deleteWorkout({
                        routineId,
                        id: rw.routine_workout_id,
                      })
                    );
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <></>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn-success' onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditWorkoutModal;
