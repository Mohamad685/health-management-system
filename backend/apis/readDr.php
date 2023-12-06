<?php
include 'connection.php';

// Retrieve doctors from the database
$query = "SELECT * FROM doctors";
$result = mysqli_query($mysqli, $query);

$doctors = mysqli_fetch_all($result, MYSQLI_ASSOC);

header('Content-Type: application/json');
echo json_encode($doctors);
?>
