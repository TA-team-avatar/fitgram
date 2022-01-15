const express = require('express');
const router = express.Router();

const commentsController = require('../controller/commentsController');

const { getComments, addComment } = commentsController;

router.get('/', getComments, (req, res) => {
  console.log('exiting /comments GET COMMENTS');
  return sendStatus(200);
});

module.exports = router;
