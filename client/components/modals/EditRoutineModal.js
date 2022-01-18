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
  }, []);

  return (
    <>
      <Button className='btn-secondary' onClick={handleShow}>
        Edit Routine
      </Button>
      <Modal className='modal' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Routine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form>
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
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
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
                })
              );
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

export default EditRoutineModal;
