<?php

  // connect script
  require 'connect.php';

  // json encoder
  //require 'json_readable_encode.php';

  // query
  $sql = "INSERT INTO all_games () VALUES (null, now(), 'Player Name', 'Earth', 0)";

  //$data = Array();

  $stmt = $DB->prepare($sql);
  $stmt->execute();

  // query 2
  $sql2 = "SELECT id, date FROM all_games ORDER BY date DESC,id DESC LIMIT 1";
  $stmt2 = $DB->prepare($sql2);
  $stmt2->execute();

  $data = $stmt2->fetchAll(PDO::FETCH_ASSOC);

  // send result to encoder
  //$json = json_readable_encode($data);

  //echo $json;

  $json = $data[0]['id'];

  // send ID of new game
  echo $json;

  // close db conn
  $DB = null;

?>
