const express = require('express');
const routineController = require('./../controller/routinesController.js');

const router = express.Router();

const { getRoutines, insertRoutine, deleteRoutine } = routineController;

router.get('/', getRoutines, (req, res) => {
  return res.status(200).json({ routines: res.locals.routines });
});

router.post('/', insertRoutine, (req, res) => {
  return res.sendStatus(200);
});

router.delete('/', deleteRoutine, (req, res) => {
  return res.sendStatus(204);
});

module.exports = router;
