<?php
include 'connection.php';

if (isset($_POST['request_id'], $_POST['status'])) {
    $request_id = mysqli_real_escape_string($mysqli, $_POST['request_id']);
    $status = mysqli_real_escape_string($mysqli, $_POST['status']);

    $query = "UPDATE emergencyroomrequests SET status = '$status' WHERE request_id = $request_id";

    if (mysqli_query($mysqli, $query)) {
        header('Content-Type: application/json');
        echo json_encode(["success" => true]);
    } else {
        header('Content-Type: application/json');
        echo json_encode(["error" => "Error updating emergency room request"]);
    }
} else {
    header('Content-Type: application/json');
    echo json_encode(["error" => "Missing required parameters"]);
}
?>
