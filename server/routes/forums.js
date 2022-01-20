const express = require("express");
const forumController = require("./../controller/forumsController.js");

const router = express.Router();

const {
  getForumsAllUsers,
  getForumsSingleUser,
  getSpecificForum,
  deleteSpecificForum,
  createNewForum,
  updateForum,
} = forumController;

router.get("/:id", getSpecificForum, (req, res) => {
  console.log("exiting /forum GET SPECIFIC FORUM");
  return res.status(200).json({ forum: res.locals.forum });
});

router.get("/user/:owner_user_id", getForumsSingleUser, (req, res) => {
  console.log("exiting /forum GET ALL FORUMS FOR THIS USER");
  return res.status(200).json({ forums: res.locals.userForums });
});

router.put("/:id", updateForum, (req, res) => {
  console.log("exiting /forum GET SPECIFIC FORUM");
  return res.status(200).json({ forum: res.locals.forum });
});

router.get("/", getForumsAllUsers, (req, res) => {
  console.log("exiting /forum GET ALL FORUMS FROM ALL USERS");
  return res.status(200).json({ forums: res.locals.allForums });
});

router.post("/", createNewForum, getForumsAllUsers, (req, res) => {
  console.log("exiting /forum CREATE FORUM");
  return res.status(200).json({ forums: res.locals.allForums });
});

router.delete("/:id", deleteSpecificForum, getForumsAllUsers, (req, res) => {
  console.log("exiting /forum DELETE FORUM");
  return res.status(200).json({ forums: res.locals.allForums });
});

module.exports = router;
