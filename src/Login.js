import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login request
      const response = await axios.post('http://localhost:8080/auth/login', {
        username,
        password,
      });

      const token = response.data;

      if (token) {
        // Store token in localStorage
        localStorage.setItem('jwt_token', token);
        setSuccessMessage('Login successful!');
        setErrorMessage('');

        setTimeout(() => {
          navigate('/books');
        }, 1000);
      } else {
        setErrorMessage('Token not received. Please check the login credentials.');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          setErrorMessage('Invalid credentials or token not provided.');
        } else if (error.response.status === 401) {
          setErrorMessage('Unauthorized access.');
        } else {
          setErrorMessage(`Login failed: ${error.response?.data?.message || error.message}`);
        }
      } else {
        setErrorMessage('An unexpected error occurred. Please try again later.');
      }
      setSuccessMessage('');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {successMessage && <p className="green">{successMessage}</p>}
      {errorMessage && <p className="red">{errorMessage}</p>}
    </div>
  );
};

export default Login;
