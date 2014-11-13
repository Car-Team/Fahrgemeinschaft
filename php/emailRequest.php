<?php
header('Content-Type: text/javascript; charset=UTF-8');

$email = $_GET['email'];
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

$emailCheck = "SELECT * FROM Users WHERE Email = '$email'";
$emailCheckResult = mysqli_query($db, $emailCheck);
$emailAlreadyExists = $emailCheckResult->num_rows != 0;

if($emailAlreadyExists){
	$signupResult['successful'] = false;
	$signupResult['message'] = "Die angegebene Email-Adresse existiert bereits!";
	echo $_GET['callback'].'('.json_encode($signupResult) .')';
}

$sqlQuery = "UPDATE `Users` SET `Email`='$email' Where `FBID`='$fb_id';";

mysqli_query($db, $sqlQuery);

$signupResult['successful'] = true;
$signupResult['message'] = "E-Mail erfolgreich gespeichert!";
echo $_GET['callback'].'('.json_encode($signupResult) .')';
?>