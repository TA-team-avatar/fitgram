const db = require('../model/dbModel');

const forumsController = {};

// gets all Forums from all users to render on dashboard component
forumsController.getForumsAllUsers = async (req, res, next) => {
  console.log('reached getForumsAllUsers');

  const getForumsAllUsersQuery =
    'SELECT * FROM forums ORDER BY forums.date_created';
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
  const userId = req.params.owner_user_id;
  const getForumsSingleUserQuery =
    'SELECT * FROM forums WHERE owner_user_id=$1';
  const getForumsSingleUserParam = [userId];

  try {
    const getForums = await db.query(
      getForumsSingleUserQuery,
      getForumsSingleUserParam
    );
    if (getForums) {
      console.log(`from getForumsSingleUserQuery: `, getForums.rows);
      res.locals.userForums = getForums.rows;
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
  const getSpecificForumQuery = 'SELECT * FROM forums WHERE id=$1';
  const values = [req.params.id];

  console.log('reached getSpecificForum');

  try {
    const getSpecificForum = await db.query(getSpecificForumQuery, values);
    if (getSpecificForum) {
      console.log(`from getSpecificForum: `, getSpecificForum.rows);
      res.locals.forum = getSpecificForum.rows[0];
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
  const forumId = req.params.id;

  const deleteForumQuery = 'DELETE FROM forums WHERE id=$1';
  const deleteForumParam = [forumId];

  console.log('reached deleteSpecificForum');

  try {
    const deleteForum = await db.query(deleteForumQuery, deleteForumParam);

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
  const createNewForumQuery =
    '\
    INSERT INTO forums (owner_user_id, name)\
    VALUES ($1, $2)';
  const values = [req.body.owner_user_id, req.body.name];

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
  const forumId = req.params.id;

  const schema = ['routine_id', 'name'];

  let setValue = schema.reduce((str, field) => {
    if (field in req.body) {
      if (field === 'routine_id' && req.body[field] === 'NULL') {
        str += field + ' = ' + req.body[field] + ', ';
      } else {
        str += field + ' = ' + "'" + req.body[field] + "', ";
      }

      return str;
    } else {
      return str;
    }
  }, '');

  setValue = setValue.replace(/(,\s$)/g, '');
  console.log('here', setValue);
  try {
    const query =
      '\
      UPDATE forums\
      SET $1\
      WHERE id=$2\
      RETURNING id, owner_user_id, routine_id, name, likes, dislikes, date_created\
      ';
    const params = [setValue, forumId];

    const forum = await db.query(query, params);

    if (forum.rows.length === 0) {
      throw new Error(`No forum with id of ${forumId} found!`);
    }

    res.locals.forum = forum.rows[0];

    return next();
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
