<?php
header('Content-Type: text/javascript; charset=UTF-8');

$email = $_GET['email'];
$pw = $_GET['pw'];

$db = mysqli_connect("87.230.14.183", "car", "car", "car");
mysqli_query($db, "SET NAMES 'utf8'");
if(!$db)
{
  echo "Verbindungsfehler: ".mysqli_connect_error();
}

$sqlQuery = "SELECT * FROM Users u LEFT JOIN Cars c ON CarID = c.ID WHERE Email = '$email' AND LoginPW = '$pw'";

$result = mysqli_query($db, $sqlQuery);
$rows = $result->num_rows;
$successful = ($rows == 1);

if($successful) {
	$resultData = $result->fetch_array();
	
	$loginResult = array(
        'successful'   		=> $successful,
		'id'				=> $resultData[0],//ID
        'name'         		=> $resultData[2],//Name
        'email'				=> $resultData[3],//Email
        'tel'				=> $resultData[4],//Tel
        'picID'				=> $resultData[5],//PicID
		'carID'				=> $resultData[6],//CarID
		'descriptionUser'	=> $resultData[7],//CarID
		'fb_id'				=> $resultData[8],//FBID
		'modelName'			=> $resultData[10],//ModelName
		'licensePlate'		=> $resultData[11],//LicensePlate
		'seats'				=> $resultData[12],//Seats
		'constructionYear'	=> $resultData[13],//ConstructionYear
		'carPicID'			=> $resultData[14],//PicID
		'descriptionCar'	=> $resultData[15],//PicID
		'colourCar'			=> $resultData[16]//PicID
	);
	echo  $_GET['callback'].'('.json_encode($loginResult) .')';
} else {
	echo  $_GET['callback'].'('.json_encode(array('successful' => false)) .')';
}
?>