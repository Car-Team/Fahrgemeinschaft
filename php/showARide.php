<?php
$viewRideID = $_POST['viewRideID'];
$db = mysqli_connect("87.230.14.183", "car", "car", "car");
if(!$db)
{
  exit("Verbindungsfehler: ".mysqli_connect_error());
}
mysqli_query($db, "SET NAMES 'utf8'");
$sqlQuery = "SELECT r.ID,r.group,r.driver_id,r.price,r.date,r.departure_time,r.departure,r.destination,r.free_places,c.ModelName,r.ride_infos,u.name FROM Rides r, Users u, Cars c WHERE  r.ID = '$viewRideID' AND r.driver_id = u.ID AND r.car_name = c.ID";
	

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
		'name'					=> $resultData[11]//Seats

	);
	exit(json_encode($viewRideResult));
} else {
	exit(json_encode(array('successful' => false)));
}
	
?>