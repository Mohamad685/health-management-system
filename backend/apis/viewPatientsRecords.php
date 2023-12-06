<?php

include 'connection.php';

// Check if patient_id is provided in the request
if (isset($_GET['patient_id'])) {
    $patient_id = $_GET['patient_id'];

    // Retrieve patient records for the specified patient
    $query = "SELECT patients.full_name AS patient_name, patients.age, medications.medication_name, medications.dosage, medications.prescription_date
              FROM medications
              INNER JOIN patients ON medications.patient_id = patients.patient_id
              WHERE patients.patient_id = $patient_id
              ORDER BY medications.prescription_date DESC";

    $result = mysqli_query($mysqli, $query);

    if ($result) {
        $patientRecords = mysqli_fetch_all($result, MYSQLI_ASSOC);
        header('Content-Type: application/json');
        echo json_encode($patientRecords);
    } else {
        header('Content-Type: application/json');
        echo json_encode(["error" => "Error fetching patient records"]);
    }
} else {
    header('Content-Type: application/json');
    echo json_encode(["error" => "Missing patient ID"]);
}

?>
