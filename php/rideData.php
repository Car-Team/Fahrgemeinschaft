<?php
	//@author MHinzmann
	$rideID = $_GET['rideID'];
	
	// db-connection
	$db = mysqli_connect("87.230.14.183", "car", "car", "car");
	$db->set_charset("utf8");
	if(!$db)
	{
	  echo "Verbindungsfehler: ".mysqli_connect_error();
	}
	
	$query = "SELECT driver_id driverID, concat(date, ' ', departure_time) date FROM Rides WHERE id = $rideID";
	$result = mysqli_query($db, $query);
	$row = $result->fetch_assoc();
	
	$answer = array(
		'driverID' 	=> $row['driverID'],
		'date' 			=> $row['date']
	);
	
	echo $_GET['callback'].'('.json_encode($answer).')';	
?>