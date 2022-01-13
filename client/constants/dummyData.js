const dummyData = {};

dummyData.user = 1;

dummyData.users = [
  {
    id: 1,
    user_name: "Han",
  },
];
dummyData.routines = [
  {
    id: 1,
    owner_user_id: 1,
    name: "Han's Routine!",
    duration: 7,
  },
];

dummyData.routine_workout = [
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
    name: "Han's Forum!",
    likes: 5,
    dislikes: 1,
    date_created: "2022-01-01",
  },
];

export default dummyData;
