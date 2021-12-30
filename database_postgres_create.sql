

CREATE TABLE IF NOT EXISTS athletes (
    "_id" serial NOT NULL, 
    "email_address" varchar NOT NULL, 
    "password" varchar NOT NULL,
    "athlete_name" varchar NOT NULL,
    "age" int,
    CONSTRAINT "athletes_id_pk" PRIMARY KEY ("_id") 
);

CREATE TABLE IF NOT EXISTS workout_card (
    "_id" serial NOT NULL, 
    "workout_content" char NOT NULL, 
    "data"
    "athlete_id" serial REFERENCES athletes("_id"),
     CONSTRAINT "athletes_id_pk" PRIMARY KEY ("_id")

)