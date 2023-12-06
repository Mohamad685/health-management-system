
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorDashboard = () => {
  const [patientRecords, setPatientRecords] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch patient records and appointments when the component mounts
    fetchPatientRecords();
    fetchAppointments();
  }, []);

  const fetchPatientRecords = () => {
    // Make an API call to fetch patient records
    axios.get('/api/doctor/patient-records')
      .then(response => {
        setPatientRecords(response.data);
      })
      .catch(error => {
        console.error('Error fetching patient records:', error);
      });
  };

  const fetchAppointments = () => {
    // Make an API call to fetch appointments
    axios.get('/api/doctor/appointments')
      .then(response => {
        setAppointments(response.data);
      })
      .catch(error => {
        console.error('Error fetching appointments:', error);
      });
  };

  console.log('patientRecords:', patientRecords); // Add this line for debugging

  return (
    <div>
      <h1>Doctor Dashboard</h1>

  
      <h2>Patient Records</h2>
      <ul>
        {Array.isArray(patientRecords) && patientRecords.length > 0 ? (
          patientRecords.map(patient => (
            <li key={patient.id}>
              {patient.name} - {patient.condition}
              <button onClick={() => assignPatient(patient.id)}>Assign</button>
            </li>
          ))
        ) : (
          <p>No patient records available</p>
        )}
      </ul>


    </div>
  );
};

export default DoctorDashboard;
