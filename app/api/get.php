<?php

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

date_default_timezone_set('America/Chicago');

include "mysql.php";
  
$time = date("Y-m-d h:i:s");

$json = [];
$moviesArr = [];

$sql = "
SELECT movie, year, filesize, runtime, GROUP_CONCAT(name) as names,
case when movie like 'The %' then trim(substr(movie from 4)) else movie end as movie2
FROM jdh_jdherder.movies
GROUP BY movie2, year
";

if ($result = $mysqli->query("$sql")) {
	while ($obj = $result->fetch_object()) {
		$moviesArr[] = $obj;
	}
} else {
	//query did not work
}

$json['data']['time'] = $time;
$json['data']['movies'] = $moviesArr;

header('Content-type: text/javascript');
echo json_encode($json, JSON_PRETTY_PRINT);