<?php

// connect script
require 'connect.php';
// json encoder
require 'json_readable_encode.php';

/* passed params */

$ansID = $_GET['ansID'];
$ansCat = $_GET['ansCat'];
$ansGndr = $_GET['ansGndr'];
$ansAcnt = $_GET['ansAcnt'];
$ansRace = $_GET['ansRace'];
$ansDob = $_GET['ansDob'];

// query

$sql = "SELECT * FROM
        (SELECT ID, CATEGORY, GENDER, ACCENT, FIRSTNAME, LASTNAME, TIMES_ASKED, TIMES_RIGHT, CLIP_NAME, RACE, DOB 
        FROM voices 
        WHERE CATEGORY='$ansCat' AND GENDER='$ansGndr' AND ACCENT='$ansAcnt' AND RACE='$ansRace' AND DOB='$ansDob'
        ORDER BY (ID='$ansID')
        DESC, RAND() LIMIT 0,5) AS v2
    ORDER BY RAND() LIMIT 5";

$data = Array();

$stmt = $DB->prepare($sql);
$stmt->execute();
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

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