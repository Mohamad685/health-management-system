<?php
include 'connection.php';

if (isset($_POST['appointment_id'])) {
    $appointment_id = $_POST['appointment_id'];

    // Update the status of the appointment to 'Canceled'
    $query = "UPDATE appointments SET status = 'Canceled' WHERE appointment_id = $appointment_id";

    $result = mysqli_query($mysqli, $query);

    if ($result) {
        header('Content-Type: application/json');
        echo json_encode(["message" => "Appointment canceled successfully"]);
    } else {
        header('Content-Type: application/json');
        echo json_encode(["error" => "Error canceling appointment"]);
    }
} else {
    header('Content-Type: application/json');
    echo json_encode(["error" => "Missing appointment ID"]);
}

?>
