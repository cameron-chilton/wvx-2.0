<?php

  // connect script
  require 'connect.php';

  // json encoder
  require 'json_readable_encode.php';

  // query
  $sql = "INSERT INTO all_games () VALUES (null, now(), 'Player Name', 'Earth', 0";

  $data = Array();

  $stmt = $DB->prepare($sql);
  $stmt->execute();
  $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

  // send result to encoder
  $json = json_readable_encode($data);

  echo $json;

?>
