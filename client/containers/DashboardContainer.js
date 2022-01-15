import React, { useEffect } from "react";
import { getAllForums, deleteForum } from "../features/forumSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import AddForumModal from "../components/modals/AddForumModal";
import { getUserId } from "../features/userSlice";

const DashboardContainer = () => {
  const forumList = useSelector((state) => state.forum.forumList);
  const currentUserId = useSelector((state) => state.user.userId);
  const forumData = useSelector((state) => state.forum.forumData);
  const dispatch = useDispatch();

  const { date_created, likes, dislikes, name, owner_user_id, routine_id } =
    forumData;
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
          <span>
            {forum.owner_user_id === currentUserId ? (
              <button
                className="btn btn-secondary me-3"
                onClick={() => {
                  dispatch(
                    deleteForum({
                      forumId: forum.id,
                    })
                  );
                }}
              >
                Delete Forum
              </button>
            ) : (
              <Link
                to={`/profile/${forum.owner_user_id}`}
                className="btn btn-secondary me-3"
              >
                <button>View User Profile</button>
              </Link>
            )}
          </span>
        </div>
      ))}

      <div></div>
    </>
  );
};

export default DashboardContainer;
