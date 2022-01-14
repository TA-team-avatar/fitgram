import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import RoutineTemplate from "../components/RoutineTemplate";
import { getUserId } from "../features/userSlice";
import { getForum, removeRoutineToForum } from "../features/forumSlice";
import { useSelector, useDispatch } from "react-redux";
import AddRoutineModal from "../components/modals/AddRoutineModal";

const ForumContainer = () => {
  // Hooks
  const { forumId } = useParams();
  const currentUserId = useSelector((state) => state.user.userId);
  const forumData = useSelector((state) => state.forum.forumData);
  const dispatch = useDispatch();
  //const token = sessionStorage.getItem("token");

  // Destructure Forum Data
  const { date_created, likes, dislikes, name, owner_user_id, routine_id } =
    forumData;

  // Dispatch actions on mount
  useEffect(() => {
    dispatch(
      getUserId({
        token: "fakeToken",
      })
    );
    dispatch(
      getForum({
        forumId: Number(forumId),
      })
    );
  }, []);

  return (
    <>
      {/* Buttons section */}
      <Link to={`/profile/${owner_user_id}`} className="btn btn-secondary me-3">
        Visit User Profile
      </Link>
      {owner_user_id === currentUserId && owner_user_id && !routine_id ? (
        <AddRoutineModal />
      ) : (
        <></>
      )}
      <hr />
      {/* Forum header section */}
      <div>Title: {name}</div>
      <span>Date Posted: {date_created}</span>
      <hr />
      {/* Routine section */}
      <div>Routine</div>
      {routine_id ? <RoutineTemplate /> : <></>}
      {routine_id ? (
        <button
          className="btn btn-primary"
          onClick={() => {
            dispatch(
              removeRoutineToForum({
                forumId: Number(forumId),
              })
            );
          }}
        >
          Remove Routine
        </button>
      ) : (
        <></>
      )}
      <hr />
      {/* Likes and dislikes section */}
      <div>Likes: {likes}</div>
      <div>Dislikes: {dislikes}</div>
    </>
  );
};

export default ForumContainer;
