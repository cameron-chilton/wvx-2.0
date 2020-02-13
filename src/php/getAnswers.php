<?php

// connect script
require 'connect.php';
// json encoder
require 'json_readable_encode.php';

/* passed params */
$ansCat = $_GET['ansCat'];

// query

$sql = "SELECT *
  FROM voices
  WHERE (category = 'Music/Arts')
  OR (category = 'Sports')
  ORDER BY rand()
  LIMIT 5";

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

