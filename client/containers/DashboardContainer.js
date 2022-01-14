import React, { useEffect } from "react";
import { getAllForums } from "../features/forumSlice";
import { useSelector, useDispatch } from "react-redux";
import AddForumModal from "../components/modals/AddForumModal";
import { getUserId } from "../features/userSlice";

const DashboardContainer = () => {
  const forumList = useSelector((state) => state.forum.forumList);
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();

  // Dispatch actions on mount
  useEffect(() => {
    dispatch(getAllForums());
    dispatch(
      getUserId({
        token: "fakeToken",
      })
    );
  }, []);

  return (
    <>
      <h1>Welcome to Forums!</h1>
      <hr />
      <AddForumModal />
      <hr />
      {forumList.map((forum, idx) => (
        <div key={idx}>
          <span>{forum.name}</span>
          Date Created:
          <span>{forum.date_created}</span>
        </div>
      ))}
    </>
  );
};

export default DashboardContainer;
