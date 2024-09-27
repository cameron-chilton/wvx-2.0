<?php

// NAME
$cookieNm_plyrNm = "Player_Name";
if( !isset($_COOKIE[$cookieNm_plyrNm]) ) {
	$cookieVal_plyrInput = 'Player Name';
	setcookie($cookieNm_plyrNm, $cookieVal_plyrInput, time() + (3110400 * 30), "/");
	}

// LOC
$cookieNm_plyrLoc = "Player_Location";
if( !isset($_COOKIE[$cookieNm_plyrLoc]) ) {
	$cookieVal_plyrLocInput = 'Player Location';
	setcookie($cookieNm_plyrLoc, $cookieVal_plyrLocInput, time() + (3110400 * 30), "/");
	}

// EMAIL
$cookieNm_plyrEmail = "Player_Email";
if( !isset($_COOKIE[$cookieNm_plyrEmail]) ) {
	$cookieVal_plyrEmailInput = 'Enter Email';
	setcookie($cookieNm_plyrEmail, $cookieVal_plyrEmailInput, time() + (3110400 * 30), "/");
	}

// PW
$cookieNm_plyrPassword = "Player_Password";
if( !isset($_COOKIE[$cookieNm_plyrPassword]) ) {
	$cookieVal_plyrPasswordInput = 'EnterPassword';
	setcookie($cookieNm_plyrPassword, $cookieVal_plyrPasswordInput, time() + (3110400 * 30), "/");
	}

// GUEST
$cookieNm_plyrGuest = "Player_Guest";
$guestVal;
if( !isset($_COOKIE[$cookieNm_plyrGuest]) ) {
	$cookieVal_plyrGuestInput = 'Play_Guest_True';
	setcookie($cookieNm_plyrGuest, $cookieVal_plyrGuestInput, time() + (3110400 * 30), "/");
	$guestVal = $cookieVal_plyrGuestInput;
	}
if( isset($_COOKIE[$cookieNm_plyrGuest]) ) {
	$guestVal = $_COOKIE[$cookieNm_plyrGuest];
	}
	/*
	if( !isset($_COOKIE[$cookieNm_plyrNm]) ) {
		echo "<span class='white'>Cookie named '" . $cookieNm_plyrNm . "' is not set!</span><br>";
		echo "<span class='white'>Cookie named '" . $cookieNm_plyrLoc . "' is not set!</span><br>";
		echo "<span class='white'>Cookie named '" . $cookieNm_plyrEmail . "' is not set!</span><br>";
		echo "<span class='white'>Cookie named '" . $cookieNm_plyrPassword . "' is not set!</span><br>";
		echo "<span class='white'>Cookie named '" . $cookieNm_plyrGuest . "' is not set!</span><br>";
		echo "<span class='white'>guestVal = '" . $guestVal  . "'</span><br>";
		}
	else {
		echo "<span class='white'>Cookie '" . $cookieNm_plyrNm . "' is set! Value: " . $_COOKIE[$cookieNm_plyrNm].'</span><br>';
		echo "<span class='white'>Cookie '" . $cookieNm_plyrLoc . "' is set! Value: " . $_COOKIE[$cookieNm_plyrLoc].'</span><br>';
		echo "<span class='white'>Cookie '" . $cookieNm_plyrEmail . "' is set! Value: " . $_COOKIE[$cookieNm_plyrEmail].'</span><br>';
		echo "<span class='white'>Cookie '" . $cookieNm_plyrPassword . "' is set! Value: " . $_COOKIE[$cookieNm_plyrPassword].'</span><br>';
		echo "<span class='white'>Cookie '" . $cookieNm_plyrGuest . "' is set! Value: " . $_COOKIE[$cookieNm_plyrGuest].'</span>';
		}
	*/


	// PDO connect
	$servername = '127.0.0.1:3306';
  $username = 'u465391481_whovoxAdmin';
  $password = '91*Stanza';

	// from VPS- localhost:3306
	try {
  $DB = new PDO("mysql:host=$servername;dbname=u465391481_whovox_db", $username, $password);
	$DB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}
	catch(PDOException $e) {
	    echo 'ERROR: ' . $e->getMessage();
	    }
	// number of finished games
	$stmt = $DB->query("SELECT ID FROM finished_games");
	$gameCt = $stmt->rowCount();
	// number of voices
	$stmt2 = $DB->query("SELECT ID FROM voices");
	$vxCt = $stmt2->rowCount();
	// movies/tv voices
	$stmt3 = $DB->query("SELECT ID FROM voices WHERE category = 'Movies/TV'");
	$MovTVct = $stmt3->rowCount();
	// music arts voices
	$stmt4 = $DB->query("SELECT ID FROM voices WHERE category = 'Music/Arts'");
	$MusArtsCt = $stmt4->rowCount();
	// news pol voices
	$stmt5 = $DB->query("SELECT ID FROM voices WHERE category = 'News/Politics'");
	$NewsPolCt = $stmt5->rowCount();
	// sports voices
	$stmt6 = $DB->query("SELECT ID FROM voices WHERE category = 'Sports'");
	$SportsCt = $stmt6->rowCount();
	// format numbers
	$gameCt = number_format($gameCt);
	$vxCt = number_format($vxCt);
	// close DB conn
	$DB = null;

