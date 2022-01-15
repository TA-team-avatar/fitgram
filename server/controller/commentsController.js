const db = require('../model/dbModel');

const commentsController = {};

commentsController.getComments = (req, res, next) => {
  console.log('reached getComments');

  return next();
};

commentsController.addComment = (req, res, next) => {
  return next();
};

module.exports = commentsController;
