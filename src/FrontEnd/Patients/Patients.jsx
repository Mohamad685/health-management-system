// src/PatientDashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Patient.css";
const PatientDashboard = () => {
	const [medicalHistory, setMedicalHistory] = useState([]);
	const [upcomingAppointments, setUpcomingAppointments] = useState([]);
	const [availableAppointments, setAvailableAppointments] = useState([]);

	useEffect(() => {
		// Fetch medical history, upcoming appointments, and available appointments when the component mounts
		fetchMedicalHistory();
		fetchUpcomingAppointments();
		fetchAvailableAppointments();
	}, []);

	const fetchMedicalHistory = () => {
		// Make an API call to fetch medical history
		axios
			.get("/api/patient/medical-history")
			.then((response) => {
				setMedicalHistory(response.data);
			})
			.catch((error) => {
				console.error("Error fetching medical history:", error);
			});
	};

	// src/PatientDashboard.js
	const fetchUpcomingAppointments = () => {
		// Make an API call to fetch upcoming appointments
		axios
			.get("/api/patient/upcoming-appointments")
			.then((response) => {
				if (Array.isArray(response.data)) {
					setUpcomingAppointments(response.data);
				} else {
					console.error(
						"Invalid data format for upcoming appointments:",
						response.data
					);
				}
			})
			.catch((error) => {
				console.error("Error fetching upcoming appointments:", error);
			});
	};

	// src/PatientDashboard.js
const fetchAvailableAppointments = () => {
  // Make an API call to fetch available appointments for booking
  axios.get('/api/patient/available-appointments')
    .then(response => {
      if (Array.isArray(response.data)) {
        setAvailableAppointments(response.data);
      } else {
        console.error('Invalid data format for available appointments:', response.data);
      }
    })
    .catch(error => {
      console.error('Error fetching available appointments:', error);
    });
};


	const bookAppointment = (appointmentId) => {
		// Implement booking an appointment
		// Make an API call to book the appointment
		axios
			.post("/api/patient/book-appointment", { appointmentId })
			.then((response) => {
				// Handle success, maybe update the state or show a success message
			})
			.catch((error) => {
				console.error("Error booking appointment:", error);
			});
	};

	const cancelAppointment = (appointmentId) => {
		// Implement canceling an appointment
		// Make an API call to cancel the appointment
		axios
			.post("/api/patient/cancel-appointment", { appointmentId })
			.then((response) => {
				// Handle success, maybe update the state or show a success message
			})
			.catch((error) => {
				console.error("Error canceling appointment:", error);
			});
	};

	return (
		<div>
			<h1>Patient Dashboard</h1>

			{/* Medical History */}
			<h2>Medical History</h2>
			<ul className="medical-history-list">
				{Array.isArray(medicalHistory) && medicalHistory.length > 0 ? (
					medicalHistory.map((record) => (
						<li key={record.id}>
							{record.date} - {record.description}
						</li>
					))
				) : (
					<p>No medical history available</p>
				)}
			</ul>

			{/* Upcoming Appointments */}
			<h2>Upcoming Appointments</h2>
			<ul className="upcoming-appointments-list">
				{upcomingAppointments.map((appointment) => (
					<li key={appointment.id}>
						{appointment.doctorName} - {appointment.date}
						<button onClick={() => cancelAppointment(appointment.id)}>
							Cancel
						</button>
					</li>
				))}
			</ul>

			{/* Available Appointments for Booking */}
			<h2>Available Appointments</h2>
			<ul className="available-appointments-list">
				{availableAppointments.map((appointment) => (
					<li key={appointment.id}>
						{appointment.doctorName} - {appointment.date}
						<button onClick={() => bookAppointment(appointment.id)}>
							Book
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default PatientDashboard;
