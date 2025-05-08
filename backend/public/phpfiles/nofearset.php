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
    $clue1completed = (int)$_POST["clue1completed"];
    $clue2clicked = (int)$_POST["clue2clicked"];
    $clue2completed = (int)$_POST["clue2completed"];
    $clue3clicked = (int)$_POST["clue3clicked"];
    $clue4clicked = (int)$_POST["clue4clicked"];
    $clue4completed = (int)$_POST["clue4completed"];
    $clue5clicked = (int)$_POST["clue5clicked"];
    $clue5completed = (int)$_POST["clue5completed"];
    $clue6clicked = (int)$_POST["clue6clicked"];
    $clue7clicked = (int)$_POST["clue7clicked"];
    $clue8clicked = (int)$_POST["clue8clicked"];
    $clue9clicked = (int)$_POST["clue9clicked"];
    $clue10clicked = (int)$_POST["clue10clicked"];
    $clue11clicked = (int)$_POST["clue11clicked"];
    $clue12clicked = (int)$_POST["clue12clicked"];
    $clue13clicked = (int)$_POST["clue13clicked"];
    $clue14clicked = (int)$_POST["clue14clicked"];
    $clue15clicked = (int)$_POST["clue15clicked"];
    $clue16clicked = (int)$_POST["clue16clicked"];
    $clue17clicked = (int)$_POST["clue17clicked"];
    $clue18clicked = (int)$_POST["clue18clicked"];
    $quizcompleted = (int)$_POST["quizcompleted"];

    $emailquery = "SELECT email FROM nofearprogress WHERE email='". $email . "';";
    
    // Making sure that the email does exist
    $emailcheck = mysqli_query($conn, $emailquery) or die("1");

    $updatequery = "UPDATE nofearprogress SET clue1clicked = $clue1clicked,
    clue1completed = $clue1completed,  
    clue2clicked = $clue2clicked, 
    clue2completed = $clue2completed, 
    clue3clicked = $clue3clicked, 
    clue4clicked = $clue4clicked, 
    clue4completed = $clue4completed, 
    clue5clicked = $clue5clicked, 
    clue5completed = $clue5completed, 
    clue6clicked = $clue6clicked, 
    clue7clicked = $clue7clicked, 
    clue8clicked = $clue8clicked, 
    clue9clicked = $clue9clicked, 
    clue10clicked = $clue10clicked, 
    clue11clicked = $clue11clicked,
    clue12clicked = $clue12clicked,
    clue13clicked = $clue13clicked,
    clue14clicked = $clue14clicked,
    clue15clicked = $clue15clicked,
    clue16clicked = $clue16clicked,
    clue17clicked = $clue17clicked,
    clue18clicked = $clue18clicked,
    quizcompleted = $quizcompleted 
    WHERE email = '$email'";

    mysqli_query($conn, $updatequery) or die("2: Error updating data");

    echo "0";


?>