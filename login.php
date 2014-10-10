<?php
$loginName = $_POST['loginName'];
$loginPw = $_POST['loginPw'];

$db = mysqli_connect("87.230.14.183", "car", "car", "car");
if(!$db)
{
  exit("Verbindungsfehler: ".mysqli_connect_error());
}

$sqlQuery = "SELECT * FROM Users u LEFT JOIN Cars c ON CarID = c.ID WHERE LoginName = '$loginName' AND LoginPW = '$loginPw'";

$result = mysqli_query($db, $sqlQuery);
$rows = $result->num_rows;
$successful = ($rows == 1);

if($successful) {
	$resultData = $result->fetch_array();
	
	$loginResult = array(
        'successful'    	=> $successful,
		'id'				=> $resultData[0],//ID
        'name'          	=> $resultData[3],//Name
        'email'				=> $resultData[4],//Email
        'tel'				=> $resultData[5],//Tel
        'picID'				=> $resultData[6],//PicID
		'carID'				=> $resultData[7],//CarID
		'modelName'			=> $resultData[9],//ModelName
		'licensePlate'		=> $resultData[10],//LicensePlate
		'seats'				=> $resultData[11],//Seats
		'constructionYear'	=> $resultData[12],//ConstructionYear
		'carPicID'			=> $resultData[13]//PicID
	);
	exit(json_encode($loginResult));
} else {
	exit(json_encode(array('successful' => false)));
}
?>