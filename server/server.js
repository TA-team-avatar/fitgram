const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const PORT = 3000;

require("dotenv").config();

app.use(cors());

//Start writing all the middleware below

/**
 * handle parsing request body
 */
app.use(express.json());

//handle page not found
app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);

//globle error middleware
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

app.listen(PORT, () => console.log(`listening at port ${PORT}`));
