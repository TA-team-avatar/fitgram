const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "467096301340-lskbsr95tqn59v25db47f1jsl5raq4g9.apps.googleusercontent.com"
);
require("dotenv").config({ path: "../.env" });
const { Pool } = require("pg");
const databaseConfig = { connectionString: process.env.DATABASE_URL };
var session = require("express-session");

//creating a new pool
const pool = new Pool(databaseConfig);

const authentification = {
  google: async (req, res, next) => {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience:
        "467096301340-lskbsr95tqn59v25db47f1jsl5raq4g9.apps.googleusercontent.com",
    });
    if (!ticket) {
      return next({
        log: "error verifying google ID",
        message: {
          err: `error received from failed google ID verification: ${err}`,
        },
      });
    }

    const { name, email, picture } = ticket.getPayload();
    res.locals.email = email;
    //query the table here and see if the email already exists on it, and run different logic depending
    //for either the below which is already written to add the user to the athlete table
    // or to proceed to log them in since they already exist on the table

    pool
      .query(`SELECT _id FROM athletes WHERE email_address='${email}'`)
      .then((queryData) => {
        console.log("query to select the user from athletes table ran");
        console.log(queryData);
        //check if an athlete entry came back and if not add the user to the table
        if (queryData.rows[0] === undefined) {
          console.log("I am inside the queryData");
          //this adds the user to the athlete table
          pool
            .query(
              `INSERT INTO athletes (athlete_name, email_address) VALUES('${name}', '${email}');`
            )
            .then((responseFromDB) => {
              console.log("insert query to add to DB ran");
            })
            .catch((err) =>
              next({
                log: "error adding new athlete to database",
                message: {
                  err: `error received from authentification/new athlete adding query: ${err}`,
                },
              })
            );
        }

        return next();
      })
      .catch((err) =>
        next({
          log: "error finding athlete's email in the database",
          message: {
            err: `error received while seeing if athlete's email exists in the : ${err}`,
          },
        })
      );
  },

  //this is where we will add a cookie, but right now it gets the athlete_id from the table
  //and sends that back as state from the server file
  setSessionId: (req, res, next) => {
    const { email } = res.locals;
    console.log(email, "email");
    pool
      .query(`SELECT _id FROM athletes WHERE email_address='${email}';`)
      .then((athleteIdFromDB) => {
        const userId = athleteIdFromDB.rows[0]._id;
        console.log(userId, "<- this is the athlete_id from query");
        // req.session.userId = userId;
        // do we add cookies here
        res.locals.userId = userId;
        return next();
      })
      .catch((err) =>
        next({
          log: "error finding user Id to set session Id",
          message: {
            err: `error received from database when querying for athlete_id: ${err}`,
          },
        })
      );
  },
};

module.exports = authentification;

// this was the walkthrough code we worked off of

// const { OAuth2Client } = require('google-auth-library')
// const client = new OAuth2Client(process.env.CLIENT_ID)
// server.post("/api/v1/auth/google", async (req, res) => {
//     const { token }  = req.body
//     const ticket = await client.verifyIdToken({
//         idToken: token,
//         audience: process.env.CLIENT_ID
//     });
//     const { name, email, picture } = ticket.getPayload();
//     const user = await db.user.upsert({
//         where: { email: email },
//         update: { name, picture },
//         create: { name, email, picture }
//     })
//     res.status(201)
//     res.json(user)
// })
