<?php
include 'connection.php';

// Check if required parameters are provided in the request
if (isset($_POST['patient_id'], $_POST['full_name'], $_POST['user_id'], $_POST['room_id'], $_POST['age'], $_POST['password'])) {
    $patient_id = mysqli_real_escape_string($mysqli, $_POST['patient_id']);
    $full_name = mysqli_real_escape_string($mysqli, $_POST['full_name']);
    $user_id = mysqli_real_escape_string($mysqli, $_POST['user_id']);
    $room_id = mysqli_real_escape_string($mysqli, $_POST['room_id']);
    $age = mysqli_real_escape_string($mysqli, $_POST['age']);
    $password = mysqli_real_escape_string($mysqli, $_POST['password']);

    // Update the patient in the patients table
    $query = "UPDATE patients 
              SET full_name = '$full_name', user_id = $user_id, room_id = $room_id, age = $age, password = '$password'
              WHERE patient_id = $patient_id";

    if (mysqli_query($mysqli, $query)) {
        header('Content-Type: application/json');
        echo json_encode(["success" => true]);
    } else {
        header('Content-Type: application/json');
        echo json_encode(["error" => "Error updating patient"]);
    }
} else {
    header('Content-Type: application/json');
    echo json_encode(["error" => "Missing required parameters"]);
}
?>
