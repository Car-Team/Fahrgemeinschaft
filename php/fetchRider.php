<?php
	//@author MHinzmann
	$rideID = $_GET['rideID'];
	
	$db = mysqli_connect("87.230.14.183", "car", "car", "car");
	$db->set_charset("utf8");
	if(!$db)
	{
	  echo "Verbindungsfehler: ".mysqli_connect_error();
	}
	
	$query = "SELECT u.id id, name, picid FROM RidesUsers ru, Users u
						WHERE ru.user = u.id AND ru.ride = '$rideID'";
	$result = mysqli_query($db, $query);
	
	$riders = array();
	while($row = $result->fetch_assoc()){
			$rider = array(
				'id' 		=> intval($row['id']),
				'name'	=> $row["name"],
				'picid'	=> $row['picid']
			);
		array_push($riders, $rider);
	}
	
	echo  $_GET['callback'].'('.json_encode($riders).')';
?>