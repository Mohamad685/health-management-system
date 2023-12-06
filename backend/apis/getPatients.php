<?php
header('Access-Controll-Allow-Origin:*');
include("connection.php");

$query = $mysqli->prepare('SELECT p.*, u.username, r.room_number 
                        FROM Patients p
                        JOIN Users u ON p.user_id = u.user_id
                        LEFT JOIN Rooms r ON p.room_id = r.room_id');


$query->execute();
$array = $query->get_result();
$response = [];

while ($patient = $array->fetch_assoc()) {
    $response[] = $patient;
}
echo json_encode($response);
