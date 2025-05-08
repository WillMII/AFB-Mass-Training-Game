<?php

header("Access-Control-Allow-Origin: http://localhost:8000"); // or "*" for open access
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

    $conn = mysqli_connect('localhost', 'root', 'password', 'Mass_Training_Database', 3306);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $user_id = (int)$_POST["user_id"];
    $module_id = (int)$_POST["module_id"];
    $progress = round((float)$_POST["progress"]);
    $date_complete = trim($_POST["date_complete"]);
    $stage = (int)$_POST["stage"];

    $progress_query = "SELECT * FROM game_progress WHERE user_id='". $user_id . "' AND module_id='". $module_id . "';";

    $check = mysqli_query($conn, $progress_query) or die("1");
    if (mysqli_num_rows($check) == 0) {
        // Adds in user email to stinfoprogress with an empty row
        mysqli_query($conn, "INSERT INTO game_progress (user_id, module_id, stage) VALUES ('$user_id', '$module_id', '$stage')");
}

    if ($date_complete === '' ){
        $dateValue = "NULL";
    } else {
        $dateValue = "'" . mysqli_real_escape_string($conn, $date_complete) . "'";
    }

    $updatequery = "UPDATE game_progress SET progress = $progress, 
    date_completed = $dateValue
    WHERE user_id='". $user_id . "' AND module_id='". $module_id . "';";

    mysqli_query($conn, $updatequery) or die("2: Error updating data");

    echo "0";


?>