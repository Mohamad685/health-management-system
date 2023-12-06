<?php

include 'connection.php';

if (isset($_GET['patient_id'])) {
    $patient_id = $_GET['patient_id'];

    $query = "SELECT appointments.appointment_id, appointments.appointment_date, doctors.full_name AS doctor_name, appointments.status
              FROM appointments
              INNER JOIN doctors ON appointments.doctor_id = doctors.doctor_id
              WHERE appointments.patient_id = $patient_id
              AND appointments.appointment_date > NOW()
              ORDER BY appointments.appointment_date";

    $result = mysqli_query($mysqli, $query);

    if ($result) {
        $appointments = mysqli_fetch_all($result, MYSQLI_ASSOC);

        header('Content-Type: application/json');
        echo json_encode($appointments);
    } else {
        header('Content-Type: application/json');
        echo json_encode(["error" => "Error fetching upcoming appointments"]);
    }
} else {
    header('Content-Type: application/json');
    echo json_encode(["error" => "Missing patient ID"]);
}

?>
