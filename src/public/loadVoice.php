<?php
	// connect script
  require 'connect.php';
	// ID to search against
	$frstNm = $_GET['firstname'];
	$lastNm = $_GET['lastname'];
	/* voice question row */
	$stmt1 = $DB->query("SELECT * FROM voices WHERE FIRSTNAME = '".$frstNm."' AND LASTNAME = '".$lastNm."' ORDER BY RAND() LIMIT 1");
	$qRow = $stmt1->fetch();
	// right answer encode pic
	$pic = base64_encode($qRow[6]);
	// return values in array
	$qArr = array( $qRow[0], $qRow[1], $qRow[2], $qRow[3], $qRow[4], $qRow[5], $pic, $qRow[7], $qRow[8], $qRow[9], $qRow[10], $qRow[11]);
	foreach($qArr as $a) echo $a."||";
	// close db conn
	$DB = null;
?>
