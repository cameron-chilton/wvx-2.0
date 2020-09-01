<?php

	// connect script
  require 'connect.php';

	// ID to search against
	$frstNm = $_GET['firstname'];
  $lastNm = $_GET['lastname'];

	/* get ID */
	$stmt1 = $DB->query("SELECT id FROM voices WHERE FIRSTNAME = '".$frstNm."' AND LASTNAME = '".$lastNm."' ORDER BY RAND() LIMIT 1");
  $id = $stmt1->fetchColumn();

	// return value
  if ($id) {
    echo $id;
  }
  else {
    echo 'no';
  }

	// close db conn
  $DB = null;

?>
