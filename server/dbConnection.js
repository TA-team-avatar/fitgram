const { Pool } = require("pg");
const dbURL = process.env.DB_URL;

//creating a new pool
const pool = new Pool({
  connectionString: dbURL,
});

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

pool.query("SELECT NOW()", (err, res) => {
  console.log(`error: ${err}`);
  console.log(`response: ${JSON.parse(JSON.stringify(res))}`);
  console.log("Starting...");
  console.log(err, res);
  pool.end();
});

module.exports = {
  query: (text, params, callback) => {
    console.log("executed query", text);
    return pool.query(text, params, callback);
  },
};
