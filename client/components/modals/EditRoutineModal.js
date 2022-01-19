<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Select, MenuItem } from '@material-ui/core';
import { editRoutine, getUserRoutines } from '../../features/routineSlice';

const EditRoutineModal = () => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [routineId, setRoutineId] = useState('');
  const userRoutineData = useSelector((state) => state.routine.userRoutineData);
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getUserRoutines({
        userId: userId,
      })
    );
=======
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
>>>>>>> dev
  }, []);

  return (
    <>
<<<<<<< HEAD
      <Button className='btn-secondary' onClick={handleShow}>
        Edit Routine
      </Button>
      <Modal className='modal' show={show} onHide={handleClose}>
=======
      <Button className="btn btn-secondary me-3" onClick={handleShow}>
        Edit Routine
      </Button>
      <Modal show={show} onHide={handleClose}>
>>>>>>> dev
        <Modal.Header closeButton>
          <Modal.Title>Edit Routine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form>
<<<<<<< HEAD
              <label className='form-label mt-4'>
                Please choose your routine
              </label>
              <Select
                onChange={(e) => {
                  setRoutineId(e.target.value);
                }}
                className='dropdown-menu'
                color='secondary'
                variant='outlined'
                options={userRoutineData}
                placeholder={userRoutineData.name}
                value={routineId}
                displayEmpty
                required
                fullWidth
              >
                <MenuItem required value='' disabled>
                  Routines
                </MenuItem>
                {userRoutineData.map((routine, idx) => (
                  <MenuItem key={idx} value={routine.id}>
                    {routine.name}
                  </MenuItem>
                ))}
              </Select>
              <div className='invalid-feedback'>
                You must choose the routine!
              </div>
=======
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
>>>>>>> dev
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
<<<<<<< HEAD
          <Button variant='secondary' onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant='primary'
            onClick={() => {
              /**
               * TODO: Add routine id to forum
               */
              const forumId = forumData.id;
              dispatch(
                editRoutine({
                  forumId: forumId,
                  routineId: routineId,
=======
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
>>>>>>> dev
                })
              );
              handleClose();
            }}
          >
<<<<<<< HEAD
            Add
=======
            Edit
>>>>>>> dev
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditRoutineModal;
