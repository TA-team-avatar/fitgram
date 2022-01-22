import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUpUser } from '../features/userSlice';

const SignupForm = (props) => {
  const dispatch = useDispatch();
  // const history = useNavigate();
  const [userInfo, setUserInfo] = useState({
    user_name: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    height: null,
    weight: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(signUpUser(userInfo));
    // history('/dashboard');
    window.location.href = '/dashboard';
  };

  return (
    <div className='modal-home1'>
      <div className='signup'>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type='text'
              onChange={(e) =>
                setUserInfo({ ...userInfo, user_name: e.target.value })
              }
              placeholder='Username'
              className='form-control-sm'
              required
            />
          </div>
          <div>
            <input
              type='email'
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
              placeholder='Email'
              className='form-control-sm '
              required
            />
          </div>
          <div>
            <input
              type='text'
              onChange={(e) =>
                setUserInfo({ ...userInfo, first_name: e.target.value })
              }
              placeholder='First Name'
              className='form-control-sm'
              required
            />
          </div>
          <div>
            <input
              type='text'
              onChange={(e) =>
                setUserInfo({ ...userInfo, last_name: e.target.value })
              }
              placeholder='Last Name'
              className='form-control-sm'
              required
            />
          </div>
          <div>
            <input
              type='password'
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }
              placeholder='Password'
              className='form-control-sm'
              required
            />
          </div>
          <div>
            <input
              type='number'
              onChange={(e) =>
                setUserInfo({ ...userInfo, height: e.target.value })
              }
              placeholder='Height (in)'
              className='form-control-sm'
            />
          </div>
          <div>
            <input
              type='number'
              onChange={(e) =>
                setUserInfo({ ...userInfo, weight: e.target.value })
              }
              placeholder='Weight (lbs)'
              className='form-control-sm'
            />
          </div>

          <div>
            <button type='submit' className='btn-success-signup'>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
