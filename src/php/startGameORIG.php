<?php


// start form vars
$gmID;
$Date = $_POST['dateStr'];
$Player_Name = $_POST['Player_Name'];
$Player_Location = $_POST['Player_Location'];
$Player_Email = $_POST['Player_Email'];
$Player_Password = $_POST['Player_Password'];
$Category_Select = $_POST['Category_Select'];
// cat variable
$Cat_Choice = array();
foreach($Category_Select as $chkVal) {
            $Cat_Choice[] = $chkVal;
    }

// call strip tags
$Player_Name = strip_tags_deep($Player_Name);
$Player_Location = strip_tags_deep($Player_Location);
$Player_Email = strip_tags_deep($Player_Email);
$Player_Password = strip_tags_deep($Player_Password);
// strip tags function
function strip_tags_deep($value) {
	return is_array($value) ?
	array_map('strip_tags_deep', $value) :
	strip_tags($value);
	}
// escape quote chars
$Player_Name = addslashes($Player_Name);
$Player_Location = addslashes($Player_Location);
$Player_Email = addslashes($Player_Email);

// PDO connect
	$Username = 'thinkagain';
	$Password = '89*Stanza';
	try {
	    $DB = new PDO('mysql:host=localhost;dbname=whovox_db', $Username, $Password);
	    $DB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	    }
	    catch(PDOException $e) {
		    echo 'ERROR: ' . $e->getMessage();
		    }
////////////////////////////
// guest player
//////////////////////////////
	if ($Play_Guest == 'Play_Guest_True') {

		// create player record
		$affected_rows = $DB->exec("INSERT INTO players VALUES ('".$ID."', '".$Date."','".$Player_Name."', '".$Player_Location."', '".$GuPlayer_Password."', '".$GuPlayer_Email."')");
		// get guest player ID
		$stmt1 = $DB->query("SELECT MAX(ID) FROM players WHERE name = '$Player_Name' AND location = '$Player_Location'");
		$rndRow = $stmt1->fetch();
		$PLYR_ID = $rndRow[0];
		// get 10 voices for game
		$vxArr = array();
		foreach($DB->query("SELECT ID FROM voices WHERE category = '".$Cat_Choice[0]."' OR category = '".$Cat_Choice[1]."' OR category = '".$Cat_Choice[2]."' OR category = '".$Cat_Choice[3]."' ORDER BY RAND() LIMIT 10") as $voices) {
		// put values in array
		foreach($voices as $item) {
			$vxArr[] = $item;
			}
		}
		// clean up game IDs array
		$vxIDs = array_keys( array_count_values($vxArr) );

		// insert game start data
		$affected_rows = $DB->exec("INSERT INTO all_games VALUES ('".$ID."', '".$Date."','".$Player_Name."', '".$Player_Location."', '".$SCORE."','".$VOX_CT."','".$ANS_RIGHT."','".$ANS_WRONG."','".$MOV_TV_ASKED."','".$MOV_TV_RIGHT."','".$MUS_ARTS_ASKED."','".$MUS_ARTS_RIGHT."','".$NEWS_POL_ASKED."','".$NEWS_POL_RIGHT."','".$SPORTS_ASKED."','".$SPORTS_RIGHT."','".$PLYR_ID."','".$Q1_CAT."','".$Q1_SCR."','".$Q2_CAT."','".$Q2_SCR."','".$Q3_CAT."','".$Q3_SCR."','".$Q4_CAT."','".$Q4_SCR."','".$Q5_CAT."','".$Q5_SCR."','".$Q6_CAT."','".$Q6_SCR."','".$Q7_CAT."','".$Q7_SCR."','".$Q8_CAT."','".$Q8_SCR."','".$Q9_CAT."','".$Q9_SCR."','".$Q10_CAT."','".$Q10_SCR."')");

		// get current game session vars
		$stmt1 = $DB->query("SELECT * FROM all_games WHERE NAME = '".$Player_Name."' AND DATE = '".$Date."' ");
		$gmInfo = $stmt1->fetch();

		// close db conn
		$DB = null;

		// start session
		session_start();

		// session vars
		$_SESSION['gmID'] = $gmInfo[0];
		$_SESSION['Date'] = $gmInfo[1];
		$_SESSION['PlyrNm'] = $gmInfo[2];
		$_SESSION['PlyrLc'] = $gmInfo[3];
		$_SESSION['Scr'] = $gmInfo[4];
		$_SESSION['VxCt'] = $gmInfo[5];
		$_SESSION['AnsRt'] = $gmInfo[6];
		$_SESSION['AnsWg'] = $gmInfo[7];
		$_SESSION['vxIDs'] = $vxIDs;
		$_SESSION['Category_Select'] = $Category_Select;

		//Go to the main menu.
		header('location:play.php');

	// end if guest
	}

