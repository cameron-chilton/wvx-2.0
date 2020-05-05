<?php
  // connect script
  require 'connect.php';

  // json encoder
  require 'json_readable_encode.php';

  /* get 5 answers from DB */

  $sql2 = "SELECT ID, FIRSTNAME, LASTNAME, CATEGORY, GENDER, ACCENT, RACE, DOB
    FROM voices
    WHERE CATEGORY='Movies/TV' OR (category = 'Music/Arts') OR (category = 'News/Politics') OR (category = 'Sports')
    ORDER BY RAND()
    LIMIT 5";

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
