require('dotenv').config({ path: '../.env' })
const { Pool } = require("pg");

const databaseConfig = { connectionString: process.env.DATABASE_URL };

//creating a new pool
const pool = new Pool(databaseConfig);

// pool.query("SELECT NOW()", (err, res) => {
//   console.log(`error: ${err}`);
//   console.log(`response: ${JSON.parse(JSON.stringify(res))}`);
//   console.log("Starting...");
//   console.log(err, res);
//   pool.end();
// });

module.exports = {
  query: (text, params, callback) => {
    console.log("executed query", text);
    return pool.query(text, params, callback);
  },
};
