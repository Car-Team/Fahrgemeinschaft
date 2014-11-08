<?php
$name = $_POST['name'];
$email = $_POST['email'];
$pw = $_POST['pw'];

$signupResult = array(
        'successful'   		=> false,
		'message'			=> ""
	);

$db = mysqli_connect("87.230.14.183", "car", "car", "car");
if(!$db)
{
	$signupResult['successful'] = false;
	$signupResult['message'] = "Verbindungsfehler: ".mysqli_connect_error();
	exit(json_encode($signupResult));
}

$emailCheck = "SELECT * FROM Users WHERE Email = '$email'";
$emailCheckResult = mysqli_query($db, $emailCheck);
$emailAlreadyExists = $emailCheckResult->num_rows != 0;

if($emailAlreadyExists){
	$signupResult['successful'] = false;
	$signupResult['message'] = "Die angegebene Email-Adresse existiert bereits!";
	exit(json_encode($signupResult));
}

$sqlQuery = "INSERT INTO `Users`(`LoginPW`, `Name`, `Email`, `PicID`, `CarID`) VALUES ('$pw','$name','$email',0,0);";

mysqli_query($db, $sqlQuery);

$signupResult['successful'] = true;
$signupResult['message'] = "Registrierung erfolgreich!";
exit(json_encode($signupResult));
?>