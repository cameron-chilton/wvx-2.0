<?php

// connect script
require 'connect.php';

/* passed params */
$ansID = $_GET['ansID'];
$frstNm = $_GET['frstNm'];
$lastNm = $_GET['lastNm'];
$ctgy = $_GET['ctgy'];
$gndr = $_GET['gndr'];
$acnt = $_GET['acnt'];
$race = $_GET['race'];
$DOB = $_GET['dob'];

// query array
$sql = "
(SELECT DISTINCT
  id, firstname, lastname, clip_name FROM voices
  WHERE CATEGORY = '$ctgy' AND GENDER = '$gndr' AND ACCENT = '$acnt' AND RACE = '$race' AND DOB = '$DOB'
  AND ID NOT LIKE '$ansID'
  AND firstname NOT LIKE '$frstNm'
  AND lastname NOT LIKE '$lastNm'
  ORDER BY RAND() LIMIT 4)
UNION (SELECT id, firstname, lastname, clip_name FROM voices WHERE ID = '$ansID')";

$data = Array();
$stmt = $DB->prepare($sql);
$stmt->execute();
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

// encode result as array
$json = json_encode($data);

echo $json;

// close db conn
$DB = null;

?>
