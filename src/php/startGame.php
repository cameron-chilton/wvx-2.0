<?php
  // connect script
  require 'connect.php';

  // json encoder
  require 'json_readable_encode.php';

  /* passed params */
  $ctgyMovies = $_GET['ctgyMovies'];
  $ctgyMusic = $_GET['ctgyMusic'];
  $ctgyNews = $_GET['ctgyNews'];
  $ctgySports = $_GET['ctgySports'];

  /* get 5 answers from DB */

  $sql = "SELECT ID, FIRSTNAME, LASTNAME, CATEGORY, GENDER, ACCENT, RACE, DOB
    FROM voices
    WHERE CATEGORY='$ctgyMovies' OR (category = '$ctgyMusic') OR (category = '$ctgyNews') OR (category = '$ctgySports')
    ORDER BY RAND()
    LIMIT 5";

  $data = Array();
  $stmt = $DB->prepare($sql);
  $stmt->execute();
  $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

  // return array to api action
  $json = json_encode($data);
  echo $json;

  // close db conn
  $DB = null;

?>
