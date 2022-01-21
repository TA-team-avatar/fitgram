import React, { useEffect } from 'react';
import { getAllForums, deleteForum } from '../features/forumSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import AddForumModal from '../components/modals/AddForumModal';
import { getUserId } from '../features/userSlice';

const DashboardContainer = () => {
  const forumList = useSelector((state) => state.forum.forumList);
  const currentUserId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();

  // Dispatch actions on mount
  useEffect(() => {
    dispatch(getAllForums());
    dispatch(
      getUserId({
        token: sessionStorage.getItem('token'),
      })
    );
  }, []);

  return (
    <>
      <div>
        <h1>Welcome to Your Dashboard</h1>
        <hr />
        <div>
          <AddForumModal />
        </div>
        <hr />
        <div className='span-containers'>
          {forumList.map((forum, idx) => (
            <div className='div-span' key={idx}>
              <Link to={`/forum_page/${forum.id}`}>{forum.name}</Link>
              <span className='second-span'>
                {' '}
                Date Created: {forum.date_created}
              </span>
              <span>
                {forum.owner_user_id === currentUserId ? (
                  <button
                    className=' btn-success'
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
                    className=' btn-success'
                  >
                    <button>View User Profile</button>
                  </Link>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DashboardContainer;
