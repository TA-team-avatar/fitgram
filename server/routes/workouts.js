const express = require("express");
const router = express.Router();
const { getWorkout } = require("../controller/workoutController");

router.get("/", getWorkout, (req, res) => {
  return res.status(200).json({ workouts: res.locals.workouts });
});

module.exports = router;
