const db = require('../model/dbModel');
const { hashPassword, comparePassword } = require('./encryption');

const userController = {};

userController.getUserInfo = async (req, res, next) => {
  const { id } = req.params;
  const query =
    'SELECT user_name, first_name, last_name, email, height, weight\
  FROM users\
  WHERE id = $1';

  const params = [id];
  try {
    const userInfo = await db.query(query, params);
    res.locals.userInfo = userInfo.rows[0];
    return next();
  } catch (err) {
    return next({
      log: `Error with userController.getUserInfo ${err}`,
      message: { err: `Error with userController ${err}` },
    });
  }
};

userController.addUser = async (req, res, next) => {
  const { user_name, first_name, last_name, email, height, weight, password } =
    req.body;
//   console.log(req.body);

  const query =
    'INSERT INTO users (user_name, first_name, last_name, email, height, weight, password)\
  VALUES ($1, $2, $3, $4, $5, $6, $7)\
  RETURNING id;';
  const param = [user_name, first_name, last_name, email, height, weight];

  try {
    const hashPW = await hashPassword(password);
    param.push(hashPW);
    const userID = await db.query(query, param);
    res.locals.id = userID.rows[0].id;

    return next();
  } catch (err) {
    return next({
      log: `Error with userController.addUser ${err}`,
      message: { err: `Error with userController ${err}` },
    });
  }
};

userController.checkUser = async (req, res, next) => {
  const { user_name, password } = req.body;
  // console.log(req.body);

  const query =
    'SELECT id, user_name, password\
  FROM users\
  WHERE user_name = $1';
  const params = [user_name];

  try {
    const userInfo = await db.query(query, params);
    const pwMatch = await comparePassword(password, userInfo.rows[0].password);

    if (pwMatch) {
      res.locals.id = userInfo.rows[0].id;
      res.locals.match = pwMatch;
    } else {
      res.locals.match = pwMatch;
    }
    return next();
  } catch (err) {
    return next({
      log: `Error with userController.checkUser ${err}`,
      message: { err: `Error with userController ${err}` },
    });
  }
};

userController.updateUser = async (req, res, next) => {
  const { id, user_name, first_name, last_name, email, height, weight } =
    req.body;

  const query =
    'UPDATE users\
    SET user_name = $2, first_name = $3, last_name = $4, email = $5, height = $6, weight = $7\
    WHERE id = $1';
  const params = [id, user_name, first_name, last_name, email, height, weight];

  try {
    await db.query(query, params);

    return next();
  } catch (err) {
    return next({
      log: `Error with userController.updateUser ${err}`,
      message: { err: `Error with userController ${err}` },
    });
  }
};

userController.updatePassword = async (req, res, next) => {
  const { id, password, newPassword } = req.body;

  const queryPassword = 'SELECT id, password FROM users WHERE id = $1';
  const paramsPassword = [id];

  const queryChangePassword = 'UPDATE users SET password = $2 WHERE id = $1';
  const paramsChangePassword = [id];

  try {
    const hashedPW = await db.query(queryPassword, paramsPassword);
    const match = await comparePassword(password, hashedPW.rows[0].password);

    if (match) {
      paramsChangePassword.push(await hashPassword(newPassword));
      await db.query(queryChangePassword, paramsChangePassword);
      res.locals.changedPW = match;
      return next();
    } else {
      res.locals.changedPW = match;

      return next();
    }
  } catch (err) {
    return next({
      log: `Error with userController.updatePassword ${err}`,
      message: { err: `Error with userController ${err}` },
    });
  }
};

module.exports = userController;
