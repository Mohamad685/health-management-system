<?php
// Include your database connection here
include 'connection.php';

// Check if required parameters are provided in the request
if (isset($_POST['patient_id'], $_POST['room_id'])) {
    $patient_id = mysqli_real_escape_string($mysqli, $_POST['patient_id']);
    $room_id = mysqli_real_escape_string($mysqli, $_POST['room_id']);

    $checkRoomQuery = "SELECT room_status FROM rooms WHERE room_id = $room_id";
    $result = mysqli_query($mysqli, $checkRoomQuery);

    if ($result) {
        $row = mysqli_fetch_assoc($result);
        $roomStatus = $row['room_status'];

        if ($roomStatus === '0') {
            // Update the room status to occupied
            $updateRoomQuery = "UPDATE rooms SET room_status = '1' WHERE room_id = $room_id";
            mysqli_query($mysqli, $updateRoomQuery);

            // Update the patient's room_id in the patients table
            $updatePatientQuery = "UPDATE patients SET room_id = $room_id WHERE patient_id = $patient_id";
            mysqli_query($mysqli, $updatePatientQuery);

            header('Content-Type: application/json');
            echo json_encode(["success" => true]);
        } else {
            header('Content-Type: application/json');
            echo json_encode(["error" => "Selected room is already occupied"]);
        }
    } else {
        header('Content-Type: application/json');
        echo json_encode(["error" => "Error checking room status"]);
    }
} else {
    header('Content-Type: application/json');
    echo json_encode(["error" => "Missing required parameters"]);
}
?>
