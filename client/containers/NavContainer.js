import React from 'react';

const NavContainer = () => {
  return (
    <div>
      <h1 class='title'>Fitness App </h1>
      <>
        <nav class='navbar'>
          <div>
            <div class='navbar-nav'>
              <ul class='navbar-nav'>
                <li class='nav-item'>
                  <a class='nav-link' href='/profile/:userId'>
                    My Profile
                  </a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='/message/:id'>
                    Messages
                  </a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='#'>
                    Logout (link needed)
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
