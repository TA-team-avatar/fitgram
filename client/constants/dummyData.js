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
    duration: 10,
  },
  {
    id: 2,
    owner_user_id: 1,
    name: "Han's Lower Body Routine!",
    duration: 15,
  },
  {
    id: 3,
    owner_user_id: 1,
    name: "Han's Hulkout Routine!",
    duration: 30,
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
    id: 2,
    routine_id: 1,
    workout_id: 2,
    set: 5,
    repetition_motion: 10,
    weight: 200,
    day: "Tue",
  },
  {
    id: 3,
    routine_id: 1,
    workout_id: 3,
    set: 5,
    repetition_motion: 10,
    weight: 250,
    day: "Wed",
  },
  {
    id: 4,
    routine_id: 2,
    workout_id: 4,
    set: 5,
    repetition_motion: 10,
    weight: 250,
    day: "Wed",
  },
  {
    id: 5,
    routine_id: 2,
    workout_id: 5,
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
    name: "Military Press",
  },
  {
    id: 3,
    name: "Barbell Row",
  },
  {
    id: 4,
    name: "Squat",
  },
  {
    id: 5,
    name: "Deadlift",
  },
];

dummyData.forums = [
  {
    id: 1,
    owner_user_id: 1,
    routine_id: 1,
    name: "Han's Forum: Upperbody routine!!",
    likes: 1000,
    dislikes: 1,
    date_created: "2022-01-01",
  },
  {
    id: 2,
    owner_user_id: 1,
    routine_id: undefined,
    name: "Han's Forum: Lowerbody routine!",
    likes: 7,
    dislikes: 0,
    date_created: "2022-01-02",
  },
  {
    id: 3,
    owner_user_id: 2,
    routine_id: undefined,
    name: "James's Forum: UpperBody routine!",
    likes: 7,
    dislikes: 0,
    date_created: "2022-01-02",
  },
  {
    id: 4,
    owner_user_id: 2,
    routine_id: undefined,
    name: "James's Forum: try this out!",
    likes: 7,
    dislikes: 0,
    date_created: "2022-01-02",
  },
  {
    id: 5,
    owner_user_id: 2,
    routine_id: undefined,
    name: "James's Forum: This is fun",
    likes: 7,
    dislikes: 0,
    date_created: "2022-01-02",
  },
];

dummyData.comments = [
  {
    id: 1,
    owner_user_id: 1,
    forum_id: 1,
    description: "Amazing routine!",
    date_created: "2022-01-14",
    user_name: "Han",
  },
  {
    id: 2,
    owner_user_id: 2,
    forum_id: 1,
    description: "Try this routine!",
    date_created: "2022-01-14",
    user_name: "James",
  },
  {
    id: 3,
    owner_user_id: 1,
    forum_id: 1,
    description: "Gained 20 lbs muscle in 3 months!!",
    date_created: "2022-01-14",
    user_name: "Han",
  },
];

export default dummyData;
