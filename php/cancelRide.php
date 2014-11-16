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
	
	$queryRides = "DELETE FROM Rides WHERE id = $rideID";
	$result = mysqli_query($db, $queryRides);
	
	$queryRidesUsers = "DELETE FROM RidesUsers WHERE Ride = $rideID";
	$result = mysqli_query($db, $queryRidesUsers);
	
	echo $_GET['callback'].'('.json_encode("Die Fahrt wurde erfolgreich abgebrochen!").')';	
	
?>