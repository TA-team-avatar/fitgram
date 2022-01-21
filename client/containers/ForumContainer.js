import React, { useEffect } from 'react';
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

const ForumContainer = () => {
  const { forumId } = useParams();
  const currentUserId = useSelector((state) => state.user.userId);
  const forumData = useSelector((state) => state.forum.forumData);
  const commentData = useSelector((state) => state.comment.commentData);
  const dispatch = useDispatch();

  // Destructure Forum Data
  const { date_created, likes, dislikes, name, owner_user_id, routine_id } =
    forumData;

  // Dispatch actions on mount
  useEffect(() => {
    dispatch(
      getUserId({
        token: sessionStorage.getItem('token'),
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
        <h1>Forums</h1>
        <hr />
        <div>
          {owner_user_id === currentUserId && owner_user_id && !routine_id ? (
            <AddRoutineModal />
          ) : (
            <></>
          )}
        </div>
        <hr />
        {/* Buttons section */}
        <div className='visitUserProfile'>
          <Link to={`/profile/${owner_user_id}`} className=' btn-success-1'>
            Visit User Profile
          </Link>
        </div>
        {/* Forum header section */}
        <div className='span-containers-forum'>
          <div>Title: {name}</div>
          <span className='second-span'>Date Posted: {date_created}</span>
          <hr />
          {/* Routine section */}
          <div>Routine</div>
          {routine_id ? <RoutineTemplate /> : <></>}
          {routine_id ? (
            <button
              className=' btn-success'
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
        </div>
        <hr />
        {/* Likes and dislikes section */}
        <span className='span-likes'>Likes: {likes}</span>&nbsp;
        <span className='span-likes'>Dislikes: {dislikes}</span>
        <hr />
        {/* Comment Section */}
        <div>
          <AddCommentModal forumId={forumId} currentUserId={currentUserId} />
          <h2 className='comments-heading'>Comments</h2>

          <div className='comments-bottom'>
            <hr class='comments' />
            {commentData.map((comment, idx) => (
              <CommentBox
                key={idx}
                props={comment}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForumContainer;
