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
      <Button className='btn-dark-modal-edit-workout' onClick={handleShow}>
        Edit Workout
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName='modal-dialog-edit-workout'
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Routine Workouts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Workouts</div>
          <hr />
          <AddWorkoutModal routineId={routineId} />
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
              {workoutData?.length > 0 ? (
                workoutData.map((rw, idx) => (
                  <tr key={idx}>
                    <td>{rw.day}</td>
                    <td>{rw.workout_name}</td>
                    <td>{rw.set}</td>
                    <td>{rw.repetition_motion}</td>
                    <td>{rw.weight}</td>
                    <td>
                      <EditWorkoutDetailsModal
                        routineId={routineId}
                        workoutData={rw}
                      />
                    </td>
                    <td>
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
                    </td>
                  </tr>
                ))
              ) : (
                <></>
              )}
            </tbody>
          </table>
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
