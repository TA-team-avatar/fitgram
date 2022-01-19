import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { loginUser } from '../features/userSlice';

const LoginForm = (props) => {
  const userId = useSelector((state) => state.user).userId;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginUser({ username, password }));
    history('/');
  };

  return (
    <div className='my-5'>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
            className='text-black my-1'
          />
        </div>
        <div>
          <input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            className='text-black my-1'
          />
        </div>
        <div>
          <button type='submit' className='text-black'>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
