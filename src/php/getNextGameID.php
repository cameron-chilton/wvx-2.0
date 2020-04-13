<?php

  // connect script
  require 'connect.php';

  // json encoder
  require 'json_readable_encode.php';

  // query 2
  $sql2 = "INSERT INTO all_games () VALUES (null, now())";
  $stmt2 = $DB->prepare($sql2);
  $stmt2->execute();

  $sql3 = "SELECT id, date FROM all_games ORDER BY date DESC,id DESC LIMIT 1";
  $stmt3 = $DB->prepare($sql3);
  $stmt3->execute();

  $data = $stmt3->fetchAll(PDO::FETCH_ASSOC);

  // send result to encoder
  $json = json_readable_encode($data);

  // new game ID val
  $json = $data[0]['id'];

  // send ID of new game
  echo $json;

  // close db conn
  $DB = null;

?>
