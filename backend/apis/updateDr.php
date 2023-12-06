<?php
include 'connection.php';

if (isset($_POST['doctor_id'], $_POST['full_name'], $_POST['specialty'], $_POST['user_id'])) {
    $doctor_id = mysqli_real_escape_string($mysqli, $_POST['doctor_id']);
    $full_name = mysqli_real_escape_string($mysqli, $_POST['full_name']);
    $specialty = mysqli_real_escape_string($mysqli, $_POST['specialty']);
    $user_id = mysqli_real_escape_string($mysqli, $_POST['user_id']);

    $query = "UPDATE doctors 
              SET full_name = '$full_name', specialty = '$specialty', user_id = $user_id
              WHERE doctor_id = $doctor_id";

    if (mysqli_query($mysqli, $query)) {
        header('Content-Type: application/json');
        echo json_encode(["success" => true]);
    } else {
        header('Content-Type: application/json');
        echo json_encode(["error" => "Error updating doctor"]);
    }
} else {
    header('Content-Type: application/json');
    echo json_encode(["error" => "Missing required parameters"]);
}
?>
