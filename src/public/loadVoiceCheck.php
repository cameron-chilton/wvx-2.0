<?php
	// PDO connect
	$Username = 'thinkagain';
	$Password = '89*Stanza';
	try {
	    $DB = new PDO('mysql:host=localhost;dbname=whovox_db', $Username, $Password);
	    $DB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	    }
	    catch(PDOException $e) {
		    echo 'ERROR: ' . $e->getMessage();
		    }
	// ID to search against
	$frstNm = $_GET['firstname'];
	$lastNm = $_GET['lastname'];
	/* voice question row */
	$stmt1 = $DB->query("SELECT * FROM voices WHERE FIRSTNAME = '".$frstNm."' AND LASTNAME = '".$lastNm."' ORDER BY RAND() LIMIT 1");
	$qRow = $stmt1->fetch();
	// return value
	$qArr = array( $qRow[0]);
	foreach($qArr as $a) echo $a;
	// close db conn
	$DB = null;
?>