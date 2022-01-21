const { values } = require('regenerator-runtime');
const db = require('../model/dbModel');

const commentsController = {};

// gets all comments for a specifc forum
// returns join table that brings user name on owner_user_id
commentsController.getComments = async (req, res, next) => {
  console.log('reached getComments');

  const getCommentsQuery =
    '\
    SELECT c.*, u.user_name\
    FROM comments c\
    LEFT JOIN users u\
    ON u.id=c.owner_user_id\
    WHERE c.forum_id=$1\
    ORDER BY date_created DESC;\
    ';

  const values = [req.params.forum_id || res.locals.forum_id];

  try {
    const getAllComments = await db.query(getCommentsQuery, values);
    console.log(getAllComments);
    if (getAllComments) {
      res.locals.comments = getAllComments.rows;
      // console.log('from getAllComments: ', getAllComments.rows);
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

  const addCommentQuery =
    '\
    INSERT INTO comments (owner_user_id, forum_id, description)\
    VALUES ($1, $2, $3)\
    ';
  const values = [
    req.body.owner_user_id,
    req.body.forum_id,
    req.body.description,
  ];

  try {
    const addComment = await db.query(addCommentQuery, values);
    if (addComment) {
      console.log('from addComment: ', addComment.rows);
      res.locals.forum_id = req.body.forum_id;
      return next();
    }
  } catch (err) {
    return next({
      log: `Error with commentsController.addComment ${err}`,
      message: { err: `error from addComment ${err}` },
    });
  }
};

commentsController.deleteComment = async (req, res, next) => {
  console.log('reached deleteComment');

  const deleteCommentQuery =
    '\
    DELETE FROM comments\
    WHERE forum_id=$1 AND id=$2\
    ';
  const values = [req.body.forum_id, req.body.id];
  console.log('----0000---0011-1-----', req.body);
  try {
    const deleteComment = await db.query(deleteCommentQuery, values);
    if (deleteComment) {
      // console.log('from deleteComment: ', deleteComment.rows);
      res.locals.forum_id = req.body.forum_id;
      return next();
    }
  } catch (err) {
    return next({
      log: `Error with commentsController.deleteComment ${err}`,
      message: { err: `error from deleteComment ${err}` },
    });
  }
};

commentsController.editComment = async (req, res, next) => {
  console.log('reached editComment');

  const editCommentQuery =
    '\
    UPDATE comments\
    SET description=$1 WHERE id=$2\
    ';
  const values = [req.body.description, req.body.id];

  try {
    const editComment = await db.query(editCommentQuery, values);
    if (editComment) {
      console.log('from editComment: ', editComment.rows);
      res.locals.forum_id = req.body.forum_id;
      return next();
    }
  } catch (err) {
    return next({
      log: `Error with commentsController.editComment ${err}`,
      message: { err: `error from editComment ${err}` },
    });
  }
};

module.exports = commentsController;
