import React from 'react';

const NavContainer = () => {
  return (
    <div>
      <h1 className='title'>Fitness App </h1>
      <>
        <nav className='navbar'>
          <div>
            <div className='navbar-nav'>
              <ul className='navbar-nav'>
                <li className='nav-item'>
                  <a className='nav-link' href='/profile/:userId'>
                    My Profile
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='/message/:id'>
                    Messages
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='#'>
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
