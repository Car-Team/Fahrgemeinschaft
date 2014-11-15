<?php
	$userID = $_GET['id'];
	
	$db = mysqli_connect("87.230.14.183", "car", "car", "car");
	$db->set_charset("utf8");
	if(!$db)
	{
	  echo "Verbindungsfehler: ".mysqli_connect_error();
	}
	
	//get debtors
	$debtorQuery = "SELECT u.id id, name, SUM(debt) debt, picid FROM Rides r, RidesUsers ru, Users u
									WHERE ru.ride = r.id AND ru.user = u.id AND driver_id = '$userID'
									GROUP BY user;";
	$debtorResult = mysqli_query($db, $debtorQuery);
	
	$debtors = array();
	while($row = $debtorResult->fetch_assoc()){
		$debtor = array(
			'id' 		=> intval($row['id']),
			'name'	=> $row["name"],
			'debt' 	=> floatval($row['debt']),
			'picid'	=> $row['picid']
		);
		array_push($debtors, $debtor);
	}
	
	// get creditors
	$creditorQuery = "SELECT driver_id id, name, SUM(debt) debt, picid FROM Rides r, RidesUsers ru, Users u
										WHERE ru.ride = r.id AND r.driver_id = u.id AND ru.user = '$userID'
										GROUP BY user;";
	$creditorResult = mysqli_query($db, $creditorQuery);
	
	$creditors = array();
	while($row = $creditorResult->fetch_assoc()){
		$creditor = array(
			'id' 		=> intval($row['id']),
			'name'	=> $row['name'],
			'debt' 	=> -floatval($row['debt']),
			'picid'	=> $row['picid']
		);
		array_push($creditors, $creditor);
	}
	
	$persons = array(
		'creditors' => $creditors,
		'debtors' 	=> $debtors
	);
	
	echo  $_GET['callback'].'('.json_encode($persons).')';
?>