<?php
header('Content-Type: text/javascript; charset=UTF-8');

$email = $_GET['email'];

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

$sqlQuery = "INSERT INTO `Users`(`Email`) VALUES ('$email');";

mysqli_query($db, $sqlQuery);

$signupResult['successful'] = true;
$signupResult['message'] = "Registrierung erfolgreich!";
echo $_GET['callback'].'('.json_encode($signupResult) .')';
?>