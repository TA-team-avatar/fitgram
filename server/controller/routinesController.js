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

routinesController.createRoutine = async (req, res, next) => {
  const { userId, name, duration } = req.body;

  const queryRoutine =
    'INSERT INTO routines (owner_user_id, name, duration)\
    VALUES ($1, $2, $3)\
    RETURNING id';
  const paramRoutine = [userId, name, duration];

  try {
    await db.query(queryRoutine, paramRoutine);

    return next();
  } catch (err) {
    return next({
      log: `Error with routinesController.insertRoutine ${err}`,
      message: { err: `error from routinesController ${err}` },
    });
  }
};

routinesController.updateRoutine = async (req, res, next) => {
  const { routineId } = req.params;
  // name, duration
  const schema = ['name', 'duration'];

  let setQuery = schema.reduce((str, field) => {
    if (field in req.body) {
      str += field + ' = ' + "'" + req.body[field] + "', ";

      return str;
    } else {
      return str;
    }
  }, '');

  setQuery = setQuery.replace(/(,\s$)/g, '');

  setQuery = 'UPDATE routines SET ' + setQuery + ' WHERE id = ' + routineId + ';';

  try {
    await db.query(setQuery);

    return next();
  } catch (err) {
    return next({
      log: `Error with routinesController.updateRoutine ${err}`,
      message: { err: `Error with routinesController.updateRoutine ${err}` },
    });
  }
};

routinesController.deleteRoutine = async (req, res, next) => {
  const { routineId } = req.body;
  const queryRoutine = 'DELETE FROM routines WHERE id = $1';
  const paramRoutine = [routineId];

  const queryRoutineWorkout =
    'DELETE FROM routine_workout WHERE routine_id = $1';
  const paramRoutineWorkout = [routineId];
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

routinesController.getRoutineWorkout = async (req, res, next) => {
  const { id } = req.params;

  const query = 'SELECT * FROM routine_workout WHERE routine_id = $1';
  const params = [id];

  try {
    const data = await db.query(query, params);
    console.log(data);
    res.locals.rw = data.rows;

    return next();
  } catch (err) {
    return next({
      log: `Error with routinesController.getRoutineWorkout ${err}`,
      message: { err: `error from routinesController ${err}` },
    });
  }
};

routinesController.insertRoutineWorkout = async (req, res, next) => {
  const { routine_id, workout_id, set, repetition_motion, day, weight } =
    req.body;

  const queryRoutineWorkout =
    'INSERT INTO routine_workout (routine_id, workout_id, set, repetition_motion, day, weight)\
      VALUES ($1, $2, $3, $4, $5, $6)\
      RETURNING *';
  const paramRoutineWorkout = [
    routine_id,
    workout_id,
    set,
    repetition_motion,
    day,
    weight,
  ];

  try {
    await db.query(queryRoutineWorkout, paramRoutineWorkout);

    return next();
  } catch (err) {
    return next({
      log: `Error with routinesController.insertRoutineWorkout ${err}`,
      message: { err: `error from routinesController ${err}` },
    });
  }
};
routinesController.updateRoutineWorkout = async (req, res, next) => {
  const { id } = req.params;
  const schema = [
    'routine_id',
    'workout_id',
    'set',
    'repetition_motion',
    'day',
    'weight',
  ];

  let setQuery = schema.reduce((str, field) => {
    if (field in req.body) {
      if (field === 'workout_id' && req.body[field] === 'NULL') {
        str += field + ' = ' + req.body[field] + ', ';
      } else {
        str += field + ' = ' + "'" + req.body[field] + "', ";
      }

      return str;
    } else {
      return str;
    }
  }, '');

  setQuery = setQuery.replace(/(,\s$)/g, '');
  setQuery =
    'UPDATE routine_workout SET ' + setQuery + ' WHERE id = ' + id + ';';

  try {
    await db.query(setQuery);

    return next();
  } catch (err) {
    return next({
      log: `Error with routinesController.updateRoutineWorkout ${err}`,
      message: { err: `Error with routinesController ${err}` },
    });
  }
};
routinesController.deleteRoutineWorkout = async (req, res, next) => {
  const { id } = req.body;

  const query = 'DELETE FROM routine_workout WHERE id = $1';
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
