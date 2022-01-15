const express = require('express');
const router = express.Router();

const commentsController = require('../controller/commentsController');

const { getComments, addComment } = commentsController;

router.get('/', getComments, (req, res) => {
  console.log('exiting /comments GET COMMENTS');
  return staus(200).json({ comments: res.locals.comments });
});

module.exports = router;
