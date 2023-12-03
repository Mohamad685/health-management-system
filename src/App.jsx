// App.js or index.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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

        {/* Route to the Admin page */}
        <Route path="/admin/*" element={<Admin />} />

        {/* Route to the Doctors page */}
        <Route path="/doctors" element={<Doctors />} />

        {/* Route to the Patients page */}
        <Route path="/patients" element={<Patients />} />

        {/* Default route, Navigate to login page if the path is not matched */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
