const db = require('../model/dbModel');

const workoutController = {};

workoutController.getWorkout = async (req, res, next) => {
  const query = '\
    SELECT * FROM workouts\
    ';

  try {
    const workouts = await db.query(query);
    if (workouts) {
      res.locals.workouts = workouts.rows;
      return next();
    }
  } catch (err) {
    return next({
      log: `Error with workoutController.getComments ${err}`,
      message: { err: `error from workoutController ${err}` },
    });
  }
};

module.exports = workoutController;
