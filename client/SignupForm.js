import React, { useState, useEffect } from "react";

const SignupForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(fullName);
    console.log(age);
    console.log(username);
    console.log(password);
  };

  return (
    <div className="my-5">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
          />
        </div>
        <div>
          <input
            type="text"
            onChange={(e) => setAge(e.target.value)}
            placeholder="Age"
          />
        </div>
        <div>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>
        <div>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>

        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
