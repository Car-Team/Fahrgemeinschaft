<?php
	//@author MHinzmann
	$userID = $_GET['id'];
	
	$db = mysqli_connect("87.230.14.183", "car", "car", "car");
	$db->set_charset("utf8");
	if(!$db)
	{
	  echo "Verbindungsfehler: ".mysqli_connect_error();
	}
	
	//get debtors
	$debtorQuery = "SELECT u.id id, name, SUM(price) saldo, picid FROM Rides r, RidesUsers ru, Users u
									WHERE ru.ride = r.id AND ru.user = u.id AND driver_id = '$userID' AND concat(r.date, ' ', r.departure_time) < now()
									GROUP BY u.id;";
	$debtorResult = mysqli_query($db, $debtorQuery);
	
	$debtors = array();
	while($row = $debtorResult->fetch_assoc()){
			$person = array(
				'id' 		=> intval($row['id']),
				'name'	=> $row["name"],
				'saldo' 	=> floatval($row['saldo']),
				'picid'	=> $row['picid']
			);
			array_push($debtors, $person);
	}
	
	// get creditors
	$creditorQuery = "SELECT driver_id id, name, SUM(price)*-1 saldo, picid FROM Rides r, RidesUsers ru, Users u
										WHERE ru.ride = r.id AND r.driver_id = u.id AND ru.user = '$userID' AND concat(r.date, ' ', r.departure_time) < now()
										GROUP BY u.id;";
	$creditorResult = mysqli_query($db, $creditorQuery);
	
	$creditors = array();
	while($row = $creditorResult->fetch_assoc()){
		$person = array(
			'id' 		=> intval($row['id']),
			'name'	=> $row['name'],
			'saldo' => floatval($row['saldo']),
			'picid'	=> $row['picid']
		);
		array_push($creditors, $person);
	}
	
	$persons = merge($debtors, $creditors);
	
	echo  $_GET['callback'].'('.json_encode($persons).')';
	
	function merge($debtors, $creditors) {
		$persons = array();
		foreach($debtors as &$debitor) {
			array_push($persons, $debitor);
		}
		foreach($creditors as &$creditor) {
			$index = getIndexOfID($persons, $creditor['id']);
			if($index != -1)
				$persons[$index]['saldo'] = $persons[$index]['saldo'] + $creditor['saldo'];
			else
				array_push($persons, $creditor);
		}
		return $persons;
	}
	
	function getIndexOfID($list, $id){
		$size = count($list);
		for ($i = 0; $i < $size; $i++) {
			if($list[$i]['id'] == $id)
				return $i;
		}
		return -1;
	}
?>