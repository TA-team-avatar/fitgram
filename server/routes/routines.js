const express = require('express');
const {
  updateRoutine,
  getRoutine,
  createRoutine,
  deleteRoutine,
  getRoutineWorkout,
  insertRoutineWorkout,
  updateRoutineWorkout,
  deleteRoutineWorkout,
  getUserRoutineWorkout,
  getUserRoutines,
} = require('./../controller/routinesController.js');

const router = express.Router();

router.get('/:routineId', getRoutine, (req, res) => {
  return res.status(200).json({ routine: res.locals.routine });
});

router.get('/user/:id', getUserRoutines, (req, res) => {
  return res.status(200).json({ routines: res.locals.routines });
});

router.post('/', createRoutine, (req, res) => {
  return res.status(200).json({ routine: res.locals.routine });
});

router.put('/:routineId', updateRoutine, (req, res) => {
  return res.status(200).json({ routine: res.locals.routine });
});

router.delete('/', deleteRoutine, (req, res) => {
  return res.status(200).json({ routine_id: res.locals.routine_id });
});

router.get('/workout/user/:id', getUserRoutineWorkout, (req, res) => {
  return res.status(200).json({ userRW: res.locals.userRW });
});

router.get('/workout/:id', getRoutineWorkout, (req, res) => {
  return res.status(200).json({ routineWorkouts: res.locals.rw });
});

router.post('/workout', insertRoutineWorkout, (req, res) => {
  return res.status(200).json({ routineWorkout: res.locals.routineWorkout });
});

router.put('/workout/:id', updateRoutineWorkout, (req, res) => {
  return res.status(200).json(res.locals.updateWorkout);
});
router.delete('/workout', deleteRoutineWorkout, (req, res) => {
  return res
    .status(200)
    .json({ id: res.locals.id, routine_id: res.locals.routine_id });
});

module.exports = router;
