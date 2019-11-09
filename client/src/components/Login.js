import React, { useState, useEffect } from "react";

import api from '../utils/axiosWithAuth';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [user, setUser] = useState({
    username: "",
    password: ""
  })

  const handleChange = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()

    api()
      .post("/api/login", user)
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        console.log(`Signed In`)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Sign In</label>
      <input  
        type="text"
        name="username"
        placeholder="Username"
        value={user.username}
        onChange={handleChange}
      />
      <input  
        type="password"
        name="password"
        placeholder="Password"
        value={user.password}
        onChange={handleChange}
      />
      <button type="submit">Log In</button>
    </form>
  );
};

export default Login;
