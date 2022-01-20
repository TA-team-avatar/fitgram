const express = require('express');
const {
  updateRoutine,
  deleteRoutineWorkout,
  getRoutines,
  insertRoutine,
  deleteRoutine,
} = require('./../controller/routinesController.js');
const routineController = require('./../controller/routinesController.js');

const router = express.Router();

router.get('/', getRoutines, (req, res) => {
  return res.status(200).json({ routines: res.locals.routines });
});

router.post('/', insertRoutine, (req, res) => {
  return res.sendStatus(200);
});

router.put('/', updateRoutine, (req, res) => {
  return res.sendStatus(200);
});

router.delete('/workout', deleteRoutineWorkout, (req, res) => {
  return res.sendStatus(204);
});

router.delete('/', deleteRoutine, (req, res) => {
  return res.sendStatus(204);
});

module.exports = router;
