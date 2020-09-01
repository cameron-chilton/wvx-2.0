<?php

  // connect script
  require 'connect.php';

  $sql = "SELECT COUNT(*) AS total FROM voices";
  $stmt = $DB->prepare($sql);
  $stmt->execute();

  $count = $stmt->fetch(PDO::FETCH_NUM);

  echo reset($count);

  // close db conn
  $DB = null;

?>
