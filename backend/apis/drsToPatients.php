<?php
include 'connection.php';

// Check if doctor_id and patient_id are provided in the request
if (isset($_POST['doctor_id'], $_POST['patient_id'])) {
    $doctor_id = mysqli_real_escape_string($mysqli, $_POST['doctor_id']);
    $patient_id = mysqli_real_escape_string($mysqli, $_POST['patient_id']);
    $query = "INSERT INTO doctorpatientsassign (doctor_id, patient_id) VALUES ($doctor_id, $patient_id)";

    if (mysqli_query($mysqli, $query)) {
        header('Content-Type: application/json');
        echo json_encode(["success" => true]);
    } else {
        header('Content-Type: application/json');
        echo json_encode(["error" => "Error assigning doctor to patient"]);
    }
} else {
    header('Content-Type: application/json');
    echo json_encode(["error" => "Missing doctor ID or patient ID"]);
}

?>
