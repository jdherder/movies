<?php

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

date_default_timezone_set('America/Chicago');

include "mysql.php";
  
$time = date("Y-m-d h:i:s");

$data = file_get_contents('php://input');

$json = json_Decode($data);

$name = $json->data->name;
$movies = $json->data->movies;

if (count($movies) > 0 && $name != '') {
	$sql = "
	DELETE FROM movies
	WHERE name = '$name'
	";

	$result = mysqli_query($mysqli, $sql) or trigger_error("Query Failed! SQL: $sql - Error: ".mysqli_error($mysqli), E_USER_ERROR);
}

$index = 1;
foreach ($movies as $movie) {
	$title = $movie->Name;
	$length = ($movie->TotalTime > 0) ? $movie->TotalTime : 0;
	$year = ($movie->Year > 0) ? $movie->Year : 0;
	$video_height = 0;
	$video_width = 0;
	$size = ($movie->Size > 0) ? $movie->Size : 0;
	$kind = $movie->Kind;
	$rating = ($movie->Rating > 0) ? $movie->Rating : 0;

	$title = $mysqli->real_escape_string($title);

	$sql = "
	REPLACE INTO movies
	SET
	name = '$name',
	movie = '$title',
	runtime = $length,
	year = $year,
	video_height = $video_height,
	video_width = $video_width,
	filesize = $size,
	kind = '$kind',
	rating = $rating,
	time = NOW()
	";

	echo "$index: $sql \n\n";

	if ($name != '' && $title != '' && $length > 0) {
		$result = mysqli_query($mysqli, $sql) or trigger_error("Query Failed! SQL: $sql - Error: ".mysqli_error($mysqli), E_USER_ERROR);
	}

	$index++;
}

?>