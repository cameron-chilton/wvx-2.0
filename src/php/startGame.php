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

  $json = $data[0]['id'];

  //echo $json;

  $url="http://localhost:4002/?gameID=";
  $query = parse_url($url, PHP_URL_QUERY);
  // Returns a string if the URL has parameters or NULL if not
  if ($query) {
    $url .= $json;
    //header('Location: ' . $url);
    echo $url;
  }


  // send ID of new game
  //echo $json;

  // close db conn
  $DB = null;

?>
