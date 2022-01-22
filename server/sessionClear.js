const cron = require('node-cron');
const db = require('./model/dbModel');

const deleteSession = async () => {
  const deleteSessionQuery =
    '\
  DELETE s.token FROM sessions s\
  WHERE token=$1';

  const token = sessionStorage.getItem('token');
  const values = [token];

  console.log('TOKEN: ', token);

  try {
    const deleteSession = await db.query(deleteSessionQuery, values);
    if (deleteSession) {
      console.log('session deleted');
      sessionStorage.clear();
    }
  } catch (err) {
    console.log('error in deleteSession from sessionClear.js: ', err);
  }
};

module.exports = () => {
  console.log('running cron schedule every 20 seconds to delete old sessions');
  cron.schedule('* * * * *', () => {
    console.log('HELLOOOOO');
    deleteSession();
  });
};
