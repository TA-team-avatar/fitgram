require("dotenv").config({ path: "../.env" });
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

const queriesRouter = {
  query: (text, params, callback) => {
    console.log("executed query", text);
    return pool.query(text, params, callback);
  },

  //gets the workouts list from the DB as an array of workout objects
  getWorkoutsList: (req, res, next) => {
    pool
      .query("SELECT * FROM workout_card;")
      .then((workoutsListData) => {
        if (!workoutsListData) return next({ log: "no workouts found" });
        res.locals.workoutsList = workoutsListData.rows;
        return next();
      })
      .catch((err) =>
        next({
          log: "error retrieving workoutsList from database",
          message: { err: `error received from workoutsList query` },
        })
      );
  },

  //takes in athlete_id & workout_content from req.body and queries to add
  //entry to workout_card table in the database
  postWorkout: (req, res, next) => {
    const { athlete_id, workout_content } = req.body;
    pool
      .query(
        `INSERT INTO workout_card (workout_content, date, athlete_id) VALUES (${workout_content}, now(), ${athlete_id});`
      )
      .then((data) => {
        console.log(
          "this is what was returned from query to add entry to workout_card table:  ",
          data
        );
        return next();
      })
      .catch((err) =>
        next({
          log: "error posting workout to workout_card table in database",
          message: { err: `error received from postWorkout query` },
        })
      );
  },
};

module.exports = queriesRouter;
