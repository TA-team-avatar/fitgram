const db = require('../model/dbModel');

const forumsController = {};

// gets all Forums from all users to render on dashboard component
forumsController.getForumsAllUsers = async (req, res, next) => {
  const getForumsAllUsersQuery = `SELECT * FROM forums ORDER BY forums.date_created`;
  const values = req.query;
  try {
    const getAllForums = await db.query(getForumsAllUsersQuery, values);
    if (getAllForums) {
      console.log(`from getForumsAllUsers: `, getAllForums);
      return next();
    }
  } catch (err) {
    return next({
      log: `Error with forumsController.getForumsAllUsers Error: ${err}`,
      message: { err: `error received from getAllForums query: ${err}` },
    });
  }
};

// gets all forums fora specific authorized user
forumsController.getForumsSingleUser = async (req, res, next) => {
  const getForumsSingleUserQuery = `SELECT * FROM forums WHERE users.id=$1`;
  try {
    const getForums = await db.query(getForumsSingleUserQuery);
    if (getForum) {
      console.log(`from getForumsSingleUserQuery: `, getForums);
      return next();
    }
  } catch (err) {
    return next({
      log: `Error with forumsController.getForumsSingleUser Error: ${err}`,
      message: { err: `error received from getForumsSingleUserQuery: ${err}` },
    });
  }
};

// gets one specific forum for one specific user
forumsController.getSpecificForum = async (req, res, next) => {
  const getSpecificForumQuery = `SELECT * FROM forums WHERE users.id=$1 AND forums.id=$2`;
  const values = [req.query.userid, req.query.forumsid];
  try {
    const getSpecificForum = await db.query(getSpecificForumQuery, values);
    if (getSpecificForum) {
      console.log(`from getSpecificForum: `, getSpecificForum);
      return next();
    }
  } catch (err) {
    return next({
      log: `Error with forumsController.getSpecificForum Error: ${err}`,
      message: { err: `error received from getSpecificForumQuery: ${err}` },
    });
  }
};

// deletes one specific forum for authorized user
forumsController.deleteSpecificForum = async (req, res, next) => {
  const deleteForumQuery = `DELETE FROM forums WHERE users.id=$1 AND forums.id=$2`;
  const values = [req.body.userid, req.body.forumsid];
  try {
    const deleteForum = db.query(deleteForumQuery, [values]);

    if (deleteForum) {
      console.log(`from deleteSpecificForum: `, deleteForum);
      return next();
    }
  } catch (err) {
    return next({
      log: `Error with forumsController.deleteSpecificForum Error: ${err}`,
      message: { err: `error received from deleteSpecificForum: ${err}` },
    });
  }
};

// creates new forum for authorized user
forumsController.createNewForum = async (req, res, next) => {
  const createNewForumQuery = `
  INSERT INTO forums (owner_user_id, routine_id, name, date_created)
  VALUES ($1, $2, $3, $4)
  `;
  const values = [
    req.body.userid,
    req.body.routineid,
    req.body.routineName,
    req.body.date_created,
  ];
  try {
    const createNewForum = await db.query(createNewForumQuery, [values]);
    if (createNewForum) {
      console.log(`from createNewForum: `, createNewForum);
      return next();
    }
  } catch (err) {
    return next({
      log: `Error with forumsController.createNewForum Error: ${err}`,
      message: {
        err: `error received from createNewForum: ${err}`,
      },
    });
  }
};

module.exports = forumsController;
