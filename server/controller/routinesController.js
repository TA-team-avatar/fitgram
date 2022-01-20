const db = require("../model/dbModel");

// controllers for getting routines and individual workouts
// get all

const routinesController = {};

routinesController.getAllRoutines = async (req, res, next) => {
  const { id } = req.query;

  const queryRoutine =
    "SELECT r.*, rw.* FROM routines r \
    LEFT JOIN routine_workout rw ON rw.routine_id = r.id \
    LEFT JOIN workouts w ON w.id = rw.workout_id \
    WHERE r.owner_user_id = $1";

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

//build getUserRoutines controller****

routinesController.insertRoutine = async (req, res, next) => {
  const { owner_user_id, name, duration, routine_workout } = req.body;

  const queryRoutine =
    "INSERT INTO routines (owner_user_id, name, duration)\
    VALUES ($1, $2, $3)\
    RETURNING id";
  const paramRoutine = [owner_user_id, name, duration];

  const queryRoutineWorkout =
    "INSERT INTO routine_workout (routine_id, workout_id, set, repetition_motion, day)\
    VALUES ($1, $2, $3, $4, $5)\
    RETURNING *";

  try {
    await db.query(queryRoutine, paramRoutine);

    await Promise.all(
      routine_workout.map(async (rw) => {
        const params = [];
        params[0] = insertRoutine.rows[0].id;
        params[1] = rw.workout_id;
        params[2] = rw.set;
        params[3] = rw.repetition_motion;
        params[4] = rw.day;

        await db.query(queryRoutineWorkout, params);
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

routinesController.updateRoutine = async (req, res, next) => {
  const { id, name, duration, routine_workout } = req.body;

  const queryUpdateRoutine =
    "UPDATE routines SET name = $1, duration = $2 WHERE id = $3";
  const paramsUpdateRoutine = [name, duration, id];

  const queryUpdateRoutineWorkoutID =
    "INSERT INTO routine_workout (id, routine_id, workout_id, set, repetition_motion, day, weight)\
    VALUES($1, $2, $3, $4, $5, $6, $7)\
    ON CONFLICT (id)\
    DO\
    UPDATE SET routine_id=EXCLUDED.routine_id, workout_id=EXCLUDED.workout_id, set=EXCLUDED.set, repetition_motion=EXCLUDED.repetition_motion, day=EXCLUDED.day, weight=EXCLUDED.weight;";

  const queryUpdateRoutineWorkout =
    "INSERT INTO routine_workout (routine_id, workout_id, set, repetition_motion, day, weight)\
    VALUES($1, $2, $3, $4, $5, $6)\
    ON CONFLICT (id)\
    DO\
    UPDATE SET routine_id=EXCLUDED.routine_id, workout_id=EXCLUDED.workout_id, set=EXCLUDED.set, repetition_motion=EXCLUDED.repetition_motion, day=EXCLUDED.day, weight=EXCLUDED.weight;";

  try {
    await db.query(queryUpdateRoutine, paramsUpdateRoutine);

    await Promise.all(
      routine_workout.map(async (rw) => {
        const params = [];
        let query = queryUpdateRoutineWorkout;
        if (rw.id) {
          params.push(rw.id);
          query = queryUpdateRoutineWorkoutID;
        }
        params.push(id);
        params.push(rw.workout_id);
        params.push(rw.set);
        params.push(rw.repetition_motion);
        params.push(rw.day);
        params.push(rw.weight);

        await db.query(query, params);
        return;
      })
    );

    return next();
  } catch (err) {
    return next({
      log: `Error with routinesController.updateRoutine ${err}`,
      message: { err: `Error with routinesController.updateRoutine ${err}` },
    });
  }
};

routinesController.deleteRoutine = async (req, res, next) => {
  const { id } = req.body;
  const queryRoutine = "DELETE FROM routines WHERE id = $1";
  const paramRoutine = [id];

  const queryRoutineWorkout =
    "DELETE FROM routine_workout WHERE routine_id = $1";
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

routinesController.deleteRoutineWorkout = async (req, res, next) => {
  const { id } = req.body;

  const query = "DELETE FROM routine_workout WHERE id = $1";
  const param = [id];
  try {
    await db.query(query, param);

    return next();
  } catch (err) {
    return next({
      log: `Error with routinesController.deleteRoutineWorkout ${err}`,
      message: { err: `error from routinesController ${err}` },
    });
  }
};

module.exports = routinesController;
