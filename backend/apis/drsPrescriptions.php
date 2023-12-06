<?php
include 'connection.php';

// Check if required parameters are provided in the request
if (isset($_POST['doctor_id'], $_POST['patient_id'], $_POST['medication_name'], $_POST['dosage'])) {
    $doctor_id = mysqli_real_escape_string($mysqli, $_POST['doctor_id']);
    $patient_id = mysqli_real_escape_string($mysqli, $_POST['patient_id']);
    $medication_name = mysqli_real_escape_string($mysqli, $_POST['medication_name']);
    $dosage = mysqli_real_escape_string($mysqli, $_POST['dosage']);

    // Insert the prescription into the medications table
    $query = "INSERT INTO medications (doctor_id, patient_id, medication_name, dosage, prescription_date) 
              VALUES ($doctor_id, $patient_id, '$medication_name', '$dosage', NOW())";

    if (mysqli_query($mysqli, $query)) {
        header('Content-Type: application/json');
        echo json_encode(["success" => true]);
    } else {
        header('Content-Type: application/json');
        echo json_encode(["error" => "Error prescribing medication"]);
    }
} else {
    header('Content-Type: application/json');
    echo json_encode(["error" => "Missing required parameters"]);
}

?>
