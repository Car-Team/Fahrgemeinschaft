<?php

$db = mysqli_connect("87.230.14.183", "car", "car", "car");
if(!$db)
{
  exit("Verbindungsfehler: ".mysqli_connect_error());
}
$sqlQuery = "SELECT `ID`,`group`,`driver_id`,`price`,`date`,`departure_time`,`departure`,`destination`,`free_places`,`car_name`,`ride_infos` FROM `Rides` WHERE `ID` = 9";
	

$result = mysqli_query($db, $sqlQuery);
$rows = $result->num_rows;
$successful = ($rows == 1);

if($successful) {
	$resultData = $result->fetch_array();
	
	$viewRideResult = array(
        'successful'   			=> $successful,
		'ID'					=> $resultData[0],//ID
        'group'         		=> $resultData[1],//Name
        'driver_id'				=> $resultData[2],//Email
        'price'					=> $resultData[3],//Tel
        'date'					=> $resultData[4],//PicID
		'departure_time'		=> $resultData[5],//CarID
		'departure'				=> $resultData[6],//CarID
		'destination'			=> $resultData[7],//FBID
		'free_places'			=> $resultData[8],//ModelName
		'car_name'				=> $resultData[9],//LicensePlate
		'ride_infos'			=> $resultData[10]//Seats

	);
	exit(json_encode($viewRideResult));
} else {
	exit(json_encode(array('successful' => false)));
}
	
?>