<?php
include 'connection.php';

// Retrieve patients from the database
$query = "SELECT * FROM patients";
$result = mysqli_query($mysqli, $query);

$patients = mysqli_fetch_all($result, MYSQLI_ASSOC);

header('Content-Type: application/json');
echo json_encode($patients);
?>
