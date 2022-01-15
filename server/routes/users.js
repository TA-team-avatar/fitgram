const express = require('express');
const {
  addUser,
  checkUser,
  getUserInfo,
  updateUser,
  updatePassword,
} = require('./../controller/userController');

const router = express.Router();

router.get('/:id', getUserInfo, (req, res) => {
  return res.status(200).json(res.locals.userInfo);
});

router.post('/login', checkUser, (req, res) => {
  return res.sendStatus(200);
  // .json({ token: res.locals.token, userID: res.locals.id });
});

router.post('/signup', addUser, (req, res) => {
  return res.sendStatus(200);
  // .json({ token: res.locals.token, userID: res.locals.id });
});
router.put('/', updateUser, (req, res) => {
  return res.sendStatus(200);
});

router.patch('/password', updatePassword, (req, res) => {
  return res.sendStatus(200);
});

module.exports = router;
