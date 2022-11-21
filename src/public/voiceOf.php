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
	<meta name="viewport" content="width=device-width, initial-scale=0.70">
	<title>WHOVOX: Voice Of? <?php echo ucwords($first).' '.ucwords($last); ?></title>
	<meta name="description" content="WHOVOX - Voice Of?: Play a sample of a famous person's voice from the game WHOVOX.">
	<link rel="shortcut icon" href="https://whovox.com/favicon.ico">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
	<script data-ad-client="ca-pub-8335048929933055" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
	<link href="https://whovox.com/public/voiceStyles.css" rel="stylesheet" type="text/css" media="screen">
</head>

<body onload='loadFirstVoice("<?php echo $first; ?>", "<?php echo $last; ?>"); getVoiceCount();'>
<span style="color: #fff;">
<?php

	// echo 'name: ';
	// echo ucwords($name);
	// echo ', ns: ';
	// echo print_r($ns);
	// echo ', first: ';
	// echo ucwords($first);
	// echo ', last: ';
	// echo ucwords($last);
	// echo ', size: ';
	// echo count($ns);

?>
</span>

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
        <img class="logo-dot" src="https://whovox.com/imgs/logo-dot.svg" />
        <img class="logo-outer" src="https://whovox.com/imgs/logo-outer.svg" />
        <img class="logo-inner1" src="https://whovox.com/imgs/logo-inner1.svg" />
        <img class="logo-inner2" src="https://whovox.com/imgs/logo-inner2.svg" />
        <img class="logo-inner3" src="https://whovox.com/imgs/logo-inner3.svg" />
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
          <input id="srchVoicesTxt" type="text" placeholder="Search Voices" maxlength="24" onclick="this.value = '';" onkeypress="isEnterVoiceOf(event);">
			<button class="save-button" onClick="searchVoices();">SEARCH</button>
          	<button class="save-button" onClick="loadVoiceRandom();">RANDOM</button>
        </div>
        <div class="vxBtn" id="vxOfBox">
          <span class="tmplCategory"></span>
          <span class="ansPic"><img src="https://whovox.com/public/imgs/noVox.png" id="tmplPic" /></span>
          <span class="ansName">
            <span id="vx1stNm">-</span>&nbsp;<span id="vxLstNm">-</span>
          </span>
          <span class="ansWhosThis"><a href="https://en.wikipedia.org/wiki/" target="_blank" rel="noopener noreferrer" id="wikiLink">WHO&#39;S THIS?</a></span>
        </div>
        <div class="tmplPlayer">
          	<audio id="tmplAudioEl" controls src="">
			</audio>
        </div>

      </div>

      <div class="play-button-container">
        <button class="play-button" onclick="location.href='https://whovox.com'" title="Play the voice game WHOVOX">PLAY WHOVOX</button>
        <div class="click-play box1">Click to play WHOVOX</div>
        <div class="click-play box2">Free & fun voice recognition game</div>
        <div class="click-play box3">Test your voice knowledge</div>
        <div class="click-play box4">1,000s of famous voices</div>
      </div>

      <div class="voiceText">
        <p id="wikiText">
          <span class="ansQ">LOADING...</span>
        </p>
      </div>

    </div>
    <div class="bottomLinks">
      <span class="links">
        <a href="https://whovox.com/public/privacy-policy.html">PRIVACY POLICY</a>
      </span>
      <span class="copy">&copy;2022 THINKAGAIN</span>
    </div>

  </div>


<script>

var vox;

function loadVoice(nameFirst, nameLast) {
	$.ajax({
		type: 'GET',
		url: 'https://whovox.com/public/loadVoice.php?firstname=' + nameFirst + '&lastname=' + nameLast,
		complete: function(data) {
			var retArr = data.responseText.split('||');
			getWikiInfoNew( toTitleCase(nameFirst), toTitleCase(nameLast) ); // call wiki function
			// category
			$('.tmplCategory').hide().empty();
			$('.tmplCategory').text(retArr[1]);
			$('.tmplCategory').fadeIn('fast');
			// name
			$('#vx1stNm, #vxLstNm').hide().empty();
			$('#vx1stNm').text(retArr[4]);
			$('#vxLstNm').text(retArr[5]);
			$('#vx1stNm, #vxLstNm').fadeIn('fast');
			// pics
			$('#tmplPic').hide();
			$('#tmplPic').attr('src', 'data:image/jpeg;base64,' + retArr[6] );
			$('#tmplPic').fadeIn('fast');
      // wiki link
      $('#wikiLink').attr('href','https://en.wikipedia.org/wiki/' + toTitleCase(retArr[4]) + '_' + toTitleCase(retArr[5]));
			// assign answer voice clip
			vox = retArr[9];
			// load audio
			var nmFrst = vox.substr(0,1), dir, tmplClip = document.getElementById('tmplAudioEl');
			if(nmFrst == 'A' || nmFrst == 'B') {dir = 'AB';}
			if(nmFrst == 'C' || nmFrst == 'D') {dir = 'CD';}
			if(nmFrst == 'E' || nmFrst == 'F') {dir = 'EF';}
			if(nmFrst == 'G' || nmFrst == 'H') {dir = 'GH';}
			if(nmFrst == 'I' || nmFrst == 'J') {dir = 'IJ';}
			if(nmFrst == 'K' || nmFrst == 'L') {dir = 'KL';}
			if(nmFrst == 'M' || nmFrst == 'N') {dir = 'MN';}
			if(nmFrst == 'O' || nmFrst == 'P') {dir = 'OP';}
			if(nmFrst == 'Q' || nmFrst == 'R') {dir = 'QR';}
			if(nmFrst == 'S' || nmFrst == 'T') {dir = 'ST';}
			if(nmFrst == 'U' || nmFrst == 'V') {dir = 'UV';}
			if(nmFrst == 'W' || nmFrst == 'X') {dir = 'WX';}
			if(nmFrst == 'Y' || nmFrst == 'Z') {dir = 'YZ';}
			// can play ogg or wav
			if (tmplClip.canPlayType) {
				if ( "" != tmplClip.canPlayType('audio/ogg; codecs="vorbis"')) {
					// assign dir and type
					//tmplClip.src = "https://whovox.com/audio/" + dir + "/" + vox + ".ogg";
					tmplClip.setAttribute('src', "https://whovox.com/audio/" + dir + "/" + vox + ".ogg");

					}
				if ( "" != tmplClip.canPlayType('audio/mp3; codecs="mp3"')) {
					//tmplClip.src = "https://whovox.com/audio/" + dir + "/" + vox + ".mp3";
					tmplClip.setAttribute('src', "https://whovox.com/audio/" + dir + "/" + vox + ".mp3");
					}
				}
				else {alert("No Audio Support");}
			} // end data complete
	});

} // end load voice function

