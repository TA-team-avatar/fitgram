const express = require('express');
const cors = require('cors');
const path = require('path');
// const queriesRouter = require('./queriesRoutedToDB');
const authentification = require('./authentification');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const userRouter = require('./routes/users.js');
const sessionRouter = require('./routes/sessions.js');
const routineRouter = require('./routes/routines.js');
const forumRouter = require('./routes/forums.js');
const commentsRouter = require('./routes/comments.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);
app.use('/session', sessionRouter);
app.use('/routine', routineRouter);
app.use('/forum', forumRouter);
app.use('/comments', commentsRouter);

app.post(
  '/api/google-auth',
  authentification.googleVerify,
  authentification.getAthleteId,
  (req, res) => {
    //gets the userId from the middleware's res.locals (once authenticated and/or created in table)
    //then sends it as a cookie to the front-end so state can grab it where needed
    const { athlete_id } = res.locals;
    res.cookie('athleteId', athlete_id, {
      expires: new Date(Date.now() + 1800000),
    });
    return res.status(201).send('cookie sent');
  }
);

//global error middleware
app.use((err, req, res, next) => {
  const defaultErr = {
    log: `Express error handler caught unknown middleware error: ${err}`,
    status: 500,
    message: { err: `${err}` },
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
