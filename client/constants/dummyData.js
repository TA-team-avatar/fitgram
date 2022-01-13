const dummyData = {};

dummyData.user = 1;

dummyData.users = [
  {
    id: 1,
    user_name: "Han",
  },
  {
    id: 2,
    user_name: "James",
  },
];
dummyData.routines = [
  {
    id: 1,
    owner_user_id: 1,
    name: "Han's Upper Body Routine!",
    duration: 7,
  },
  {
    id: 12,
    owner_user_id: 1,
    name: "Han's Lower Body Routine!",
    duration: 10,
  },
  {
    id: 13,
    owner_user_id: 1,
    name: "Han's Hulkout Routine!",
    duration: 10,
  },
  {
    id: 4,
    owner_user_id: 2,
    name: "James's All Body Routine!!",
    duration: 7,
  },
];

dummyData.routine_workouts = [
  {
    id: 1,
    routine_id: 1,
    workout_id: 1,
    set: 5,
    repetition_motion: 10,
    weight: 150,
    day: "Mon",
  },
  {
    id: 1,
    routine_id: 1,
    workout_id: 2,
    set: 5,
    repetition_motion: 10,
    weight: 200,
    day: "Tue",
  },
  {
    id: 1,
    routine_id: 1,
    workout_id: 3,
    set: 5,
    repetition_motion: 10,
    weight: 250,
    day: "Wed",
  },
];

dummyData.workouts = [
  {
    id: 1,
    name: "Bench Press",
  },
  {
    id: 2,
    name: "Squat",
  },
  {
    id: 3,
    name: "Deadlift",
  },
];

dummyData.forums = [
  {
    id: 1,
    owner_user_id: 1,
    routine_id: 1,
    name: "Han's Forum1!",
    likes: 5,
    dislikes: 1,
    date_created: "2022-01-01",
  },
  {
    id: 2,
    owner_user_id: 1,
    routine_id: 1,
    name: "Han's Forum2!",
    likes: 7,
    dislikes: 0,
    date_created: "2022-01-02",
  },
];

export default dummyData;
