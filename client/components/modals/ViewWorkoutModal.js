import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const ViewWorkoutModal = ({ workoutData }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      {/* <Button className='btn-dark-modal' onClick={handleShow}> */}
      <Button className='btn-success' onClick={handleShow}>
        View Workout
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Routine Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Workouts</div>
          <hr />
          {workoutData.length > 0 ? (
            workoutData.map((rw, idx) => (
              <div key={idx}>
                <span>Day: {rw.day}</span>&nbsp;
                <span>Workout: {rw.workout_name}</span>&nbsp;
                <span>Set: {rw.set}</span>&nbsp;
                <span>RM: {rw.repetition_motion}</span>&nbsp;
                <span>Weight: {rw.weight}</span>&nbsp;
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

export default ViewWorkoutModal;
