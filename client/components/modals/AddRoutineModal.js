import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import classNames from "classnames";
import { getUserRoutines } from "../../features/routineSlice";
import { useSelector, useDispatch } from "react-redux";
import { Select, MenuItem } from "@material-ui/core";

const AddRoutineModal = ({ userId }) => {
  const [routine, setRoutine] = useState("");
  const userRoutineData = useSelector((state) => state.routine.userRoutineData);
  const [isRoutineValid, setIsRoutineValid] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  // Dispatch actions on mount
  useEffect(() => {
    dispatch(
      getUserRoutines({
        userId: userId,
      })
    );
  }, []);

  return (
    <>
      <Button className="btn btn-secondary me-3" onClick={handleShow}>
        Add Routine
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Routine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form>
              <label className="form-label mt-4">
                Please choose your routine
              </label>
              <Select
                onChange={(e) => {
                  if (!e.target.value) {
                    setIsRoutineValid(false);
                  } else {
                    setIsRoutineValid(true);
                  }
                  console.log(e.target.value);
                  setRoutine(e.target.value);
                }}
                className="dropdown-menu"
                color="secondary"
                variant="outlined"
                value={routine}
                displayEmpty
                required
                fullWidth
              >
                <MenuItem required value="" disabled>
                  Routines
                </MenuItem>
                {userRoutineData.map((routine, idx) => (
                  <MenuItem key={idx} value={routine.id}>
                    {routine.name}
                  </MenuItem>
                ))}
              </Select>
              <div className="invalid-feedback">
                You must choose the routine!
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              /**
               * TODO: Add routine id to forum
               */
              handleClose();
            }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddRoutineModal;
