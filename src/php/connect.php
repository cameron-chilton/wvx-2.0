<?php

header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');

// PDO connect
$servername = 'localhost:3306';
$username = 'root';
$password = '91*Stanza';

try {
    $DB = new PDO("mysql:host=$servername;dbname=whovox_db", $username, $password);
    // set the PDO error mode to exception
    $DB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //echo "Connected successfully";
    }
catch(PDOException $e)
    {
    echo "Connection failed: " . $e->getMessage();
    }


?>

