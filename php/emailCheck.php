<?php
header('Content-Type: text/javascript; charset=UTF-8');

$email = $_GET['email'];

$result = array(
  'successful' 	=> false,
	'message'			=> ""
);

$db = mysqli_connect("87.230.14.183", "car", "car", "car");
if(!$db)
{
	$result['successful'] = false;
	$result['message'] = "Verbindungsfehler: ".mysqli_connect_error();
	echo $_GET['callback'].'('.json_encode($result) .')';
}

$emailCheck = "SELECT * FROM Users WHERE Email = '$email'";
$emailCheckResult = mysqli_query($db, $emailCheck);
$emailAlreadyExists = $emailCheckResult->num_rows != 0;

if($emailAlreadyExists){
	$result['successful'] = false;
	echo $_GET['callback'].'('.json_encode($result) .')';
}
	$result['successful'] = false;
	echo $_GET['callback'].'('.json_encode($result) .')';
?>