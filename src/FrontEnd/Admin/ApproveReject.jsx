import React, { useState, useEffect } from "react";
import axios from "axios";

const ApproveReject = () => {
	const [pendingPatients, setPendingPatients] = useState([]);

	useEffect(() => {
		// Fetch pending patients data from the API
		axios
			.get("/api/admin/pending-patients")
			.then((response) => {
				setPendingPatients(response.data);
			})
			.catch((error) => {
				console.error("Error fetching pending patients:", error);
			});
	}, []);

	const handleApproveDeny = (patientId, isApproved) => {
		// Implement logic to approve/deny patient
		// Send a request to the API to update the approval status
		// Reload the pending patients data
	};

	return (
		<div>
			<h2>Approve/Deny Patients</h2>
			<ul>
				{Array.isArray(pendingPatients) &&
					pendingPatients.map((patient) => (
						<li key={patient.id}>
							{patient.name}
							<button onClick={() => handleApproveDeny(patient.id, true)}>
								Approve
							</button>
							<button onClick={() => handleApproveDeny(patient.id, false)}>
								Deny
							</button>
						</li>
					))}
			</ul>
		</div>
	);
};

export default ApproveReject;
