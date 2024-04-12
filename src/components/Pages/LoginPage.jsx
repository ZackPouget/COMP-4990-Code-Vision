import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "../../styling/loginAndSignup.scss"

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    // Check if username or password is empty
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    try {
      const url = 'http://localhost:5000/server/Login';

      const data = { username, password };

      const response = await axios.post(url, data);

      console.log(response.data.message);
      navigate('/Chat');
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
        setError('Invalid username or password');
      } else {
        console.error('Error', error.message);
      }
    }
  };

  return (
    <div className="login-signup-page">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-container">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/Signup">Sign Up</Link>
      </p>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default LoginPage;