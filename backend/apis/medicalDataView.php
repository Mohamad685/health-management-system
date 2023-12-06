<?php
include 'connection.php';

// Check if patient_id is provided in the request
if (isset($_GET['patient_id'])) {
    $patient_id = $_GET['patient_id'];

    $query = "SELECT m.*, d.full_name AS doctor_name 
              FROM medications m
              JOIN doctors d ON m.doctor_id = d.doctor_id
              WHERE m.patient_id = $patient_id";

    $result = $mysqli->query($query);

    // Check if the query was successful
    if ($result) {
        $medical_history = $result->fetch_all(MYSQLI_ASSOC);

        // Fetch upcoming appointments
        $query = "SELECT a.*, d.full_name AS doctor_name 
                  FROM appointments a
                  JOIN doctors d ON a.doctor_id = d.doctor_id
                  WHERE a.patient_id = $patient_id AND a.appointment_date > NOW()";

        $result = $mysqli->query($query);

        if ($result) {
            $upcoming_appointments = $result->fetch_all(MYSQLI_ASSOC);

            // Combine medical history and appointments
            $response = [
                'medical_history' => $medical_history,
                'upcoming_appointments' => $upcoming_appointments,
            ];

            header('Content-Type: application/json');
            echo json_encode($response);
        } else {
            echo json_encode(['error' => $mysqli->error]);
        }
    } else {
        echo json_encode(['error' => $mysqli->error]);
    }
} else {
    echo json_encode(['error' => 'Missing patient_id parameter']);
}

$mysqli->close();

?>
