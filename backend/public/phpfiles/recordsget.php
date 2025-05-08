<?php
//session_start();

header("Access-Control-Allow-Origin: http://localhost:8000"); // or "*" for open access
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$conn = mysqli_connect('localhost', 'root', 'password', 'Mass_Training_Database', 3306);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$email = $_POST["email"];
// Finds the user with the email 
$useridfind = "SELECT user_id FROM users WHERE email='". $email . "';";
$useridcheck = mysqli_query($conn, $useridfind) or die("2");

$useridfound = mysqli_fetch_assoc($useridcheck);
$userid = $useridfound["user_id"];

$check = mysqli_query($conn, "SELECT * FROM recordsprogress WHERE email='". $email . "';");
if (mysqli_num_rows($check) == 0) {
    // Adds in user email to stinfoprogress with an empty row
    mysqli_query($conn, "INSERT INTO recordsprogress (email) VALUES ('$email')");
}
// Forgive me if any php pros see this, I am only a novice.
$data = mysqli_fetch_assoc($check);
$clue1clicked = (int)$data["clue1clicked"];
$clue2clicked = (int)$data["clue2clicked"];
$clue2completed = (int)$data["clue2completed"];
$clue3clicked = (int)$data["clue3clicked"];
$clue4clicked = (int)$data["clue4clicked"];
$clue4completed = (int)$data["clue4completed"];
$clue5clicked = (int)$data["clue5clicked"];
$clue6clicked = (int)$data["clue6clicked"];
$clue7clicked = (int)$data["clue7clicked"];
$clue8clicked = (int)$data["clue8clicked"];
$clue8completed = (int)$data["clue8completed"];
$quizcompleted = (int)$data["quizcompleted"];

echo "0\t" . $userid . 
"\t" . $clue1clicked . 
"\t" . $clue2clicked . 
"\t" . $clue2completed . 
"\t" . $clue3clicked . 
"\t" . $clue4clicked . 
"\t" . $clue4completed . 
"\t" . $clue5clicked . 
"\t" . $clue6clicked . 
"\t" . $clue7clicked . 
"\t" . $clue8clicked . 
"\t" . $clue8completed . 
"\t" . $quizcompleted;

?>