<?php

header("Access-Control-Allow-Origin: http://localhost:8000"); // or "*" for open access
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
    $conn = mysqli_connect('127.0.0.1', 'root', 'password', 'mass_training_database', 3306);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $email = $_POST["email"];
    $clue1clicked = (int)$_POST["clue1clicked"];
    $clue2clicked = (int)$_POST["clue2clicked"];
    $clue3clicked = (int)$_POST["clue3clicked"];
    $clue4clicked = (int)$_POST["clue4clicked"];
    $clue4completed = (int)$_POST["clue4completed"];
    $clue5clicked = (int)$_POST["clue5clicked"];
    $clue6clicked = (int)$_POST["clue6clicked"];
    $clue7clicked = (int)$_POST["clue7clicked"];
    $clue8clicked = (int)$_POST["clue8clicked"];
    $clue8completed = (int)$_POST["clue8completed"];
    $clue9clicked = (int)$_POST["clue9clicked"];
    $clue10clicked = (int)$_POST["clue10clicked"];
    $clue11clicked = (int)$_POST["clue11clicked"];
    $quizcompleted = (int)$_POST["quizcompleted"];

    $emailquery = "SELECT email FROM stinfoprogress WHERE email='". $email . "';";
    
    // Making sure that the email does exist
    $emailcheck = mysqli_query($conn, $emailquery) or die("1");

    $updatequery = "UPDATE stinfoprogress SET clue1clicked = $clue1clicked, 
    clue2clicked = $clue2clicked, 
    clue3clicked = $clue3clicked, 
    clue4clicked = $clue4clicked, 
    clue4completed = $clue4completed, 
    clue5clicked = $clue5clicked, 
    clue6clicked = $clue6clicked, 
    clue7clicked = $clue7clicked, 
    clue8clicked = $clue8clicked, 
    clue8completed = $clue8completed, 
    clue9clicked = $clue9clicked, 
    clue10clicked = $clue10clicked, 
    clue11clicked = $clue11clicked,
    quizcompleted = $quizcompleted 
    WHERE email = '$email'";

    mysqli_query($conn, $updatequery) or die("2: Error updating data");

    echo "0";


?>