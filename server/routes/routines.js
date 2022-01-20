const express = require('express');
const {
  updateRoutine,
  getAllRoutines,
  insertRoutine,
  deleteRoutine,
  getRoutineWorkout,
  insertRoutineWorkout,
  updateRoutineWorkout,
  deleteRoutineWorkout,
} = require('./../controller/routinesController.js');

const router = express.Router();

router.get('/', getAllRoutines, (req, res) => {
  return res.status(200).json({ routines: res.locals.routines });
});

router.post('/', insertRoutine, (req, res) => {
  return res.sendStatus(200);
});

router.put('/:id', updateRoutine, (req, res) => {
  return res.sendStatus(200);
});

router.delete('/', deleteRoutine, (req, res) => {
  return res.sendStatus(204);
});

router.get('/workout/:id', getRoutineWorkout, (req, res) => {
  return res.status(200).json(res.locals.rw);
});

router.post('/workout', insertRoutineWorkout, (req, res) => {
  return res.sendStatus(200);
});

router.put('/workout/:id', updateRoutineWorkout, (req, res) => {
  return res.sendStatus(200);
});
router.delete('/workout', deleteRoutineWorkout, (req, res) => {
  return res.sendStatus(204);
});

module.exports = router;
