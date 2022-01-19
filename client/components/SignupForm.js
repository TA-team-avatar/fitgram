import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUpUser } from '../features/userSlice';

const SignupForm = (props) => {
  const dispatch = useDispatch();
  const history = useNavigate();
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
    history('/');
  };

  return (
    <div className='my-5'>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            onChange={(e) =>
              setUserInfo({ ...userInfo, user_name: e.target.value })
            }
            placeholder='Username'
            className='text-black my-1'
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
            className='text-black my-1'
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
            className='text-black my-1'
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
            className='text-black my-1'
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
            className='text-black my-1'
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
            className='text-black my-1'
          />
        </div>
        <div>
          <input
            type='number'
            onChange={(e) =>
              setUserInfo({ ...userInfo, weight: e.target.value })
            }
            placeholder='Weight (lbs)'
            className='text-black my-1'
          />
        </div>

        <div>
          <button type='submit' className='text-black'>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
