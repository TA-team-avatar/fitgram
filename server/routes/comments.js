const express = require('express');
const router = express.Router();

const commentsController = require('../controller/commentsController');

const { getComments, addComment, deleteComment, editComment } =
  commentsController;

router.get('/:forum_id', getComments, (req, res) => {
  console.log('exiting /comments GET COMMENTS');
  return res.status(200).json({ comments: res.locals.comments });
});

router.post('/', addComment, getComments, (req, res) => {
  console.log('exiting /comments ADD COMMENT');
  return res.status(200).json({ comments: res.locals.comments });
});

router.delete('/', deleteComment, getComments, (req, res) => {
  console.log('exiting /comments DELETE COMMENT');
  return res.status(200).json({ comments: res.locals.comments });
});

router.put('/', editComment, getComments, (req, res) => {
  console.log('exiting /comments EDIT COMMENT');
  return res.status(200).json({ comments: res.locals.comments });
});

module.exports = router;
