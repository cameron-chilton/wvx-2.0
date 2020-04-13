<?php
require 'connect.php';

/* passed params */
$id = $_GET['id'];
$score = $_GET['score'];
$name = $_GET['name'];
$location = $_GET['location'];

// insert game
$sql = "INSERT INTO finished_games () VALUES ('$id', now(), '$score', '$name', '$location')";

$stmt = $DB->prepare($sql);
$stmt->execute();

echo 44;

// close db conn
$DB = null;

?>
