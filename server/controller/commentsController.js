const db = require('../model/dbModel');

const commentsController = {};

commentsController.getComments = (req, res, next) => {
  console.log('reached getComments');
  const getCommentsQuery = `
  SELECT * FROM comments
  ORDER BY date_created
  `;

  try {
      return next();
  }
  catch (err) {
      return next({'error log'});
  }

  return next();
};

commentsController.addComment = (req, res, next) => {
  return next();
};

module.exports = commentsController;
