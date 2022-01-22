import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const ViewWorkoutModal = ({ workoutData }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button className='btn-dark-modal' onClick={handleShow}>
        View Workout
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Routine Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Workouts</div>
          <hr />
          <table className='table'>
            <thead>
              <tr>
                <th>Day</th>
                <th>Workout</th>
                <th>Set</th>
                <th>RM</th>
                <th>Weight</th>
              </tr>
            </thead>
            <tbody>
              {workoutData ? (
                workoutData.length > 0 ? (
                  workoutData.map((rw, idx) => (
                    <tr key={idx}>
                      <td>{rw.day}</td>
                      <td>{rw.workout_name}</td>
                      <td>{rw.set}</td>
                      <td>{rw.repetition_motion}</td>
                      <td>{rw.weight}</td>
                    </tr>
                  ))
                ) : (
                  <></>
                )
              ) : null}
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

export default ViewWorkoutModal;
