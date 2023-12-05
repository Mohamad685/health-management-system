import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate(); // Get the navigate function from React Router

  const handleLogin = async () => {
    try {
      // Make a request to the sign-in API
      const response = await axios.post('http://localhost/hospital/apis/adminSignin.php', {
        username,
        password,
      });

      if (response.data.success) {
        // Authentication successful, navigate to the admin page
        navigate('/admin');
      } else {
        // Authentication failed,show an error message)
        setErrorMessage('Wrong username or password');
      }
    } catch (error) {
      // Handle any error that occurs during the API request
      console.error('Error during login:', error);
    }
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
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
      </main>
      <footer>
        <p>&copy; 2023 Hospital Management System</p>
      </footer>
    </div>
  );
};

export default Login;
