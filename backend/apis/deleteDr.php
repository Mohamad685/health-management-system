<?php
include 'connection.php';

// Check if required parameters are provided in the request
if (isset($_POST['doctor_id'])) {
    $doctor_id = mysqli_real_escape_string($mysqli, $_POST['doctor_id']);

    // Delete the doctor from the doctors table
    $query = "DELETE FROM doctors WHERE doctor_id = $doctor_id";

    if (mysqli_query($mysqli, $query)) {
        header('Content-Type: application/json');
        echo json_encode(["success" => true]);
    } else {
        header('Content-Type: application/json');
        echo json_encode(["error" => "Error deleting doctor"]);
    }
} else {
    header('Content-Type: application/json');
    echo json_encode(["error" => "Missing required parameters"]);
}
?>
