<?php
setcookie('key', 'value', ['samesite' => 'None', 'secure' => true]);
	$first ='';
	$last = '';
	// check val from url param
	if (empty($_GET)) {
		$name = '';
	}
	else {
		$name = $_GET['name'];
	}

	if ($name != '') {
		// replace delimiters
		//$name2 = str_replace('%20', ' ' ,$name);
		$nameArr = str_replace('_', ' ' , $name);
		// name string is now array
		$ns = explode(' ', $nameArr);

		if (count($ns) == 1) {
			$first = $ns[0];
			$last = '';
		}
		else if (count($ns) == 2) {
			$first = $ns[0];
			$last = $ns[1];
		}
		else if (count($ns) == 3) {
			$first = $ns[0];
			$last = $ns[1] . ' ' . $ns[2];
		}
		else {
			$first ='';
			$last = '';
		}
	}

?>
<!doctype html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>WHOVOX <?php echo ucwords($first).' '.ucwords($last); ?></title>
	<meta name="description" content="WHOVOX - Who's Voice: Play a sample of a famous person's voice from the game WHOVOX.">
	<!--link rel="shortcut icon" href="http://www.whovox.com/imgs/siteIcon.ico" -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
	<script src="scripts.js"></script>
	<link href="voiceStyles.css" rel="stylesheet" type="text/css" media="screen">
</head>

<body onload='loadFirstVoice("<?php echo $first; ?>", "<?php echo $last; ?>"); getVoiceCount();'>
<span class="white">
<?php
/*
	echo 'name: ';
	echo ucwords($name);
	echo ', ns: ';
	echo print_r($ns);
	echo ', first: ';
	echo ucwords($first);
	echo ', last: ';
	echo ucwords($last);
	echo ', size: ';
	echo count($ns);
*/
?>
</span>

  <!-- ad holders -->
  <div class="adBox"></div>

  <div class="game">

    <div class="topLine">
      <h1>
        <span class="name1">W</span>
        <span class="name2">H</span>
        <span class="name3">O</span>
        <span class="name4">V</span>
        <span class="name5">O</span>
        <span class="name6">X</span>
      </h1>
      <div class="earLogo">
        <img class="logo-dot" src="../imgs/logo-dot.svg" />
        <img class="logo-outer" src="../imgs/logo-outer.svg" />
        <img class="logo-inner1" src="../imgs/logo-inner1.svg" />
        <img class="logo-inner2" src="../imgs/logo-inner2.svg" />
        <img class="logo-inner3" src="../imgs/logo-inner3.svg" />
      </div>
      <div class="voiceCount">
        <div class="voiceNum">--</div>
        <div class="voiceTxt">VOICES</div>
      </div>
    </div>

    <div class="topContainer">

      <div class="gameInfo">

        <div id="tmplSrch">
          <h2 id="tmplMsg">VOX SAMPLE</h2>
          <input id="srchVoicesTxt" type="text" placeholder="Search Voices" maxlength="21" class="" onclick="this.value = ''" onkeypress="isEnterVoiceOf(event);">
          <input type="button" class="save-button" value="SEARCH" onClick="searchVoices();">
          <input type="button" class="save-button" value="RANDOM" onClick="loadVoiceRandom();">
        </div>
        <div class="vxBtn" id="vxOfBox">
          <span class="tmplCategory"></span>
          <span class="ansPic"><img src="../imgs/noVox.png" id="tmplPic" /></span>
          <span class="ansName">
            <span id="vx1stNm">-</span>&nbsp;<span id="vxLstNm">-</span>
          </span>
          <span class="ansWhosThis"><a href="https://en.wikipedia.org/wiki/" target="_blank" rel="noopener noreferrer" id="wikiLink">WHO&#39;S THIS?</a></span>
        </div>
        <div class="tmplPlayer">
          <audio id="tmplAudioEl" src="" controls></audio>
        </div>

      </div>

      <div>
        <button class="play-button" onclick="location.href='http://localhost:3000'">PLAY WHOVOX</button>
      </div>

      <div class="voiceText">
        <img id="wikiImg" src="../imgs/noVox.png" width="115" />
        <p id="wikiText">
          <span class="ansQ">SEARCHING...</span>
        </p>
      </div>

    </div>
    <div class="bottomLinks">
      <span class="links">
        <a href="http://localhost/WVX-2.0/src/public/privacy-policy.html">PRIVACY POLICY</a>
      </span>
      <span class="copy">&copy;2020 THINKAGAIN</span>
    </div>

  </div>





</body>
</html>
