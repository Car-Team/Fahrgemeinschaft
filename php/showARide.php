<?php
header('Content-Type: text/javascript; charset=UTF-8');
$viewRideID = $_GET['viewRideID'];
$db = mysqli_connect("87.230.14.183", "car", "car", "car");
if(!$db)
{
  exit("Verbindungsfehler: ".mysqli_connect_error());
}
mysqli_query($db, "SET NAMES 'utf8'");
$sqlQuery = "SELECT r.ID,r.groupID,r.driver_id,r.price,r.date,r.departure_time,r.departure,r.destination,r.free_places,c.ModelName,r.ride_infos,u.name,u.ID 
FROM Rides r 
LEFT JOIN Users u ON r.driver_id = u.ID 
LEFT JOIN Cars c ON r.car_name = c.ID WHERE  r.ID = '$viewRideID'";
	

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
		'ride_infos'			=> $resultData[10],//Seats
		'name'					=> $resultData[11],//Seats
       'userID'					=> $resultData[12]//Seats

	);
	echo $_GET['callback'].'('.json_encode($viewRideResult).')';
} else {
	echo $_GET['callback'].'('.json_encode(array('successful' => false)).')';
}
	
?>