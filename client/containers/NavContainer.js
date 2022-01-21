import React, { useEffect } from 'react';
import { getUserId } from '../features/userSlice';
import { useSelector, useDispatch } from 'react-redux';

const NavContainer = () => {
  const currentUserId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();

  // // Dispatch actions on mount
  useEffect(() => {
    dispatch(
      getUserId({
        token: sessionStorage.getItem('token'),
      })
    );
  }, []);

  return (
    <div>
      <>
        <nav class='navbar navbar-expand-lg navbar-dark bg-dark'>
          <div class='container-fluid'>
            <a class='navbar-brand'>fit haús</a>
            <div className='navbar-nav'>
              <ul class='nav nav-tabs'>
                <li class='nav-item'>
                  <a
                    class='nav-link'
                    data-bs-toggle='tab'
                    href={`/profile/${currentUserId}`}
                  >
                    Profile
                  </a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' data-bs-toggle='tab' href='/dashboard'>
                    Dashboard
                  </a>
                </li>

                <li class='nav-item'>
                  <a class='nav-link' data-bs-toggle='tab' href='/message/:id'>
                    Messages
                  </a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' data-bs-toggle='tab' href='#'>
                    Logout(link)
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    </div>
  );
};

export default NavContainer;
