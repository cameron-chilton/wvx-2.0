<?php
	// PDO connect
	$servername = '127.0.0.1:3306';
  $username = 'u465391481_whovoxAdmin';
  $password = '91*Stanza';
	try {
      $DB = new PDO("mysql:host=$servername;dbname=u465391481_whovox_db", $username, $password);
	    $DB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	    }
	    catch(PDOException $e) {
		    echo 'ERROR: ' . $e->getMessage();
		    }
	$apicnt = 0; // counter for loop
	$nameArray; // array of names

	/* voice firstname lastname */
	$sth = $DB->prepare('SELECT FIRSTNAME, LASTNAME FROM voices ORDER BY LASTNAME asc');
	$sth->execute();

	/* Fetch all of the remaining rows in the result set */
	$result = $sth->fetchAll();
	//echo print_r($result);

	// write header
	header('Content-type: text/xml');

	$xmlheader = '<?xml version="1.0" encoding="UTF-8"?>';
	$xmlheader .= '<urlset xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
	echo $xmlheader;

	// get current date time:  Updated ISO8601
	date_default_timezone_set('America/New_York');
	$datetime = new DateTime(date('Y-m-d h:i:s', time()));
	$date = $datetime->format(DateTime::ATOM);

	// hard code links
	$entry = "<url><loc>https://whovox.com</loc><lastmod>".$date."</lastmod><changefreq>hourly</changefreq><priority>1.00</priority></url>";
	echo nl2br($entry);
  $entry = "<url><loc>https://whovox.com/index.html</loc><lastmod>".$date."</lastmod><changefreq>hourly</changefreq><priority>1.00</priority></url>";
	echo nl2br($entry);
	$entry = "<url><loc>https://whovox.com/public/voiceOf.php</loc><lastmod>".$date."</lastmod><changefreq>always</changefreq><priority>0.9</priority></url>";
	echo nl2br($entry);
	$entry = "<url><loc>https://whovox.com/public/privacy-policy.html</loc><lastmod>".$date."</lastmod><changefreq>always</changefreq><priority>0.9</priority></url>";
	echo nl2br($entry);

	// get voice names from db
	if ($result) {

		$xmlcontent = "";
		$entry1 = "";
		$entry2 = "";
		$entry3 = "";

		for ($x = 0; $x < count($result); $x++) {
			// underscore
			$first1 =  $result[$x]['FIRSTNAME'];
			$last1 =  $result[$x]['LASTNAME'];
			if ($last1 == '') {
				$entry1 = '<url><loc>https://whovox.com/'.$first1.'.html</loc><lastmod>'.$date.'</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>';
			}
			else {
				$entry1 = '<url><loc>https://whovox.com/'.$first1.'_'.$last1.'.html</loc><lastmod>'.$date.'</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>';
			}
			echo nl2br($entry1);
			// space
			$first2 =  $result[$x]['FIRSTNAME'];
			$last2 =  $result[$x]['LASTNAME'];
			if ($last2 == '') {
				$entry2 = '<url><loc>https://whovox.com/'.$first2.'.html</loc><lastmod>'.$date.'</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>';
			}
			else {
				$entry2 = '<url><loc>https://whovox.com/'.$first2.' '.$last2.'.html</loc><lastmod>'.$date.'</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>';
			}
			echo nl2br($entry2);
			// %20
			$first3 =  $result[$x]['FIRSTNAME'];
			$last3 =  $result[$x]['LASTNAME'];
			if ($last3 == '') {
				$entry3 = '<url><loc>https://whovox.com/'.$first3.'.html</loc><lastmod>'.$date.'</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>';
			}
			else {
				$entry3 = '<url><loc>https://whovox.com/'.$first3.'%20'.$last3.'.html</loc><lastmod>'.$date.'</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>';
			}
			echo nl2br($entry3);
		}  // end for loop
		echo '</urlset>';

	} // end if result

// close db conn
$DB = null;

?>