// GET WIKIPEDIA TEXT IF VOICE FOUND NEW
function getWikiInfoNew(nameFirst, nameLast) {
	//$('#wikiImg').attr('src', 'imgs/noVox.png');
	var wikiSrchName = !nameLast ?  nameFirst : nameFirst + ' ' + nameLast;
	// get wikipedia text & pic
	$.ajax({
		url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' + wikiSrchName,
		method: 'POST',
		crossDomain: true,
   		dataType: 'jsonp',
	}).done(function(data) {
		var articleID, extract1, extract2;
		for (var key in data.query.pages) {
			articleID = key;
		}
		extract1 = data.query.pages[articleID];
		extract2 = extract1.extract;
		if (data) {
			$('#wikiText').empty().scrollTop();
			$('#wikiText').text( (!extract2) ? 'No text' : extract2 );
		}
		else {
			console.log('WIKIPEDIA no results');
		}
	}).fail(function(err) {
		console.log('WIKIPEDIA result load error ' + JSON.stringify(err));
	});

}


// convert to title case
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function loadFirstVoice (first, last) {
	if (first) {
		$.ajax({
			type: 'GET',
			url: 'https://whovox.com/public/loadVoiceCheck.php?firstname=' + first + '&lastname=' + last,
			complete: function(data) {
				if (data.responseText) {
					$('#tmplMsg').removeClass('errorMsg').text('VOICE OF?').fadeIn('fast');
					loadVoice(first, last);
				}
				else {
					$('#tmplMsg').addClass('errorMsg').text('VOICE NOT FOUND').fadeIn('fast');
					setTimeout(function(){ loadVoiceRandom(); }, 2100);
				}
			}
		});
	}
	else { loadVoiceRandom(); }

}

// get voice count
function getVoiceCount() {

$.ajax({
  type: 'GET',
  url: 'https://whovox.com/public/getVoiceCount.php',
  complete: function(data) {
    if (data.responseText) {
      var num = parseInt(data.responseText);
      $('.voiceNum').text(num.toLocaleString());
    }
    else {
      $('.voiceNum').text('1500+');
    }
  }
});

}

// for search VoiceOf
function isEnterVoiceOf(e) {
e = e || window.event || {};
var charCode = e.charCode || e.keyCode || e.which;
  if (charCode == 13) {
    return searchVoices();
  }
 }

 $(document).ready(function() {

  var el3 = $('.play-button');
    setInterval(function() {
      el3.toggleClass('btnOrange');
      }, 1000);

 });

 function loadVoiceRandom() {
  $('#srchVoicesTxt').val('');
  $('#wikiText').html('<span class="ansQ">LOADING...</span>');
	$('#tmplMsg').removeClass('errorMsg').text('VOICE OF?').fadeIn('fast');
	$.ajax({
		type: 'GET',
		url: 'https://whovox.com/public/loadVoiceRandom.php',
		complete: function(data) {
			var retArr = data.responseText.split('||');
			loadVoice(retArr[4], retArr[5]);
		}
	});
}

function searchVoices() {
	var srchTxt = $('#srchVoicesTxt').val();
	var st2 = srchTxt.split(' '), n1 = st2[0], n2 = st2[1] || '', n3 = st2[2];
  // if middle initial
  if (n2.length == 1) {
    n1 = n1 + ' ' + n2;
    n2 = n3;
  }
  else if (n3) { n2 = n2 + ' ' + n3;} // if 2 word last name
  if (st2 == '') {
    $('#tmplMsg').addClass('errorMsg').text('NO TEXT ENTERED').fadeIn('fast');
    return;
  }
	$.ajax({
		type: 'GET',
		url: 'https://whovox.com/public/loadVoiceCheck.php?firstname=' + n1 + '&lastname=' + n2,
		complete: function(data) {
      var resp = data.responseText.trim();
			if (resp !== 'no') {
        $('#wikiText').html('<span class="ansQ">LOADING...</span>');
        $('#tmplMsg').removeClass('errorMsg').text('VOICE OF?').fadeIn('fast');
				loadVoice(n1, n2);
				}
			else {
        $('#tmplMsg').addClass('errorMsg').text('VOICE NOT FOUND').fadeIn('fast');
        return;
				}
		}
	});
}

 </script>

<br/>

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- whovox single responsive -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-8335048929933055"
     data-ad-slot="5306739925"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

<br/>


</body>
</html>
