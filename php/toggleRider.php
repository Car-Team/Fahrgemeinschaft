<?php
	//@author MHinzmann
	$rideID = $_GET['rideID'];
	$userID = $_GET['userID'];
	
	$db = mysqli_connect("87.230.14.183", "car", "car", "car");
	$db->set_charset("utf8");
	if(!$db)
	{
	  echo $_GET['callback'].'('."Verbindungsfehler: ".mysqli_connect_error().')';
	}
	
	$query = "SELECT * 
						FROM RidesUsers
						WHERE ride = '$rideID' AND User = '$userID'";
	$result = mysqli_query($db, $query);
	
	$isRider = ($result->num_rows == 1);
	
	if($isRider)
		removeRider($db, $rideID, $userID);
	else
		addRider($db, $rideID, $userID);
	
	function removeRider($db, $rideID, $userID) {
		$query = "DELETE 
							FROM RidesUsers
							WHERE ride = '$rideID' AND User = '$userID';";
		$result = mysqli_query($db, $query);
	
		echo  $_GET['callback'].'('.json_encode("Remove Successful").')';
	}
	
	function addRider($db, $rideID, $userID) {
		$query = "INSERT 
							INTO RidesUsers
							(Ride, User) VALUES ($rideID, $userID);";
		$result = mysqli_query($db, $query);
		
		echo  $_GET['callback'].'('.json_encode("Add Successful").')';
	}
?>