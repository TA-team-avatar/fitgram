import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserName } from "../features/userSlice";
import { getUserForumData } from "../features/forumSlice";
import { getUserRoutines } from "../features/routineSlice";
import AddRoutineModal from "../components/modals/AddRoutineModal";

const ProfileContainer = () => {
  const { userId } = useParams();
  const userData = useSelector((state) => state.user.userData);
  const routineList = useSelector((state) => state.routine.userRoutineData);
  const forumList = useSelector((state) => state.forum.forumList);
  const dispatch = useDispatch();

  const { id, owner_user_id, name, duration, date_created } = routineList;

  let totalLikes = forumList.reduce((acc, item) => acc + item.likes, 0);

  useEffect(() => {
    dispatch(
      getUserName({
        userId: Number(userId),
      })
    ),
      dispatch(
        getUserRoutines({
          userId: Number(userId),
        })
      ),
      dispatch(
        getUserForumData({
          userId: Number(userId),
        })
      );
  }, []);

  return (
    <>
      <h1>{userData.user_name}'s Profile</h1>
      <div>
        <span>Total Likes{totalLikes}</span>
        <hr />
        <AddRoutineModal />
        <hr />
        <>
          {routineList.map((routine, index) => (
            <div key={index}>
              <span>{routine.name}</span>
              Date Created: <span>{routine.date_created}</span>
            </div>
          ))}
        </>
        <button className="btn btn-secondary me-3">Messages</button>
      </div>
    </>
  );
};

export default ProfileContainer;
