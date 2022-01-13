import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserId } from "../features/userSlice";
import { getForum } from "../features/forumSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const ForumContainer = () => {
  const { forumId } = useParams();
  const currentUserId = useSelector((state) => state.user.userId);
  const forumData = useSelector((state) => state.forum.forumData);
  const dispatch = useDispatch();
  //const token = sessionStorage.getItem("token");

  // Get current user's id using token
  useEffect(() => {
    dispatch(
      getUserId({
        token: "fakeToken",
      })
    );
    dispatch(
      getForum({
        forumId: forumId,
      })
    );
  }, []);

  const { date_created, likes, dislikes, name, owner_user_id, routine_id } =
    forumData;

  /**
   * TODO: Make server API route returns routine details associated with forum
   */
  // const routineData = dummyData.routines.filter(
  //   (routine) => (routine.id = routine_id)
  // )[0];

  return (
    <>
      <Link to={`/profile/${owner_user_id}`} className="btn btn-secondary me-3">
        Visit User Profile
      </Link>
      {owner_user_id === currentUserId ? <Button name="Add Routine" /> : <></>}
      <hr />
      <div>Title: {name}</div>
      <span>Date Posted: {date_created}</span>
      <hr />
      <div>Routine</div>
      <hr />
      <div>Likes: {likes}</div>
      <div>Dislikes: {dislikes}</div>
    </>
  );
};

export default ForumContainer;
