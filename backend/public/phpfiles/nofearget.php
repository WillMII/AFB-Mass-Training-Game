<?php
//session_start();

header("Access-Control-Allow-Origin: http://localhost:8000"); // or "*" for open access
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$conn = mysqli_connect('127.0.0.1', 'root', 'password', 'mass_training_database', 3306);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$email = $_POST["email"];
// Finds the user with the email 
$useridfind = "SELECT user_id FROM users WHERE email='". $email . "';";
$useridcheck = mysqli_query($conn, $useridfind) or die("2");

$useridfound = mysqli_fetch_assoc($useridcheck);
$userid = $useridfound["user_id"];

$check = mysqli_query($conn, "SELECT * FROM nofearprogress WHERE email='". $email . "';");
if (mysqli_num_rows($check) == 0) {
    // Adds in user email to stinfoprogress with an empty row
    mysqli_query($conn, "INSERT INTO nofearprogress (email) VALUES ('$email')");
}
// Forgive me if any php pros see this, I am only a novice.
$data = mysqli_fetch_assoc($check);
$clue1clicked = (int)$data["clue1clicked"];
$clue1completed = (int)$data["clue1completed"];
$clue2clicked = (int)$data["clue2clicked"];
$clue2completed = (int)$data["clue2completed"];
$clue3clicked = (int)$data["clue3clicked"];
$clue4clicked = (int)$data["clue4clicked"];
$clue4completed = (int)$data["clue4completed"];
$clue5clicked = (int)$data["clue5clicked"];
$clue5completed = (int)$data["clue5completed"];
$clue6clicked = (int)$data["clue6clicked"];
$clue7clicked = (int)$data["clue7clicked"];
$clue8clicked = (int)$data["clue8clicked"];
$clue9clicked = (int)$data["clue9clicked"];
$clue10clicked = (int)$data["clue10clicked"];
$clue11clicked = (int)$data["clue11clicked"];
$clue12clicked = (int)$data["clue12clicked"];
$clue13clicked = (int)$data["clue13clicked"];
$clue14clicked = (int)$data["clue14clicked"];
$clue15clicked = (int)$data["clue15clicked"];
$clue16clicked = (int)$data["clue16clicked"];
$clue17clicked = (int)$data["clue17clicked"];
$clue18clicked = (int)$data["clue18clicked"];
$quizcompleted = (int)$data["quizcompleted"];

echo "0\t" . $userid . 
"\t" . $clue1clicked . 
"\t" . $clue1completed . 
"\t" . $clue2clicked . 
"\t" . $clue2completed . 
"\t" . $clue3clicked . 
"\t" . $clue4clicked . 
"\t" . $clue4completed . 
"\t" . $clue5clicked . 
"\t" . $clue5completed . 
"\t" . $clue6clicked . 
"\t" . $clue7clicked . 
"\t" . $clue8clicked . 
"\t" . $clue9clicked . 
"\t" . $clue10clicked . 
"\t" . $clue11clicked . 
"\t" . $clue12clicked . 
"\t" . $clue13clicked . 
"\t" . $clue14clicked . 
"\t" . $clue15clicked . 
"\t" . $clue16clicked . 
"\t" . $clue17clicked . 
"\t" . $clue18clicked . 
"\t" . $quizcompleted;

?>