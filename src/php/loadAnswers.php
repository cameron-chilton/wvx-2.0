<?php

// connect script
require 'connect.php';
// json encoder
require 'json_readable_encode.php';

/* passed params */

//$ansID = $_GET['ansID'];
//$ansCat = $_GET['ansCat'];
//$ansGndr = $_GET['ansGndr'];
//$ansAcnt = $_GET['ansAcnt'];
//$ansRace = $_GET['ansRace'];
//$ansDob = $_GET['ansDob'];

// query

$sql = "SELECT ID, CATEGORY, GENDER, ACCENT, RACE, DOB FROM voices
  WHERE (category = 'Movies/TV')
  OR (category = 'Music/Arts')
  OR (category = 'News/Politics')
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
