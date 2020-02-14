<?php

// connect script
require 'connect.php';
// json encoder
require 'json_readable_encode.php';

/* get 5 answers from DB */

$sql = "SELECT ID, CATEGORY, GENDER, ACCENT, RACE, DOB FROM voices WHERE CATEGORY='Movies/TV' ORDER BY RAND() LIMIT 5";

$data = Array();

$stmt = $DB->prepare($sql);
$stmt->execute();
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

// send result to encoder
$json = json_readable_encode($data);

echo $json;

// close db conn
$DB = null;

?>