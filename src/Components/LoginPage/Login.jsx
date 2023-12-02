// LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { username, password });
      const token = response.data.token;
      // Store token in local storage
      localStorage.setItem('token', token);
      // Redirect user to their respective dashboard
      // You may use react-router-dom for navigation
      // Example: history.push('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
      // Handle login failure (show error message, etc.)
    }
  };

  return (
    <div>
      <label>Username:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
