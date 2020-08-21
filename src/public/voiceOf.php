<?php
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
	<link rel="shortcut icon" href="http://www.whovox.com/imgs/siteIcon.ico" />
	<link href="whovox.css" rel="stylesheet" type="text/css" media="screen">
	<link href="whovox-mobile.css" rel="stylesheet" type="text/css" media="screen">
	<link href="whovox-tablet.css" rel="stylesheet" type="text/css" media="screen">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
	<script src="js/gameUI.js"></script>
	<script src="js/gameFunctions.js"></script>
	<script src="js/gameJquery.js"></script>


</head>

<body onload='UIanim(); earAnim(); loadFirstVoice("<?php echo $first; ?>", "<?php echo $last; ?>");'>
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
<div id="bannerMob">
	<!-- Single Responsive -->
	<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
	<ins class="adsbygoogle"
		id="bannerAd"
		style="display:block"
		data-ad-client="ca-pub-8335048929933055"
		data-ad-slot="5306739925"
		data-ad-format="auto"></ins>
	<script>
	(adsbygoogle = window.adsbygoogle || []).push({});
	</script> 
	
</div>

<div id="main">
	
	<img src="imgs/logo1.png" id="logo1" class="playScr" alt="logo">
	<img src="imgs/logo2.png" id="logo2" class="playScr" alt="logo">
	<img src="imgs/logo3.png" id="logo3" class="playScr" alt="logo">
	<img src="imgs/logo4.png" id="logo4" class="playScr" alt="logo">
	<img src="imgs/logo5.png" id="logo5" class="playScr" alt="logo">
	
	<img src="imgs/logo1L.png" id="logo1L" class="playScr" alt="logo">
	<img src="imgs/logo2.png" id="logo2L" class="playScr" alt="logo">
	<img src="imgs/logo3L.png" id="logo3L" class="playScr" alt="logo">
	<img src="imgs/logo4L.png" id="logo4L" class="playScr" alt="logo">
	<img src="imgs/logo5L.png" id="logo5L" class="playScr" alt="logo">
		
		<div class="wxPly playScr" id="wxW-ply">W</div>
		<div class="wxPly playScr" id="wxH-ply">H</div>
		<div class="wxPly playScr" id="wxO-ply">O</div>
		<div class="wxPly playScr" id="wxV-ply">V</div>
		<div class="wxPly playScr" id="wxO2-ply">O</div>
		<div class="wxPly playScr" id="wxX-ply">X</div>
		<h2 id="titleH2" class="playScr">WHO'S TALKING NOW?</h2>
		<input type="button" id="exitBtn" class="exitBtnScr top110 left-4" value="HOME" onClick="location.href='index.php';">
		<div id="infoL" class="voiceOf">
			<img src="imgs/noVox.png" id="flickr1" class="vxOfImg" />
			<img src="imgs/noVox.png" id="flickr2" class="vxOfImg" />
		</div>
		<div id="infoR" class="voiceOf">
			<img src="imgs/noVox.png" id="flickr3" class="vxOfImg" />
			<img src="imgs/noVox.png" id="flickr4" class="vxOfImg" />
		</div>
		<div id="facebox" class="voiceOf">
			<div id="tmplSrch">
				<span id="tmplMsg">VOX SAMPLE</span>
				<input id="srchVoicesTxt" type="text" placeholder="Search Voices" maxlength="21" class="hofSearch mgnAll4" onclick="this.value = ''" onkeypress="isEnterVoiceOf(event);"><input type="button" class="srchHOFBtn mgnAll4 vxOfBtnTxt" value="SEARCH" tabindex="5" onClick="searchVoices();"><input type="button" class="srchHOFBtn vxOfBtnTxt" value="RANDOM" tabindex="6" onClick="loadVoiceRandom();">
			</div>
			<div class="ansBx" id="vxOfBox">
				<div class="ansPics"><img src="imgs/noVox.png" id="tmplPic" /></div>
				<div class="tmplTxt"><span id="vx1stNm">-</span>&nbsp;<span id="vxLstNm">-</span></div>
				<div class="tmplCategory">-</div>
				<div class="tmplPlayer">
					<audio id="tmplAudioEl" src=""></audio>
				</div>
			</div>
			<div class="voiceText">
				<img id="wikiImg" src="imgs/noVox.png" width="115" />
				<span id="wikiText"></span>
				<div id="wikiSrc">
					<div><img src="imgs/wikipedia.png" alt="wikipedia logo" /><a href="https://wikipedia.org" id="wikiLink" target="_blank">WIKIPEDIA</a></div>
					<div><img src="imgs/fw.png" alt="fused.world logo" /><a href="https://fused.world/All/Latest.html" id="fusedLink" target="_blank">FUSED.WORLD</a></div>
				</div>
			</div>
		</div>
		<div id="mainBtnDiv" class="voiceOf">
			<input type="button" id="playBtn" class="voiceOfBtn mainBtnNext" value="PLAY WHOVOX" onclick="location.href='http://whovox.com/playSample.php';">
		</div>
	
	
</div>

</body>
</html>