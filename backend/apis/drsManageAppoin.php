<?php
include 'connection.php';

if (isset($_POST['doctor_id'], $_POST['appointment_date'], $_POST['status'])) {
    $doctor_id = mysqli_real_escape_string($mysqli, $_POST['doctor_id']);
    $appointment_date = mysqli_real_escape_string($mysqli, $_POST['appointment_date']);
    $status = mysqli_real_escape_string($mysqli, $_POST['status']);

    // Insert the appointment into the doctor's calendar
    $query = "INSERT INTO calendar (doctor_id, appointment_date, status) 
              VALUES ($doctor_id, '$appointment_date', '$status')";

    if (mysqli_query($mysqli, $query)) {
        header('Content-Type: application/json');
        echo json_encode(["success" => true]);
    } else {
        header('Content-Type: application/json');
        echo json_encode(["error" => "Error adding appointment to the calendar"]);
    }
} elseif (isset($_GET['doctor_id'])) {
    $doctor_id = mysqli_real_escape_string($mysqli, $_GET['doctor_id']);

    $query = "SELECT * FROM calendar WHERE doctor_id = $doctor_id";

    $result = mysqli_query($mysqli, $query);

    if ($result) {
        $appointments = [];

        while ($row = mysqli_fetch_assoc($result)) {
            $appointments[] = $row;
        }

        header('Content-Type: application/json');
        echo json_encode(["success" => true, "appointments" => $appointments]);
    } else {
        header('Content-Type: application/json');
        echo json_encode(["error" => "Error retrieving appointments"]);
    }
} elseif (isset($_DELETE['appointment_id'])) {
    $appointment_id = mysqli_real_escape_string($mysqli, $_DELETE['appointment_id']);

    $query = "DELETE FROM calendar WHERE appointment_id = $appointment_id";

    if (mysqli_query($mysqli, $query)) {
        header('Content-Type: application/json');
        echo json_encode(["success" => true]);
    } else {
        header('Content-Type: application/json');
        echo json_encode(["error" => "Error deleting appointment from the calendar"]);
    }
} else {
    header('Content-Type: application/json');
    echo json_encode(["error" => "Missing required parameters"]);
}

?>
