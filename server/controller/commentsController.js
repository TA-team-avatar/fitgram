const db = require('../model/dbModel');

const commentsController = {};

// gets all comments for a specifc forum
// returns join table that brings user name on owner_user_id
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

// commentsController.addComment = (req, res, next) => {
//   return next();
// };

module.exports = commentsController;
