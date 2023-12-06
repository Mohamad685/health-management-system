import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssignPatients = () => {
  const [availableRooms, setAvailableRooms] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    // Fetch available rooms data from the API
    axios.get('/api/admin/available-rooms')
      .then(response => {
        setAvailableRooms(response.data);
      })
      .catch(error => {
        console.error('Error fetching available rooms:', error);
      });

    // Fetch patients data from the API
    axios.get('/api/admin/patients')
      .then(response => {
        setPatients(response.data);
      })
      .catch(error => {
        console.error('Error fetching patients:', error);
      });
  }, []);

  const handlePatientSelect = (patientId) => {
    // Set the selected patient based on the patientId
    setSelectedPatient(patientId);
  };

  const handleRoomAssign = (roomId) => {
    
  };

  return (
    <div>
      <h2>Assign Patients to Rooms</h2>
      <div>
        <h3>Available Rooms</h3>
        <ul>
          {Array.isArray(availableRooms) && availableRooms.map(room => (
            <li key={room.id}>
              {room.name}
              <button onClick={() => handleRoomAssign(room.id)}>Assign</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Select Patient</h3>
        <ul>
          {Array.isArray(patients) && patients.map(patient => (
            <li key={patient.id}>
              {patient.name}
              <button onClick={() => handlePatientSelect(patient.id)}>Select</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AssignPatients;
