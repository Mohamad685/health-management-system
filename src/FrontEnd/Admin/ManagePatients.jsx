import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManagePatients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Fetch patients data from the API
    axios.get('/api/admin/patients')
      .then(response => {
        setPatients(response.data);
      })
      .catch(error => {
        console.error('Error fetching patients:', error);
      });
  }, []);

  return (
    <div>
        <h2>Manage patients</h2>
        <ul>
            {Array.isArray(patients) &&
                patients.map((Patients) => <li key={Patients.id}>{Patients.name}</li>)}
        </ul>
    </div>
);
};

export default ManagePatients;