?>
<!doctype html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="description" content="WHOVOX - WHO'S TALKING NOW? A free online game where a player has ten seconds to listen to a notable person's voice and select who is speaking from five choices.">
	<meta name="keywords" content="celebrities, athletes, musicians, guess their voice, whovox.com, whovox, online games, free online game, guess the voice game, voice game, guess who's talking, celebrity voice game, whovox, free games, online voice game, who's talking now, Selena Gomez, Miley Cyrus, guess the celebrity voice, famous voices, web voice game, the voice, voice game, answer the voice, whos talking now">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>WHOVOX</title>
	<link rel="shortcut icon" href="https://www.whovox.com/favicon.ico">
	<link href="whovox.css" rel="stylesheet" type="text/css" media="screen">
	<link href="whovox-mobile.css" rel="stylesheet" type="text/css" media="screen">
	<link href="whovox-tablet.css" rel="stylesheet" type="text/css" media="screen">
	<!-- script src="js/jquery2.1.1.min.js"></script -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
	<script src="js/gameJquery.js"></script>
	<script src="js/gameFunctions.js"></script>
	<script src="js/gameUI.js"></script>
	<script type="text/javascript">
		// plays intro audio on load
		$(window).bind("load", function() {
			intro();
		});
	</script>
</head>

<body>



