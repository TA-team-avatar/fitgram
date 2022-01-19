const express = require('express');
const router = express.Router();

const commentsController = require('../controller/commentsController');

const { getComments, addComment } = commentsController;

router.get('/', getComments, (req, res) => {
  console.log('exiting /comments GET COMMENTS');
  return res.status(200).json({ comments: res.locals.comments });
});

router.post('/', addComment, (req, res) => {
  console.log('exiting /comments ADD COMMENT');
  return res.sendStatus(200);
});

module.exports = router;
