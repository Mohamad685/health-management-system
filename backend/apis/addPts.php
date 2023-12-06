<?php
include 'connection.php';

if (isset($_POST['full_name'], $_POST['user_id'], $_POST['room_id'], $_POST['age'], $_POST['password'])) {
    $full_name = mysqli_real_escape_string($mysqli, $_POST['full_name']);
    $user_id = mysqli_real_escape_string($mysqli, $_POST['user_id']);
    $room_id = mysqli_real_escape_string($mysqli, $_POST['room_id']);
    $age = mysqli_real_escape_string($mysqli, $_POST['age']);
    $password = mysqli_real_escape_string($mysqli, $_POST['password']);

    $query = "INSERT INTO patients (full_name, user_id, room_id, age, password) 
              VALUES ('$full_name', $user_id, $room_id, $age, '$password')";

    if (mysqli_query($mysqli, $query)) {
        header('Content-Type: application/json');
        echo json_encode(["success" => true]);
    } else {
        header('Content-Type: application/json');
        echo json_encode(["error" => "Error creating patient"]);
    }
} else {
    header('Content-Type: application/json');
    echo json_encode(["error" => "Missing required parameters"]);
}
?>
