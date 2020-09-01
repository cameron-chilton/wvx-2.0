
var vox;

function loadVoiceRandom() {
  $('#srchVoicesTxt').val('');
  $('#wikiText').html('<span class="ansQ">SEARCHING...</span>');
	$('#tmplMsg').removeClass('errorMsg').text('VOICE OF?').fadeIn('fast');
	$.ajax({
		type: 'GET',
		url: 'loadVoiceRandom.php',
		complete: function(data) {
			var retArr = data.responseText.split('||');
			loadVoice(retArr[4], retArr[5]);
		}
	});
}

function searchVoices() {
	var srchTxt = $('#srchVoicesTxt').val();
	var st2 = srchTxt.split(' '), n1 = st2[0], n2 = st2[1] || '', n3 = st2[2];
  if (n3) { n2 = n2 + ' ' + n3;} // if 2 word last name
  if (st2 == '') {
    $('#tmplMsg').addClass('errorMsg').text('NO TEXT ENTERED').fadeIn('fast');
    return;
  }
	$.ajax({
		type: 'GET',
		url: 'loadVoiceCheck.php?firstname=' + n1 + '&lastname=' + n2,
		complete: function(data) {
      var resp = data.responseText.trim();
			if (resp !== 'no') {
        $('#wikiText').html('<span class="ansQ">SEARCHING...</span>');
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

function loadFirstVoice (first, last) {
	if (first) {
		$.ajax({
			type: 'GET',
			url: 'loadVoiceCheck.php?firstname=' + first + '&lastname=' + last,
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

function loadVoice(nameFirst, nameLast) {
	$.ajax({
		type: 'GET',
		url: 'loadVoice.php?firstname=' + nameFirst + '&lastname=' + nameLast,
		complete: function(data) {
			var retArr = data.responseText.split('||');
			getWikiInfo( toTitleCase(nameFirst), toTitleCase(nameLast) ); // call wiki function
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
					tmplClip.src = "../audio/" + dir + "/" + vox + ".ogg";
					}
				if ( "" != tmplClip.canPlayType('audio/mp3; codecs="mp3"')) {
					tmplClip.src = "../audio/" + dir + "/" + vox + ".mp3";
					}
				}
				else {alert("No Audio Support");}
			} // end data complete
	});

} // end load voice function



// GET WIKIPEDIA TEXT IF VOICE FOUND
function getWikiInfo(nameFirst, nameLast) {
	$('#wikiImg').attr('src', 'imgs/noVox.png');
	var wikiSrchName = !nameLast ?  nameFirst : nameFirst + ' ' + nameLast;
	// get wikipedia text & pic
	$.ajax({
		url: 'scrape.php',
		method: 'POST',
		data: JSON.stringify({'term': wikiSrchName }),
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		}
	}).done(function(data) {
		var prse = JSON.parse(data);
		if (prse) {
			$('#wikiText').empty().scrollTop();
			$('#wikiText').text( (!prse.description) ? 'No text' : prse.description );
			$('#wikiImg').attr('src', (!prse.imageurl) ? 'imgs/noVox.png' : prse.imageurl );
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

// get voice count
function getVoiceCount() {

  $.ajax({
    type: 'GET',
    url: 'getVoiceCount.php',
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
