import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { createRoutine } from "../../features/routineSlice";
import { getUserRoutineWorkout } from "../../features/workoutSlice";
import { useDispatch } from "react-redux";

const BuildRoutineModal = ({ userId }) => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  return (
    <>
      <Button className="btn btn-secondary me-3" onClick={handleShow}>
        Create Routine
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Routine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form>
              <label className="form-label mt-4">Please type in name</label>
              <input
                className="form-control"
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <label className="form-label mt-4">Routine Duration</label>
              <input
                className="form-control"
                type="text"
                onChange={(e) => {
                  setDuration(e.target.value);
                }}
              />
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              dispatch(
                createRoutine({
                  userId,
                  name,
                  duration,
                })
              );
              // Upon creation of routine, update the state of user's routine workout object
              dispatch(getUserRoutineWorkout({ userId, isAdded: true }));
              handleClose();
            }}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BuildRoutineModal;
