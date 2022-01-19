const express = require('express');
const router = express.Router();

const commentsController = require('../controller/commentsController');

const { getComments, addComment, deleteComment, editComment } =
  commentsController;

router.get('/:forum_id', getComments, (req, res) => {
  console.log('exiting /comments GET COMMENTS');
  return res.status(200).json({ comments: res.locals.comments });
});

router.post('/', addComment, (req, res) => {
  console.log('exiting /comments ADD COMMENT');
  return res.sendStatus(200);
});

router.delete('/', deleteComment, (req, res) => {
  console.log('exiting /comments DELETE COMMENT');
  return res.sendStatus(200);
});

router.put('/', editComment, (req, res) => {
  console.log('exiting /comments EDIT COMMENT');
  return res.sendStatus(200);
});

module.exports = router;
