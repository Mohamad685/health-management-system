import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageDoctors = () => {
	const [doctors, setDoctors] = useState([]);

	useEffect(() => {
		axios
			.get("/api/admin/doctors")
			.then((response) => {
				setDoctors(response.data);
			})
			.catch((error) => {
				console.error("Error fetching doctors:", error);
			});
	}, []);

	return (
		<div>
			<h2>Manage Doctors</h2>
			<ul>
				{Array.isArray(doctors) &&
					doctors.map((doctor) => <li key={doctor.id}>{doctor.name}</li>)}
			</ul>
		</div>
	);
};

export default ManageDoctors;
