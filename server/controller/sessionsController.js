const db = require('../model/dbModel');

const sessionsController = {};

// when FE checks if user exists
// query to ensur token and user_id match session_id, based on session_id that was sent back

// checks & confirms pre-exisitng token for pre-existing user
sessionsController.checkSession = async (req, res, next) => {
  console.log('reached checkSession middleware');

  const checkSessionsQuery = `
    SELECT user_id, token FROM sessions WHERE sessions.id=$1
    `;
  const values = [req.body.id];

  try {
    const checkUserSession = await db.query(checkSessionsQuery, values);
    if (checkUserSession) {
      console.log('from checkUserSession: ', checkUserSession.rows);
      res.locals.user_id = checkUserSession.rows.user_id;
      res.locals.token = checkUserSession.rows.token;
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

// adding token to the DB for new user
// assume I can access users.id on res.locals
sessionsController.addSession = (req, res, next) => {
  return next();
};

// delete session??? should sessions automatically time out?

module.exports = sessionsController;
