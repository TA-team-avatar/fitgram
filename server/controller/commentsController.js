const { values } = require('regenerator-runtime');
const db = require('../model/dbModel');

const commentsController = {};

// gets all comments for a specifc forum
// returns join table that brings user name on owner_user_id

// CHANGE TO PARAMS
commentsController.getComments = async (req, res, next) => {
  console.log('reached getComments');

  const getCommentsQuery = `
  SELECT * FROM comments
  LEFT JOIN users ON users.id=comments.owner_user_id
  WHERE comments.forum_id=$1;
  `;
  const values = [req.body.forum_id];

  try {
    const getAllComments = await db.query(getCommentsQuery, values);
    if (getAllComments) {
      res.locals.comments = getAllComments.rows;
      console.log('from getAllComments: ', getAllComments.rows);
      return next();
    }
  } catch (err) {
    return next({
      log: `Error with commentsController.getComments ${err}`,
      message: { err: `error from commentsController ${err}` },
    });
  }
};

commentsController.addComment = async (req, res, next) => {
  console.log('reached addComment');

  const addCommentQuery = `
    INSERT INTO comments (owner_user_id, forum_id, description)
    VALUES ($1, $2, $3)
    `;
  const values = [
    req.body.owner_user_id,
    req.body.forum_id,
    req.body.description,
  ];

  try {
    const addComment = await db.query(addCommentQuery, values);
    console.log('from addComment: ', addComment.rows);
    return next();
  } catch (err) {
    return next({
      log: `Error with commentsController.addComment ${err}`,
      message: { err: `error from addComment ${err}` },
    });
  }

  return next();
};

module.exports = commentsController;
