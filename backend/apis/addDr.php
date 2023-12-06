<?php
include 'connection.php';

if (isset($_POST['full_name'], $_POST['specialty'], $_POST['user_id'])) {
    $full_name = mysqli_real_escape_string($mysqli, $_POST['full_name']);
    $specialty = mysqli_real_escape_string($mysqli, $_POST['specialty']);
    $user_id = mysqli_real_escape_string($mysqli, $_POST['user_id']);

    $query = "INSERT INTO doctors (full_name, specialty, user_id) 
              VALUES ('$full_name', '$specialty', $user_id)";

    if (mysqli_query($mysqli, $query)) {
        header('Content-Type: application/json');
        echo json_encode(["success" => true]);
    } else {
        header('Content-Type: application/json');
        echo json_encode(["error" => "Error creating doctor"]);
    }
} else {
    header('Content-Type: application/json');
    echo json_encode(["error" => "Missing required parameters"]);
}
?>
