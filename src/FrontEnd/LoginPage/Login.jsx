import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost/hospital/apis/adminSignin.php",
        {
          username,
          password,
        }
      );

      if (response.data.success) {
        // Authentication successful, determine user role and navigate accordingly
        const userRole = response.data.role;

        switch (userRole) {
          case "Admin":
            // Redirect admin to admin page
            navigate("/admin");
            break;
          case "Doctor":
            // Redirect doctor to their page using their ID
            navigate(`/doctor/${response.data.doctor_id}`);
            break;
          case "Patient":
            // Redirect patient to their page using their ID
            navigate(`/patient/${response.data.patient_id}`);
            break;
          default:
            // Unknown role, handle as needed
            break;
        }
      } else {
        // Authentication failed, show an error message
        setErrorMessage("Wrong username or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
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
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </form>
      </main>
      <footer>
        <p>&copy; 2023 Hospital Management System</p>
      </footer>
    </div>
  );
};

export default Login;
