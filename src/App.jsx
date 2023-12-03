// Import necessary libraries
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import react from '@vitejs/plugin-react';
import Admin from '../src/FrontEnd/Admin/Admin';
import Doctors from '../src/FrontEnd/Doctors/Doctors';
import Patients from '../src/FrontEnd/Patients/Patients';
import Login from '../src/FrontEnd/LoginPage/Login';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route to the Login page */}
        <Route path="/login" element={<Login />} />

        {/* Routes for user-specific pages */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/patients" element={<Patients />} />

        {/* Default route, Navigate to login page if the path is not matched */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
