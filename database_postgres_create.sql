

CREATE TABLE IF NOT EXISTS athletes (
    "_id" serial NOT NULL, 
    "email_address" varchar NOT NULL, 
    "password" varchar,
    "athlete_name" varchar NOT NULL,
    "age" int,
    CONSTRAINT "athletes_id_pk" PRIMARY KEY ("_id") 
);

CREATE TABLE IF NOT EXISTS workout_card (
    "_id" serial NOT NULL, 
    "workout_content" char NOT NULL, 
    "date" timestamp,
    "athlete_id" serial REFERENCES athletes("_id"),
    CONSTRAINT "workout_card_id_pk" PRIMARY KEY ("_id")
);

INSERT INTO athletes VALUES (3, 'hello@world.com', 'ahash_832934y69', 'Jane Doe', 34);
