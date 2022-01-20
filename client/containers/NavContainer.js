import React from 'react';

const NavContainer = () => {
  return (
    <div>
      <>
        <nav class='navbar navbar-expand-lg navbar-dark bg-dark'>
          <div class='container-fluid'>
            <a class='navbar-brand'>Fitness App</a>
            <div className='navbar-nav'>
              <ul class='nav nav-tabs'>
                <li class='nav-item'>
                  <a
                    class='nav-link'
                    data-bs-toggle='tab'
                    href='/profile/:userId'
                  >
                    Profile
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
