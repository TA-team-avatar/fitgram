import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { editRoutine } from "../../features/routineSlice";
import { useDispatch } from "react-redux";

const EditRoutineModal = ({ userId, routineId, name, duration }) => {
  const [routineName, setRoutineName] = useState("");
  const [routineDuration, setRoutineDuration] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  // Set default routine info
  useEffect(() => {
    setRoutineName(name);
    setRoutineDuration(duration);
  }, []);

  return (
    <>
      <Button className="btn btn-secondary me-3" onClick={handleShow}>
        Edit Routine
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Routine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form>
              <label className="form-label mt-4">Please type in name</label>
              <input
                className="form-control"
                type="text"
                value={routineName}
                onChange={(e) => {
                  setRoutineName(e.target.value);
                }}
              />
              <label className="form-label mt-4">Routine Duration</label>
              <input
                className="form-control"
                type="text"
                value={routineDuration}
                onChange={(e) => {
                  setRoutineDuration(e.target.value);
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
                editRoutine({
                  userId,
                  routineId,
                  name: routineName,
                  duration: routineDuration,
                })
              );
              handleClose();
            }}
          >
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditRoutineModal;
