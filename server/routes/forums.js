const express = require('express');
const forumController = require('./../controller/forumsController.js');

const router = express.Router();

const {
  getForumsAllUsers,
  getForumsSingleUser,
  getSpecificForum,
  deleteSpecificForum,
  createNewForum,
} = forumController;

router.get('/', (req, res) => {
  return res.sendStatus(200);
});

module.exports = router;
