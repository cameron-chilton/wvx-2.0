<?php

// connect script
require 'connect.php';
// json encoder
require 'json_readable_encode.php';

/* voice question row */

$sql = "SELECT id, category, firstname, lastname, clip_name FROM voices ORDER BY RAND() LIMIT 4";

$data = Array();

$stmt = $DB->prepare($sql);
$stmt->execute();
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

//var_dump($data);
//$json = json_encode($data);

// send result to encoder
$json = json_readable_encode($data);

echo $json;


/* voice question row 
$stmt1 = $DB->query("SELECT * FROM voices ORDER BY RAND() LIMIT 1");
$qRow = $stmt1->fetch();
// right answer encode pic
$pic = base64_encode($qRow[6]);
// return values in array
$qArr = array( $qRow[0], $qRow[1], $qRow[2], $qRow[3], $qRow[4], $qRow[5], $pic, $qRow[7], $qRow[8], $qRow[9], $qRow[10], $qRow[11]);
foreach($qArr as $a) echo $a."||";
*/

// close db conn
$DB = null;

?>