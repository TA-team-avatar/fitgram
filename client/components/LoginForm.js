import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loginUser } from '../features/userSlice';

const LoginForm = (props) => {
  const userId = useSelector((state) => state.user).userId;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  return (
    <div className='my-5'>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
            className='text-black'
          />
        </div>
        <div>
          <input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            className='text-black'
          />
        </div>
        <div>
          <button type='submit'>Login</button>
        </div>
      </form>
      <p className='text-black'>{userId}</p>
    </div>
  );
};

export default LoginForm;
