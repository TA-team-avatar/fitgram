import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { editWorkout } from '../../features/workoutSlice';
import { Select, MenuItem } from '@material-ui/core';

const EditWorkoutDetailsModal = ({ routineId, workoutData }) => {
  const { routine_workout_id: id } = workoutData;
  const [workout, setWorkout] = useState('');
  const [day, setDay] = useState('');
  const [sets, setSets] = useState('');
  const [weight, setWeight] = useState('');
  const [rm, setRm] = useState('');
  const [show, setShow] = useState(false);
  const workouts = useSelector((state) => state.workout.workoutData);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  // Set default comments
  useEffect(() => {
    setWorkout(workoutData.workout_id);
    setDay(workoutData.day);
    setSets(workoutData.set);
    setWeight(workoutData.weight);
    setRm(workoutData.repetition_motion);
  }, []);

  return (
    <>
      {/* <Button className='btn-dark-modal' onClick={handleShow}> */}
      <Button className='btn-success' onClick={handleShow}>
        Edit Workout
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Workouts</div>
          <form>
            <label className='form-label mt-4'>Please choose workout</label>
            <Select
              onChange={(e) => {
                setWorkout(e.target.value);
              }}
              className='dropdown-menu'
              color='secondary'
              variant='outlined'
              value={workout}
              displayEmpty
              required
              fullWidth
            >
              <MenuItem required value='' disabled>
                Workouts
              </MenuItem>
              {workouts.map((wo, idx) => (
                <MenuItem key={idx} value={wo.id}>
                  {wo.name}
                </MenuItem>
              ))}
            </Select>
            <label className='form-label mt-4'>How many sets?</label>
            <input
              className='form-control'
              type='number'
              value={sets}
              onChange={(e) => {
                setSets(e.target.value);
              }}
            />
            <label className='form-label mt-4'>
              How many repetition motion for each set?
            </label>
            <input
              className='form-control'
              type='number'
              value={rm}
              onChange={(e) => {
                setRm(e.target.value);
              }}
            />
            <label className='form-label mt-4'>Weight for each RM?</label>
            <input
              className='form-control'
              type='number'
              value={weight}
              onChange={(e) => {
                setWeight(e.target.value);
              }}
            />
            <label className='form-label mt-4'>Please select day</label>
            <Select
              onChange={(e) => {
                setDay(e.target.value);
              }}
              className='dropdown-menu'
              color='secondary'
              variant='outlined'
              value={day}
              displayEmpty
              required
              fullWidth
            >
              <MenuItem required value='' disabled>
                Days
              </MenuItem>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(
                (d, idx) => (
                  <MenuItem key={idx} value={d}>
                    {d}
                  </MenuItem>
                )
              )}
            </Select>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn-success' onClick={handleClose}>
            Cancel
          </Button>
          <Button
            className='btn-success'
            onClick={() => {
              dispatch(
                editWorkout({
                  routine_id: routineId,
                  id,
                  workout_id: workout,
                  set: sets,
                  repetition_motion: rm,
                  weight,
                  day,
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

export default EditWorkoutDetailsModal;
