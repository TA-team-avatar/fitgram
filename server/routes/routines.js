const express = require('express');
const routineController = require('./../controller/routinesController.js');

const router = express.Router();

const { getRoutines, deleteRoutine } = routineController;

router.get('/', getRoutines, (req, res) => {
  return res.sendStatus(200);
});

router.delete('/', deleteRoutine, (req, res) => {
  return res.sendStatus(200);
});

module.exports = router;
