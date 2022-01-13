const express = require('express');
const forumController = require('./../controller/forumsController.js');

const router = express.Router();

router.get('/', (req, res) => {
  return res.sendStatus(200);
});

module.exports = router;
