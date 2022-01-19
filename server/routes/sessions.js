const express = require('express');
const sessionsController = require('../controller/sessionsController');

const router = express.Router();

const { checkSession, addSession } = sessionsController;

router.post('/token', checkSession, (req, res) => {
  console.log('exiting /sessions CHECKING SESSION');
  console.log(res.locals);
  return res
    .status(200)
    .json({ user_id: res.locals.user_id, token: res.locals.token });
});

router.post('/', addSession, (req, res) => {
  console.log('exiting /sessions ADD NEW SESSION');
  return res.sendStatus(200);
});

module.exports = router;
