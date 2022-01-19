<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import RoutineTemplate from '../components/RoutineTemplate';
import { getUserId } from '../features/userSlice';
import { getForum, removeRoutineToForum } from '../features/forumSlice';
import { getForumComments } from '../features/commentSlice';
import { useSelector, useDispatch } from 'react-redux';
import AddRoutineModal from '../components/modals/AddRoutineModal';
import CommentBox from '../components/CommentBox';
import AddCommentModal from '../components/modals/AddCommentModal';
=======
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import RoutineTemplate from "../components/RoutineTemplate";
import { getUserId } from "../features/userSlice";
import { getForum, removeRoutineToForum } from "../features/forumSlice";
import { getForumComments } from "../features/commentSlice";
import { useSelector, useDispatch } from "react-redux";
import AddRoutineModal from "../components/modals/AddRoutineModal";
import CommentBox from "../components/CommentBox";
import AddCommentModal from "../components/modals/AddCommentModal";
>>>>>>> dev

const ForumContainer = () => {
  const { forumId } = useParams();
  const currentUserId = useSelector((state) => state.user.userId);
  const forumData = useSelector((state) => state.forum.forumData);
  const commentData = useSelector((state) => state.comment.commentData);
  const dispatch = useDispatch();
  //const token = sessionStorage.getItem("token");

  // Destructure Forum Data
  const { date_created, likes, dislikes, name, owner_user_id, routine_id } =
    forumData;

  // Dispatch actions on mount
  useEffect(() => {
    dispatch(
      getUserId({
        token: 'fakeToken',
      })
    );
    dispatch(
      getForum({
        forumId: Number(forumId),
      })
    );
    dispatch(
      getForumComments({
        forumId: Number(forumId),
      })
    );
  }, []);

  return (
    <>
      <div>
        <h2 className='container'>Forums</h2>
        {/* Buttons section */}
        <Link to={`/profile/${owner_user_id}`} className='btn-secondary'>
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
        <span className='text'>Date Posted: {date_created}</span>
        <hr />
        {/* Routine section */}
        <div>Routine</div>
        {routine_id ? <RoutineTemplate /> : <></>}
        {routine_id ? (
          <button
            className='btn-secondary'
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
        <span className='text'>Likes: {likes}</span>&nbsp;
        <span className='text'>Dislikes: {dislikes}</span>
        <hr />
        {/* Comment Section */}
        <h2>Comments</h2>
        <AddCommentModal forumId={forumId} currentUserId={currentUserId} />
        <hr />
        {commentData.map((comment, idx) => (
          <CommentBox key={idx} props={comment} currentUserId={currentUserId} />
        ))}
        <hr />
      </div>
    </>
  );
};

export default ForumContainer;
