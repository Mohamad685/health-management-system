<?php
include 'connection.php';

if (isset($_POST['patient_id']) && isset($_POST['doctor_id']) && isset($_POST['appointment_date'])) {
    $patient_id = $_POST['patient_id'];
    $doctor_id = $_POST['doctor_id'];
    $appointment_date = $_POST['appointment_date'];

    // Insert a new appointment into the database
    $query = "INSERT INTO appointments (patient_id, doctor_id, appointment_date, status)
              VALUES ($patient_id, $doctor_id, '$appointment_date', 'Scheduled')";

    $result = mysqli_query($mysqli, $query);

    if ($result) {
        header('Content-Type: application/json');
        echo json_encode(["message" => "Appointment booked successfully"]);
    } else {
        header('Content-Type: application/json');
        echo json_encode(["error" => "Error booking appointment"]);
    }
} else {
    header('Content-Type: application/json');
    echo json_encode(["error" => "Missing parameters"]);
}

?>
