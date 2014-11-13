<?php
header('Content-Type: text/javascript; charset=UTF-8');

$name = $_GET['name'];
$fb_id = $_GET['fb_id'];

$signupResult = array(
        'successful'   		=> false,
		'message'			=> ""
	);

$db = mysqli_connect("87.230.14.183", "car", "car", "car");
if(!$db)
{
	$signupResult['successful'] = false;
	$signupResult['message'] = "Verbindungsfehler: ".mysqli_connect_error();
	echo $_GET['callback'].'('.json_encode($signupResult) .')';
}

$sqlQuery = "INSERT INTO `Users`(`Name`,`FBID`) VALUES ('$name','$fb_id');";

mysqli_query($db, $sqlQuery);

$signupResult['successful'] = true;
$signupResult['message'] = "Registrierung erfolgreich!";
echo $_GET['callback'].'('.json_encode($signupResult) .')';

?>