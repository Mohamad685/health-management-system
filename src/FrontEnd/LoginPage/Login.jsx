// Login.js
import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom'; // React Router's useHistory hook

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const history = useHistory();

  const handleLogin = async () => {
    // Implement authentication logic here using Axios or Fetch
    // If authentication is successful, redirect to the respective user page
    // For simplicity, assuming a successful login redirects to the Admin page
    history.push('/admin');
  };

  return (
    <div>
      <header>
        <h1>Hospital Management System Login</h1>
      </header>
      <main>
        <form>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
      </main>
      <footer>
        <p>&copy; 2023 Hospital Management System</p>
      </footer>
    </div>
  );
};

export default Login;
