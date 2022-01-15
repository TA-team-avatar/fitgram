const db = require('../model/dbModel');

const forumsController = {};

// gets all Forums from all users to render on dashboard component
forumsController.getForumsAllUsers = async (req, res, next) => {
  console.log('reached getForumsAllUsers');

  const getForumsAllUsersQuery = `SELECT * FROM forums ORDER BY forums.date_created`;
  // console.log('values: ', values);
  try {
    const getAllForums = await db.query(getForumsAllUsersQuery);
    if (getAllForums) {
      console.log(`from getForumsAllUsers: `, getAllForums.rows);
      res.locals.allForums = getAllForums.rows;
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
// this was built with the assumption that routines & workouts will be in separate request
forumsController.getForumsSingleUser = async (req, res, next) => {
  const getForumsSingleUserQuery = `SELECT * FROM forums WHERE owner_user_id=$1`;
  const values = [req.params.owner_user_id];
  try {
    const getForums = await db.query(getForumsSingleUserQuery, values);
    if (getForums) {
      console.log(`from getForumsSingleUserQuery: `, getForums.rows);
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
  const getSpecificForumQuery = `SELECT * FROM forums WHERE id=$1`;
  const values = [req.params.id];

  console.log('reached getSpecificForum');

  try {
    const getSpecificForum = await db.query(getSpecificForumQuery, values);
    if (getSpecificForum) {
      console.log(`from getSpecificForum: `, getSpecificForum.rows);
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
  const deleteForumQuery = `DELETE FROM forums WHERE owner_user_id=$1 AND id=$2`;
  const values = [req.body.owner_user_id, req.body.id];

  console.log('reached deleteSpecificForum');

  try {
    const deleteForum = await db.query(deleteForumQuery, values);

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
  INSERT INTO forums (owner_user_id, routine_id, name)
  VALUES ($1, $2, $3)
  `;
  const values = [req.body.owner_user_id, req.body.routine_id, req.body.name];

  console.log('reached createNewForum');

  try {
    const createNewForum = await db.query(createNewForumQuery, values);
    if (createNewForum) {
      console.log(`from createNewForum: `, createNewForum.rows);
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

// middleware to update a forum - only changes name for now
forumsController.updateForum = async (req, res, next) => {
  const updateForumNameQuery = `
  UPDATE forums
  SET name=$1 WHERE id=$2
  `;
  const valuesName = [req.body.name, req.body.id];

  const updateForumRoutineQuery = `
    UPDATE forums SET routine_id=$1 WHERE id=$2
  `;
  const valuesRoutine = [req.body.routine_id, req.body.id];

  console.log('reached updateForum');

  try {
    const updateForumName = await db.query(updateForumNameQuery, valuesName);
    const updateForumRoutine = await db.query(
      updateForumRoutineQuery,
      valuesRoutine
    );

    if (updateForumName && updateForumRoutine) {
      console.log('updated forum name: ', updateForumName.rows);
      console.log('updated forum routine: ', updateForumRoutine.rows);
      return next();
    }
  } catch (err) {
    return next({
      log: `Error with forumsController.updateForum Error: ${err}`,
      message: {
        err: `error received from updateForum: ${err}`,
      },
    });
  }
};

module.exports = forumsController;
