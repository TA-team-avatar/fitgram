import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteComments } from '../features/commentSlice';
import EditCommentModal from './modals/EditCommentModal';

const CommentBox = ({ props, currentUserId }) => {
  const dispatch = useDispatch();
  const { id, description, date_created, user_name, owner_user_id } = props;
  return (
    <>
      <div className='secondary'>{description}</div>
      <span className='second-span-comments'>User name: {user_name}</span>
      &nbsp;&nbsp;
      <span className='second-span-comments2'>
        Date posted: {date_created}
        {owner_user_id === currentUserId ? (
          <div>
            <button
              className='btn-success'
              onClick={() => {
                dispatch(
                  deleteComments({
                    id: id,
                  })
                );
              }}
            >
              Delete Comment
            </button>
            <div>
              <EditCommentModal id={id} description={description} />
            </div>
          </div>
        ) : (
          <></>
        )}
      </span>
      <hr />
    </>
  );
};

export default CommentBox;
