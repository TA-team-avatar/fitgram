const express = require('express');
const forumController = require('./../controller/forumsController.js');

const router = express.Router();

const {
  getForumsAllUsers,
  getForumsSingleUser,
  getSpecificForum,
  deleteSpecificForum,
  createNewForum,
  updateForum,
} = forumController;

router.get('/:id', getSpecificForum, (req, res) => {
  console.log('exiting /forum GET SPECIFIC FORUM');
  return res.sendStatus(200);
});

router.get('/user/:owner_user_id', getForumsSingleUser, (req, res) => {
  console.log('exiting /forum GET ALL FORUMS FOR THIS USER');
  return res.sendStatus(200);
});

router.put('/user/forum_update', updateForum, (req, res) => {
  console.log('exiting /forum GET SPECIFIC FORUM');
  return res.sendStatus(200);
});

router.get('/', getForumsAllUsers, (req, res) => {
  console.log('exiting /forum GET ALL FORUMS FROM ALL USERS');
  return res.sendStatus(200);
});

router.post('/', createNewForum, (req, res) => {
  console.log('exiting /forum CREATE FORUM');
  return res.sendStatus(200);
});

router.delete('/', deleteSpecificForum, (req, res) => {
  console.log('exiting /forum DELETE FORUM');
  return res.sendStatus(200);
});

module.exports = router;
