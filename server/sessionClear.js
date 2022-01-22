const cron = require('node-cron');
const db = require('./model/dbModel');

const deleteSession = async () => {
  let expDate = new Date();
  expDate.setDate(expDate.getDate() - 1);
  expDate = [expDate.toISOString()];

  console.log('EXP-DATE FROM SESSION CLEAR: ', expDate);

  const deleteSessionQuery =
    '\
    DELETE FROM sessions \
    WHERE date_created < $1';

  try {
    const deleteSession = await db.query(deleteSessionQuery, expDate);
    if (deleteSession) {
      console.log('session deleted');
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
