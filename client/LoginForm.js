import React, { useState, useEffect } from "react";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    console.log(username);
    console.log(password);
  }

	return (
		<div className="login-wrapper">
      <h3>Log In</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input 
            type="text" 
            onChange={e => setUsername(e.target.value)} 
            placeholder="Username"
          />
        </div>
        <div>
          <input 
            type="password"
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>  
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
	);
};

export default LoginForm;