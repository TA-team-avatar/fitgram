const cron = require('node-cron');
const db = require('./model/dbModel');

deleteSession = async () => {
  const deleteSessionQuery = '\
  DELETE token FROM sessions\
  WHERE token=$1';

  const token = sessionStorage.getItem('token');
  const values = [token];

  try {
    const deleteSession = db.query(deleteSessionQuery, values);
    if (deleteSession) {
      console.log('session deleted');
    }
  } catch (err) {
    console.log('error in deleteSession from sessionClear.js: ', err);
  }
};

module.exports = () => {
  console.log('running cron schedule every 20 seconds to delete old sessions');
  cron.schedule('20 * * * * *', () => {
    deleteSession();
  });
};