//////////////////////////////
// NOT guest player
//////////////////////////////
	if ($Play_Guest != 'Play_Guest_True') {

		$vxArr = array();
		// get 10 voices for game
		foreach($DB->query("SELECT ID FROM voices WHERE category = '".$Cat_Choice[0]."' OR category = '".$Cat_Choice[1]."' OR category = '".$Cat_Choice[2]."' OR category = '".$Cat_Choice[3]."' ORDER BY RAND() LIMIT 10") as $voices) {
		// put values in array
		foreach($voices as $item) {
			$vxArr[] = $item;
			}
		}
		// clean up game IDs array
		$vxIDs = array_keys( array_count_values($vxArr) );


		// check if PN, PL already exist
		$stmt = $DB->query("SELECT ID FROM players WHERE name = '$Player_Name' AND location = '$Player_Location'");
		$match = $stmt->fetch();

		// new player
		if (!$match[0]) {
			// create player record if none exists
			$affected_rows = $DB->exec("INSERT INTO players VALUES ('".$ID."', '".$Date."','".$Player_Name."', '".$Player_Location."', '".$Player_Password."', '".$Player_Email."')");
			// get player ID for new game
			$stmt1 = $DB->query("SELECT ID FROM players WHERE name = '$Player_Name' AND location = '$Player_Location'");
			$rndRow = $stmt1->fetch();
			$PLYR_ID = $rndRow[0];
		}
		// match found, old player
		if ($match[0]) {
			// player ID value
			$PLYR_ID = $match[0];
		}

// insert game start data
$affected_rows = $DB->exec("INSERT INTO all_games VALUES ('".$ID."', '".$Date."','".$Player_Name."', '".$Player_Location."', '".$SCORE."','".$VOX_CT."','".$ANS_RIGHT."','".$ANS_WRONG."','".$MOV_TV_ASKED."','".$MOV_TV_RIGHT."','".$MUS_ARTS_ASKED."','".$MUS_ARTS_RIGHT."','".$NEWS_POL_ASKED."','".$NEWS_POL_RIGHT."','".$SPORTS_ASKED."','".$SPORTS_RIGHT."','".$PLYR_ID."','".$Q1_CAT."','".$Q1_SCR."','".$Q2_CAT."','".$Q2_SCR."','".$Q3_CAT."','".$Q3_SCR."','".$Q4_CAT."','".$Q4_SCR."','".$Q5_CAT."','".$Q5_SCR."','".$Q6_CAT."','".$Q6_SCR."','".$Q7_CAT."','".$Q7_SCR."','".$Q8_CAT."','".$Q8_SCR."','".$Q9_CAT."','".$Q9_SCR."','".$Q10_CAT."','".$Q10_SCR."')");

// get current game session vars
$stmt1 = $DB->query("SELECT * FROM all_games WHERE NAME = '".$Player_Name."' AND DATE = '".$Date."' ");
$gmInfo = $stmt1->fetch();

// close db conn
$DB = null;

// start session
session_start();

// session vars
$_SESSION['gmID'] = $gmInfo[0];
$_SESSION['Date'] = $gmInfo[1];
$_SESSION['PlyrNm'] = $gmInfo[2];
$_SESSION['PlyrLc'] = $gmInfo[3];
$_SESSION['Scr'] = $gmInfo[4];
$_SESSION['VxCt'] = $gmInfo[5];
$_SESSION['AnsRt'] = $gmInfo[6];
$_SESSION['AnsWg'] = $gmInfo[7];
$_SESSION['vxIDs'] = $vxIDs;
$_SESSION['Category_Select'] = $Category_Select;

//Go to the main menu.
header('location:play.php');
}
?>
