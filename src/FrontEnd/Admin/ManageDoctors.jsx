import React, { useState, useEffect } from 'react';

import axios from 'axios';

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorName, setDoctorName] = useState('');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost/hospital/apis/readDr.php');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const createDoctor = async () => {
    try {
      const response = await axios.post('http://localhost/hospital/apis/addDr.php', { name: doctorName });
      setDoctors([...doctors, response.data]);
      setDoctorName('');
    } catch (error) {
      console.error('Error creating doctor:', error);
    }
  };

  const updateDoctor = async (id) => {
    try {
      const response = await axios.post(`http://localhost/hospital/apis/updateDr.php/${id}`, { name: doctorName });
      setDoctors(doctors.map((doctor) => (doctor.doctor_id === id ? response.data : doctor)));
      setSelectedDoctor(null);
      setDoctorName('');
    } catch (error) {
      console.error('Error updating doctor:', error);
    }
  };

  const deleteDoctor = async (id) => {
    try {
      await axios.post(`http://localhost/hospital/apis/deleteDr.php/${id}`);
      setDoctors(doctors.filter((doctor) => doctor.doctor_id !== id));
      setSelectedDoctor(null);
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createDoctor();
  };

  return (
    <div>
      <h2>Manage Doctors</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Doctor Name"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
        />
        <button type="submit">Create Doctor</button>
      </form>
      {selectedDoctor && (
        <form onSubmit={() => updateDoctor(selectedDoctor.doctor_id)}>
          <input
            type="text"
            placeholder="Update Doctor Name"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
          />
          <button type="submit">Update Doctor</button>
        </form>
      )}
      <ul>
        {Array.isArray(doctors) &&
          doctors.map((doctor) => (
            <li key={doctor.doctor_id}>
              {doctor.full_name}
              <button onClick={() => deleteDoctor(doctor.doctor_id)}>Delete</button>
              <button onClick={() => setSelectedDoctor(doctor)}>Edit</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ManageDoctors;
