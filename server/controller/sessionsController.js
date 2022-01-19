const db = require('../model/dbModel');
const crypto = require('crypto');

const sessionsController = {};

// checks & confirms pre-exisitng user_id & token based on session_id from front end
sessionsController.checkSession = async (req, res, next) => {
  console.log('reached checkSession middleware');

  const checkSessionsQuery = `
    SELECT user_id, token FROM sessions WHERE token=$1
    `;
  const values = [req.body.token];

  try {
    const checkUserSession = await db.query(checkSessionsQuery, values);
    if (checkUserSession) {
      console.log('from checkUserSession: ', checkUserSession.rows);
      res.locals.user_id = checkUserSession.rows[0].user_id;
      res.locals.token = checkUserSession.rows[0].token;
      return next();
    }
  } catch (err) {
    return next({
      log: `Error with sessionsController.checkSession Error: ${err}`,
      message: {
        err: `error received from checkUserSession query: ${err}`,
      },
    });
  }
};

// adding token to the DB for new user, assumeing we can access user_id on res.locals
sessionsController.addSession = async (req, res, next) => {
  console.log('reached addSession middleware');

  // res.locals.match = true;
  // res.locals.id = 8;

  if (res.locals.match === false) {
    return next();
  } else if (res.locals.id) {
    const addSessionQuery = `
        INSERT INTO sessions (user_id, token)
        VALUES ($1, $2)
        `;
    const values = [res.locals.id];

    try {
      res.locals.token = await crypto.randomBytes(16).toString('hex');

      values.push(res.locals.token);

      const addNewUserSession = await db.query(addSessionQuery, values);
      // console.log('from addSession: ', addNewUserSession.rows);
      return next();

      //   if (addNewUserSession) {
      //     console.log('from addSession: ', addNewUserSession.rows);
      //     return next();
      //   }
    } catch (err) {
      return next({
        log: `Error with sessionsController.addSession Error: ${err}`,
        message: {
          err: `error received from addSession query: ${err}`,
        },
      });
    }
  }
};

// delete session??? should sessions automatically time out?

module.exports = sessionsController;
