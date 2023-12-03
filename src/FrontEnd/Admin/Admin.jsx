// Admin.js

import React, { useState, useEffect } from "react";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import ManageDoctors from "./ManageDoctors";
import ManagePatients from "./ManagePatients";
import ApproveReject from "./ApproveReject";
import AssignPatients from "./AssignPatients";

const Admin = () => {
	const [doctors, setDoctors] = useState([]);
	const [patients, setPatients] = useState([]);
	const [pendingPatients, setPendingPatients] = useState([]);
	const [availableRooms, setAvailableRooms] = useState([]);

	useEffect(() => {
		// Fetch initial data from the API
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const doctorsResponse = await axios.get("/api/admin/doctors");
			const patientsResponse = await axios.get("/api/admin/patients");
			const pendingPatientsResponse = await axios.get(
				"/api/admin/pending-patients"
			);
			const availableRoomsResponse = await axios.get(
				"/api/admin/available-rooms"
			);

			setDoctors(doctorsResponse.data);
			setPatients(patientsResponse.data);
			setPendingPatients(pendingPatientsResponse.data);
			setAvailableRooms(availableRoomsResponse.data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const handleApproveDeny = async (patientId, isApproved) => {
		try {
			// Implement logic to approve/deny patient
			await axios.put(`/api/admin/approve-deny-patient/${patientId}`, {
				isApproved,
			});
			// Refresh pending patients data
			const updatedPendingPatients = pendingPatients.filter(
				(patient) => patient.id !== patientId
			);
			setPendingPatients(updatedPendingPatients);
		} catch (error) {
			console.error("Error approving/denying patient:", error);
		}
	};

	const handleRoomAssign = async (patientId, roomId) => {
		try {
			// Implement logic to assign patient to a room
			await axios.put(`/api/admin/assign-patient-to-room/${patientId}`, {
				roomId,
			});
			// Refresh available rooms data
			const updatedAvailableRooms = availableRooms.filter(
				(room) => room.id !== roomId
			);
			setAvailableRooms(updatedAvailableRooms);
		} catch (error) {
			console.error("Error assigning patient to room:", error);
		}
	};

	return (
		<div>
			<h1>Admin Dashboard</h1>
			<nav>
				<ul>
					<li>
						<Link to="manage-doctors">Manage Doctors</Link>
					</li>
					<li>
						<Link to="manage-patients">Manage Patients</Link>
					</li>
					<li>
						<Link to="approve-reject">Approve/Deny Patients</Link>
					</li>
					<li>
						<Link to="assign-patients">Assign Patients</Link>
					</li>
				</ul>
			</nav>

			{/* Add a trailing "*" to the parent Route path */}
			<Routes>
				<Route
					path="/manage-doctors"
					element={<ManageDoctors doctors={doctors} />}
				/>
				<Route
					path="/manage-patients"
					element={<ManagePatients patients={patients} />}
				/>
				<Route
					path="/approve-reject"
					element={
						<ApproveReject
							pendingPatients={pendingPatients}
							onApproveDeny={handleApproveDeny}
						/>
					}
				/>
				<Route
					path="/assign-patients"
					element={
						<AssignPatients
							availableRooms={availableRooms}
							onAssignPatient={handleRoomAssign}
						/>
					}
				/>
			</Routes>
		</div>
	);
};

export default Admin;
