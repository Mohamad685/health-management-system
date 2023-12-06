<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
include("connection.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $loginData = json_decode(file_get_contents('php://input'), true);

    // Fetch doctor ID, full name, and password from the database
    $doctorUsername = $loginData['username'];
    $stmt = $pdo->prepare("SELECT doctor_id, full_name, password FROM doctors WHERE full_name = ?");
    $stmt->execute([$doctorUsername]);
    $doctorData = $stmt->fetch(PDO::FETCH_ASSOC);

    $adminUsername = 'Mohamad';
    $adminPasswordHash = password_hash('fakih', PASSWORD_DEFAULT);

    $patientUsername = $loginData['username'];
    $stmt = $pdo->prepare("SELECT patient_id, full_name, password FROM patients WHERE full_name = ?");
    $stmt->execute([$patientUsername]);
    $patientData = $stmt->fetch(PDO::FETCH_ASSOC);

    // Check if the provided credentials match admin, doctor, or patient
    if ($loginData['username'] === $adminUsername && password_verify($loginData['password'], $adminPasswordHash)) {
        $response = ['success' => 'Admin authenticated successfully', 'role' => 'Admin'];
    } 
    elseif ($doctorData && password_verify($loginData['password'], $doctorData['password'])) {
        $response = ['success' => 'Doctor authenticated successfully', 'role' => 'Doctor', 'doctor_id' => $doctorData['doctor_id']];
    } 
    elseif ($patientData && password_verify($loginData['password'], $patientData['password'])) {
        $response = ['success' => 'Patient authenticated successfully', 'role' => 'Patient', 'patient_id' => $patientData['patient_id']];
    } 
    else {
        $response = ['error' => 'Invalid username or password'];
    }

    echo json_encode($response);
}
?>
