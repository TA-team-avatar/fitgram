const db = require('../model/dbModel');

// controllers for getting routines and individual workouts
// get all

const routinesController = {};

routinesController.getRoutines = async (req, res, next) => {
  const { id } = req.query;

  const queryRoutine =
    'SELECT r.*, rw.* FROM routines r \
  LEFT JOIN routine_workout rw ON rw.routine_id = r.id \
  LEFT JOIN workouts w ON w.id = rw.workout_id \
  WHERE r.owner_user_id = $1';

  const paramRoutine = [id];
  try {
    const routines = await db.query(queryRoutine, paramRoutine);
    res.locals.routines = routines.rows;

    return next();
  } catch (err) {
    return next({
      log: `Error with routinesController.getRoutines ${err}`,
      message: { err: `error from routinesController ${err}` },
    });
  }
};

routinesController.insertRoutine = async (req, res, next) => {
  const { user_id, name, duration, routine_workout } = req.body;

  const queryRoutine =
    'INSERT INTO routines (owner_user_id, name, duration)\
  VALUES ($1, $2, $3)\
  RETURNING id';
  const paramRoutine = [user_id, name, duration];

  const queryRoutineWorkout =
    'INSERT INTO routine_workout (routine_id, workout_id, set, repetition_motion, day)\
  VALUES ($1, $2, $3, $4, $5)\
  RETURNING *';

  try {
    const insertRoutine = await db.query(queryRoutine, paramRoutine);
    console.log('routine -->', insertRoutine.rows);

    await Promise.all(
      routine_workout.map(async (rw) => {
        const params = [];
        params[0] = insertRoutine.rows[0].id;
        params[1] = rw.workout_id;
        params[2] = rw.set;
        params[3] = rw.repetition_motion;
        params[4] = rw.day;

        const insertRoutineWorkout = await db.query(
          queryRoutineWorkout,
          params
        );
        console.log(insertRoutineWorkout.rows);
        return;
      })
    );

    return next();
  } catch (err) {
    return next({
      log: `Error with routinesController.insertRoutine ${err}`,
      message: { err: `error from routinesController ${err}` },
    });
  }
};

routinesController.deleteRoutine = async (req, res, next) => {
  const { id } = req.body;
  const queryRoutine = 'DELETE FROM routines WHERE id = $1';
  const paramRoutine = [id];

  const queryRoutineWorkout =
    'DELETE FROM routine_workout WHERE routine_id = $1';
  const paramRoutineWorkout = [id];
  try {
    await db.query(queryRoutine, paramRoutine);
    await db.query(queryRoutineWorkout, paramRoutineWorkout);

    return next();
  } catch (err) {
    return next({
      log: `Error with routinesController.deleteRoutine ${err}`,
      message: { err: `error from routinesController ${err}` },
    });
  }
};

module.exports = routinesController;
