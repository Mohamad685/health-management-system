<?php
include 'connection.php';

// Check if required parameters are provided in the request
if (isset($_POST['patient_id'])) {
    $patient_id = mysqli_real_escape_string($mysqli, $_POST['patient_id']);

    // Delete the patient from the patients table
    $query = "DELETE FROM patients WHERE patient_id = $patient_id";

    if (mysqli_query($mysqli, $query)) {
        header('Content-Type: application/json');
        echo json_encode(["success" => true]);
    } else {
        header('Content-Type: application/json');
        echo json_encode(["error" => "Error deleting patient"]);
    }
} else {
    header('Content-Type: application/json');
    echo json_encode(["error" => "Missing required parameters"]);
}
?>
