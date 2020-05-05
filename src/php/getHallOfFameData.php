<?php

  // connect script
  require 'connect.php';

  // json encoder
  require 'json_readable_encode.php';

  $sql = "SELECT * FROM finished_games ORDER BY score DESC";
  $stmt = $DB->prepare($sql);
  $stmt->execute();

  $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

  // send result to encoder
  $json = json_readable_encode($data);

  // HOF data
  echo $json;

  // close db conn
  $DB = null;

?>