<!-- page text for bots -->
<div style="display: none;">
	<h1>Welcome to WHOVOX!</h1>

	<h2>What is WHOVOX?</h2>

	<p>WHOVOX is a free online game intended to be a fun listening challenge where a player tests their ear to determine who is speaking by listening to the sound of someone's voice. It's a fun and free game that is sometimes easy and sometimes quite challenging!</p>

	<h2>Where Did the Idea for WHOVOX Come From?</h2>

	<p>The idea for the game came from watching the great TV show The Simpsons. The Simpsons often features one or more guest celebrity voices in any given episode. The guest voice often plays a new character in the episode and is not easy to identify.</p>

	<p>The creators of WHOVOX enjoyed trying to guess who the special guest voices were during the show and seeing if their guess was correct when the end credits are shown. Thus the idea for WHOVOX was born.</p>

	<h2>How Was WHOVOX Made?</h2>

	<p>WHOVOX is built with all open-source technology. The languages/tools used are HTML, CSS, Javascript, jQuery, PHP, and MySQL.</p>

	<p>The voice audio clips used in the game are not from any copyrighted work (television show, movie, song, etc.) Each voice clip is taken from an interview found on the web and has no context as to what the person is actually talking about. The audio clip is also often not linear, meaning they are often made up of several separate phrases and in a changed order.</p>

	<p>The pictures used for each voice entry are for the most part candid shots found from web searches, posed or copyrighted pictures are not used.</p>

	<h2>What Are the Other Pages of the Site?</h2>

	<p>The site navigation is not easily scanned. Many navigation actions result from scripts or functions.</p>

	<p>The current page  (<a href="index.php">home page</a>) is the where a player begins a game. The page displays how many games have been completed and how many voice questions are in the voice question database. When the page loads an animation is played where the elements of the screen fade in one at a time. The <a href="play.php">play</a> screen is where all the fun is, but a game must start at the home page. The <a href="score.php">score</a> page is visited only after all twelve voices have been answered and the game is completed. There are also links to the <a href="HOF.php">Hall of Fame</a>, instructions on How to Play, and a <a href="contact.php">Contact</a> form. The <a href="score.php">score</a> page is visited only after all twelve voices have been answered and the game is completed.</p>

	<h2>Other Fun Free Online Game Sites</h2>
	<p>A list of some other great sites for fun and free online games.</p>
	<a href="http://www.pogo.com">pogo.com</a>
	<a href="http://www.addictinggames.com">Addicting Games</a>
	<a href="http://www.armorgames.com">Armor Games</a>
	<a href="http://www.miniclip.com">Miniclip.com</a>
	<a href="http://games.msn.com">MSN Games</a>
	<a href="http://www.agame.com">Agame.com</a>
	<a href="http://www.gamesgames.com">gamesgames.com</a>
	<a href="http://www.games.com">games.com</a>
	<a href="http://www.bigfishgames.com">Big Fish Games</a>
	<a href="http://www.freeonlinegames.com">FOG.com</a>
	<a href="https://games.yahoo.com">Yahoo Games</a>
	<a href="http://www.popcap.com/all-games/free-online-games">PopCap Games</a>
	<a href="http://GamesList.Com">GamesList.Com</a>
	<a href="http://espn.go.com/free-online-games">ESPN Arcade</a>
	<a href="http://www.candystand.com/">Candystand.com</a>
	<a href="http://www.gsn.com/casino-games">GSN.com</a>
	<a href="http://www.kongregate.com">Kongregate</a>
	<a href="http://games.aarp.org">AARP Games</a>
	<a href="http://www.King.com">King.com</a>
	<a href="http://www.FRIV.COM">FRIV.COM</a>
	<a href="http://www.www.nick.com/games/">nick.com</a>
	<a href="http://www.Y8.com">Y8.com</a>
	<a href="http://www.ziggygames.com">ziggygames.com</a>
	<a href="http://www.fupa.com">Fupa Games</a>
	<a href="http://www.gamehouse.com/online-games">GameHouse</a>
	<a href="http://www.gamescene.com">gamescene.com</a>

</div>

<!-- ad holders -->
<div id="bannerMob">
	<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
	<!-- Single Responsive -->
	<ins class="adsbygoogle"
		style="display:block"
		data-ad-client="ca-pub-8335048929933055"
		data-ad-slot="5306739925"
		data-ad-format="auto"></ins>
	<script>
	(adsbygoogle = window.adsbygoogle || []).push({});
	</script>
</div>

