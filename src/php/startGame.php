<?php
  // connect script
  require 'connect.php';

  // json encoder
  require 'json_readable_encode.php';

  // query
  $sql = "INSERT INTO all_games () VALUES (null, now())";

  //$data = Array();

  $stmt = $DB->prepare($sql);
  $stmt->execute();


  /* get 5 answers from DB */

  $sql2 = "SELECT ID, FIRSTNAME, LASTNAME, CATEGORY, GENDER, ACCENT, RACE, DOB FROM voices WHERE CATEGORY='Movies/TV' ORDER BY RAND() LIMIT 5";

  $data = Array();
  $stmt2 = $DB->prepare($sql2);
  $stmt2->execute();
  $data = $stmt2->fetchAll(PDO::FETCH_ASSOC);

  // return array to api action
  $json = json_encode($data);
  echo $json;

  // close db conn
  $DB = null;
?>
