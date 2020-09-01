<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Content-Type');
setcookie('key', 'value', ['samesite' => 'None', 'secure' => true]);
class scrapeAPI {
    // Main method
	  private $db;

    // Constructor - open DB connection
    function __construct() {
    }

    // Destructor - close DB connection
    function __destruct() {
    }

	//
    	// Main method to search for terms
	//
    function searchsource($term) {

		$thisterm = rawurlencode(trim($term));
    $url = "https://en.wikipedia.org/wiki/";    // really the field is searchurl in db table

		$loopcnt = 0;
		$again = true;
		while ($again == true and $loopcnt < 2)
		{
		$thisurl = $url.$thisterm;                    // add the term we are searching for
		$ch = curl_init();

		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_URL, $thisurl);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);

		$html = curl_exec($ch);

		$info = curl_getinfo($ch);
		//print_r($info); // prints all the info array

		//  get article url, replace value used to retrieve html with effective url used by host
		//$scraped["articleurl"] = $info["url"];
		$url = $info["url"];
		curl_close($ch);


		//parsing begins here:
		$doc = new DOMDocument();
		$doc->validateOnParse = true;
		@$doc->loadHTML($html);

		//get title
		$nodes = $doc->getElementsByTagName('title');
		$title = $nodes->item(0)->nodeValue;
		$title = str_replace(' - Wikipedia', '', $title);
		$scraped["title"] = $title;


		// get last edited / published
	    $pos = strpos($html, 'footer-info-lastmod"> This page was last edited on ');
		if ($pos === false) {
			$scraped["published"] = '';
		}
		else
		{
			$subhtml = substr($html, $pos + 51);
			$pos2 = strpos($subhtml , ',');
			$lastedit = substr($subhtml, 0, $pos2);
			$scraped["published"] = $lastedit;

		}
	    //  get image
		$pos = strpos($html, '<meta property="og:image" content="') ;
		if ($pos === false) {
			$scraped["imageurl"] = '';
		}
		else
		{
			$subhtml = substr($html, $pos + 35);
			$pos2 = strpos($subhtml , '"/>');
			$img = substr($subhtml, 0, $pos2);
			$scraped["imageurl"] = $img;
		}


		// get description
		$pos = strpos($html, 'Wikipedia does not have an article with this exact name.') ;
		if ($pos !== false) {
			$loopcnt++;
			$scraped["description"] = 'Wikipedia does not have an article with this exact name.';

			$wpos = strpos($thisterm , ' ');
			if ($wpos !== false )   // more than one word, loop again
			{
				$word = explode(" ", $thisterm);
				$thisterm = $word[0];
			}
		}
		else   // use API to get description
		{
			$again = false;
		//   sample api call https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=NASA

			$url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=';
			$normalized = str_replace(' ', '_', $scraped["title"]);
			$url .= $normalized;      // get title from returned page and attempt to feed it to API

			$ch = curl_init();

		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_URL, $url);
		//curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);

		$result = curl_exec($ch);
			curl_close($ch);

			$json = json_decode($result, true);
			$extract = array();
			foreach ($json['query']['pages'] as $page) {
			$extract[] = $page['extract'];
				break;          // just get first one
			}
			$scraped["description"] = $extract[0];   //
		}
		}
		echo json_encode($scraped);

	}

}
// ----------- This is the first code called ----------------------------------
// determine wether this is a get or a post
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'),true);
switch ($method) {
  case 'GET':
	{
     if (isset($_GET["source"])) {
        // Put parameters into local variables
        $psource = $_GET["source"];
     }
     else
     {
    	$psource = '18';   // wikipedia
     }
     $scrape_api = new scrapeAPI;
     //$rand_api->searchsource('');
	 break;
    }

  case 'POST':
		{
			 $psource = "";
			 if (isset($input["source"]))    //
			 {
				 $psource = $input["source"];
			 }
			 //   term
			 $pterm = "";
			 if (isset($input["term"]))    //
			 {
				 $pterm = $input["term"];
			 }

            $rand_api = new scrapeAPI;
            $rand_api->searchsource($pterm);
			break;
		}

   } // switch
  ?>