<div id="main">



	<img src="imgs/hmLogo1.png" id="hmLogo1" alt="logo" class="hmPg">
	<img src="imgs/hmLogo2.png" id="hmLogo2" alt="logo" class="hmPg">
	<img src="imgs/hmLogo3.png" id="hmLogo3" alt="logo" class="hmPg">
	<img src="imgs/hmLogo4.png" id="hmLogo4" alt="logo" class="hmPg">
	<div class="wxHm hmPg" id="wxW">W</div>
	<div class="wxHm hmPg" id="wxH">H</div>
	<div class="wxHm hmPg" id="wxO">O</div>
	<div class="wxHm hmPg" id="wxV">V</div>
	<div class="wxHm hmPg" id="wxO2">O</div>
	<div class="wxHm hmPg" id="wxX">X</div>
	<h2 id="hmH2" class="hmPg">WHO'S TALKING NOW?</h2>
	<input type="button" id="HOF" class="primBtn hmPg" value="HALL OF FAME" onClick="location.href='HOF.php';">
	<!-- how to play -->
	<div id="hwToPly" class="hwToPlyOff hmPg">
		<a href="javascript:void(0);" id="hwToPlyTxt" class=""><span>HOW TO PLAY</span></a>
		<div id="hwToInst">
			<h3>HOW TO PLAY</h3>
			<p class="bld">TURN SOUND ON!</p>
            	<p>WHOVOX is a web voice game where you have ten seconds to listen to a famous person's voice and select who is speaking from five choices.</p>
			<p>A full game is 10 voice questions and there are 4 categories: Movies/TV, Music/Arts, News/Politics, and Sports.</p>
			<p>Create a profile and play at least 3 games to see how you measure up with the best. Your profile email is not verified and is saved only for retrieving your login info.</p>
			<p>Press play and start listening to who's talking now! Make sure to share your score!</p>
			<p class="txtCtr"><input type="button" id="closeHT" class="closeBtn" value="CLOSE"></p>
		</div>
	</div>

	<div id="gameCt" class="hmPg"><?php echo $gameCt ?> games played<br><?php echo $vxCt ?> voice questions</div>


	<!-- play btn -->
	<div id="homePlayBtn" class="homePlayBtnOff hmPg">
		<div>
			<div class="show" id="hmPlyDiv">
				<a href="javascript:void(0);" id="homePlayTxt" class="hmPlyTxt" tabindex="3">PLAY</a>
			</div>
			<div class="hide">
				<form action="startGame.php" method="post" name="new_game" onkeypress="isEnter(event);" id="new_game">
						<?php
							date_default_timezone_set('America/New_York');
							$date = new DateTime();
							$dateStr = date_format($date, 'Y-m-d H:i:s');

							//$script_tz = date_default_timezone_get();
						?>
						<input type="hidden" name="dateStr" value="<?php echo $dateStr ?>">

						<div class="formRowNameLoc">
							<div class="formPlyrNmDiv">
								<label class="hmLbl">PLAYER NAME</label>
								<div class="errorMsg" id="msg01">ENTER NAME</div>
								<div class="errorMsg" id="msg21">NUMBERS/LETTERS ONLY</div>
								<input name="Player_Name" id="plyrNmTxt" type="text" value="<?php
								if( !isset($_COOKIE[$cookieNm_plyrNm]) ) {
									echo "Player Name";
									}
								else {
									echo $_COOKIE[$cookieNm_plyrNm];
									}
								 ?>" maxlength="21" class="formBoxes" onclick="this.select();">
							</div>
							<div class="formPlyrLocDiv">
								<label class="hmLbl">LOCATION</label>
								<div class="errorMsg" id="msg02">ENTER LOCATION</div>
								<div class="errorMsg" id="msg22">NUMBERS/LETTERS ONLY</div>
								<input name="Player_Location" id="plyrLcTxt" type="text" value="<?php
								if( !isset($_COOKIE[$cookieNm_plyrLoc]) ) {
									echo "Player Location";
									}
								else {
									echo $_COOKIE[$cookieNm_plyrLoc];
									}
								 ?>" maxlength="21" class="formBoxes" onclick="this.select();">
							</div>
						</div>

						<div class="formRowCats">

							<div id="statsAcctBox">
								<div class="VAGlgt" id="statsInst">Enter email/pw for the <a href="HOF.php">Hall Of Fame</a>, or Play As Guest.</div>
								<label class="statsAcctBoxProfile">PROFILE</label>
								<div class="mobileRow">
									<label class="statsAcctBoxEmail">EMAIL</label>
									<div class="errorMsg mgnAll1 fnt84pct" id="msg04">EMAIL FORMAT INCORRECT</div>
									<div class="errorMsg mgnAll1 fnt84pct" id="msg07">PLAYER NAME/EMAIL MISMATCH</div>
									<input name="Player_Email" id="plyrEmail" type="text" maxlength="42" value="<?php
										if( !isset($_COOKIE[$cookieNm_plyrEmail]) ) { echo "Enter Email"; }
										else { echo $_COOKIE[$cookieNm_plyrEmail]; }
								 	?>" onclick="this.select();">
								</div>
								<div class="mobileRow">
									<label class="statsAcctBoxPswd">PASSWORD<a href="forgotPassword.php" id="forgotPswd">Forgot Password?</a></label>
										<div class="errorMsg" id="msg05">ENTER PASSWORD</div>
										<div class="errorMsg" id="msg08">PASSWORD INCORRECT</div>
										<div class="errorMsg" id="msg14">PW MIN 8 CHARS</div>
										<div class="errorMsg" id="msg16">NUMBERS/LETTERS ONLY</div>
									<input name="Player_Password" id="plyrPswd" type="password" maxlength="16" class="" value="<?php
										if( !isset($_COOKIE[$cookieNm_plyrPassword]) ) { echo ""; }
										else { echo $_COOKIE[$cookieNm_plyrPassword]; }
								 	?>" onfocus="setAttribute('type', 'text');" onblur="setAttribute('type', 'password');" onclick="this.select();">
								</div>
							</div>
							<label class="catSelLbl">CATEGORY SELECT<span class="errorMsg" id="msg03">SELECT A CATEGORY</span></label>
							<!-- ALL -->
							<div class="catChoice">
								<input name="Category_All" type="checkbox" value="All" id="chkboxAll" class="homeCheck" onClick="checkAll(this); getPicVoicesIdxAll('All', this.id); getPicVoicesIdxMov('Mov', 'chkboxMovTV'); getPicVoicesIdxMus('Mus', 'chkboxMusArts'); getPicVoicesIdxNew('New', 'chkboxNewsPol'); getPicVoicesIdxSpo('Spo', 'chkboxSports');" >
								<label for="chkboxAll" class="catLabel mgnRt12">
									<img src="imgs/noVox.png" id="catImgAll" alt="All Faces">
									<div class="mgnTp18"><span class="catTitle">All Categories</span><span class="catCount">(<?php echo $vxCt.' voices' ?>)</span></div>
									<div class="catText">For only the best ears, all voices...</div>
								</label>
							</div>
							<div>
								<!-- MovTV-->
								<div class="catChoice">
									<input name="Category_Select[]" type="checkbox" value="Movies/TV" id="chkboxMovTV" class="homeCheck" onClick="uncheckAll(); getPicVoicesIdxMov('Mov', this.id);">
									<label for="chkboxMovTV" class="catLabel fltLft">
										<img src="imgs/noVox.png" id="catImgMov" alt="Movies/TV Faces">
										<div class="mgnTp18"><span class="catTitle">Movies/TV</span><span class="catCount">(<?php echo $MovTVct.' voices' ?>)</span></div>
										<div class="catText">Stars heard on screens big and small...</div>
									</label>
								</div>
								<!-- MUSIC/ARTS -->
								<div class="catChoice">
									<input name="Category_Select[]" type="checkbox" value="Music/Arts" id="chkboxMusArts" class="homeCheck" onClick="uncheckAll(); getPicVoicesIdxMus('Mus', this.id);">
									<label for="chkboxMusArts" class="catLabel mgnL12 fltLft">
										<img src="imgs/noVox.png" id="catImgMus" alt="Music/Arts Faces">
										<div class="mgnTp18"><span class="catTitle">Music/Arts</span><span class="catCount">(<?php echo $MusArtsCt.' voices' ?>)</span></div>
										<div class="catText">Singers, musicians, artists, writers...</div>
									</label>
								</div>
							</div>
							<div>
								<!-- NEWS/POLITICS -->
								<div class="catChoice">
									<input name="Category_Select[]" type="checkbox" value="News/Politics" id="chkboxNewsPol" class="homeCheck" onClick="uncheckAll();  getPicVoicesIdxNew('New', this.id);">
									<label for="chkboxNewsPol" class="catLabel fltLft">
										<img src="imgs/noVox.png" id="catImgNew" alt="News/Politics Faces">
										<div class="mgnTp18"><span class="catTitle">News/Politics</span><span class="catCount">(<?php echo $NewsPolCt.' voices' ?>)</span></div>
										<div class="catText">Politics, business, newsmakers...</div>
									</label>
								</div>
								<!-- SPORTS -->
								<div class="catChoice">
									<input name="Category_Select[]" type="checkbox" value="Sports" id="chkboxSports" class="homeCheck" onClick="uncheckAll();  getPicVoicesIdxSpo('Spo', this.id);">
									<label for="chkboxSports" class="catLabel mgnL12 fltLft">
										<img src="imgs/noVox.png" id="catImgSpo" alt="Sports Faces">
										<div class="mgnTp18"><span class="catTitle">Sports</span><span class="catCount">(<?php echo $SportsCt.' voices' ?>)</span></div>
										<div class="catText">All sports, the greatest of all time...</div>
									</label>
								</div>
							</div>

						<!-- end cat box form div -->
						</div>

						<div class="mgnTp42 clearBoth txtCtr">
							<div>
								<input type="button" class="cnclBtn" value="CANCEL" tabindex="3">
								<input name="submit" type="submit" class="hmStartBtn" value="START"  tabindex="4" onClick="return validateAjax();">
								<span class="mgnL8">
									<input name="Player_Guest" type="checkbox" value="Play_Guest_True" id="chkPlayGuest" <?php
									if( $guestVal == 'Play_Guest_True' ) {
										echo 'checked';
										}
									if( $guestVal != 'Play_Guest_True' ) {
										echo '';
										}
									?>><label class="playAsGuest" for="chkPlayGuest">PLAY AS GUEST</label>
								</span>
							</div>
							<div class="txtCtr mgnTp3">
								<span class="errorMsg" id="msg09">NEW PLAYER CREATED</span>
								<span class="errorMsg" id="msg10">PLAYER FOUND</span>
								<span class="errorMsg" id="msg11">GUEST PLAYER CREATED</span>
								<span class="errorMsg" id="msg12">GUEST PLAYER CREATED</span>
								<span class="errorMsg" id="msg13">USER INPUT ERROR</span>
							</div>
						</div>
				</form>
			</div>

		</div>
	</div>

	<div id="copy" class="hmPg">
		<p>&copy;2018 THINKAGAIN</p>
		<a href="voiceOf.php" class="contact">VOICE OF?</a>
		<a href="playSample.php" class="contact mgnL12">PLAY SAMPLE GAME</a>
		<a href="contact.php" class="contact mgnL12">CONTACT</a>
	</div>
	<div id="icns" class="hmPg">
		<a href="http://www.twitter.com/WhooVoxx" target="_blank"><img src="imgs/icn-twtr.png" alt="Twitter"></a>
	</div>





<!-- end main -->
</div>



<div style="display: none;">
	<audio preload="auto">
		<source src="sfx/Answer_Right.ogg" type="audio/ogg">
		<source src="sfx/Answer_Right.mp3" type="audio/mpeg">
		<source src="sfx/Answer_Wrong.ogg" type="audio/ogg">
		<source src="sfx/Answer_Wrong.mp3" type="audio/mpeg">
		<source src="sfx/Bonus.ogg" type="audio/ogg">
		<source src="sfx/Bonus.mp3" type="audio/mpeg">
		<source src="sfx/Cheer.ogg" type="audio/ogg">
		<source src="sfx/Cheer.mp3" type="audio/mpeg">
		<source src="sfx/Game_Over.ogg" type="audio/ogg">
		<source src="sfx/Game_Over.mp3" type="audio/mpeg">
	</audio>
</div>


</body>
</html>
