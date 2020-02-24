<?php

  // connect script
  require 'connect.php';

  // json encoder
  require 'json_readable_encode.php';

  // query
  $sql = "INSERT INTO all_games () VALUES (null, now(), 'Player Name', 'Earth', 0)";

  //$data = Array();

  $stmt = $DB->prepare($sql);
  $stmt->execute();

  // query 2
  //$sql2 = "SELECT id, date FROM all_games ORDER BY date DESC,id DESC LIMIT 1";
  //$stmt2 = $DB->prepare($sql2);
  //$stmt2->execute();

  //$data = $stmt2->fetchAll(PDO::FETCH_ASSOC);

  // send result to encoder
  //$json = json_readable_encode($data);

  // new game ID val
  //$json = $data[0]['id'];

  // send ID of new game
  //echo $json;

  /* get 5 answers from DB */

  $sql2 = "SELECT ID, FIRSTNAME, LASTNAME, CATEGORY, GENDER, ACCENT, RACE, DOB FROM voices WHERE CATEGORY='Movies/TV' ORDER BY RAND() LIMIT 5";

  $data = Array();
  $stmt2 = $DB->prepare($sql2);
  $stmt2->execute();
  $data = $stmt2->fetchAll(PDO::FETCH_ASSOC);

  // send result to encoder
  //$json = json_readable_encode($data);

  // return array to api action
  $json = json_encode($data);
  echo $json;

  // close db conn
  $DB = null;

?>
