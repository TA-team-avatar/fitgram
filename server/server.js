const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const env = require("dotenv").config();
const PORT = process.env.PORT;
const queriesRouter = require("./queriesRoutedToDB");
const authentification = require("./authentification");

app.use(cors());

/**
 * handle parsing request body
 */
app.use(express.json());

//handle workouts-list query for workout cards data
app.get("/workouts-list", queriesRouter.getWorkoutsList, (req, res) => {
  const { workoutsList } = res.locals;
  return res.status(200).json({ workoutsList });
});

//handle athlete-workouts list query to get all the workouts for one athlete
app.get("/athlete-workouts", queriesRouter.getWorkoutsByAthlete, (req, res) => {
  const { workoutsList } = res.locals;
  return res.status(200).json({ workoutsList });
});

//handle request to get the name of the athlete by the Id
app.get("/athlete-info", queriesRouter.getAthleteInfo, (req, res) => {
  const { athleteName } = res.locals;
  return res.status(200).json({ athleteName });
});

//handle post-workout route to add a workout to workout_card table
app.post("/post-workout", queriesRouter.postWorkout, (req, res) => {
  return res.status(200).send("workout posted");
});

app.post(
  "/api/google-auth",
  authentification.googleVerify,
  authentification.getAthleteId,
  (req, res) => {
    //gets the userId from the middleware's res.locals (once authenticated and/or created in table)
    //then sends it as a cookie to the front-end so state can grab it where needed
    const { athlete_id } = res.locals;
    res.cookie("athleteId", athlete_id, {
      expires: new Date(Date.now() + 1800000),
    });
    return res.status(201).send("cookie sent");
  }
);

//global error middleware
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//handle page not found
app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
