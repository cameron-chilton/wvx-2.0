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

$finalArr = Array();
  // query array
  foreach($DB->query("
  (SELECT DISTINCT
    id, firstname, lastname, clip_name, pic FROM voices
    WHERE CATEGORY = '$ctgy' AND GENDER = '$gndr' AND ACCENT = '$acnt' AND RACE = '$race' AND DOB = '$DOB'
    AND ID NOT LIKE '$ansID'
    AND firstname NOT LIKE '$frstNm'
    AND lastname NOT LIKE '$lastNm'
    ORDER BY RAND() LIMIT 4)
    UNION (SELECT id, firstname, lastname, clip_name, pic FROM voices WHERE ID = '$ansID')") as $newRow) {
    // return values in array
    $newArr = array("ID"=>$newRow[0], "FIRSTNAME"=>$newRow[1], "LASTNAME"=>$newRow[2], "CLIP_NAME"=>$newRow[3], "PIC"=>base64_encode($newRow[4]));
    array_push($finalArr, $newArr);
}

// encode result as array
$json = json_encode($finalArr);
echo $json;

// close db conn
$DB = null;

?>
