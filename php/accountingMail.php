<?php
	//@author MHinzmann
	$userID = $_GET['userID'];
	$debtorID = $_GET['debtorID'];
	$saldo = $_GET['saldo'];
	
	// db-connection
	$db = mysqli_connect("87.230.14.183", "car", "car", "car");
	$db->set_charset("utf8");
	if(!$db)
	{
	  echo "Verbindungsfehler: ".mysqli_connect_error();
	}
	
	//fetch userdata
	$userQuery = "SELECT name, email FROM Users WHERE id = $userID";
	$userResult = mysqli_query($db, $userQuery);
	$user = $userResult->fetch_assoc();
	
	//fetch debtordata
	$debtorQuery = "SELECT name, email FROM Users WHERE id = $debtorID";
	$debtorResult = mysqli_query($db, $debtorQuery);
	$debtor = $debtorResult->fetch_assoc();
	
	$debtsQuery = "	SELECT c.name communityName, r.driver_id driver, price, r.date, r.departure, r.destination
									FROM RidesUsers ru, Rides r, Community c 
									WHERE r.id = ru.ride AND c.id = r.groupID AND r.driver_id = $debtorID AND ru.user = $userID AND concat(r.date, ' ', r.departure_time) < now() AND Accounted = 0";
	$debtRidesResult = mysqli_query($db, $debtsQuery);
	$debtRides = fetchRides($debtRidesResult);
	
	$creditsQuery = "	SELECT c.name communityName, r.driver_id driver, price, r.date, r.departure, r.destination
										FROM RidesUsers ru, Rides r, Community c 
										WHERE r.id = ru.ride AND c.id = r.groupID AND r.driver_id = $userID AND ru.user = $debtorID AND concat(r.date, ' ', r.departure_time) < now() AND Accounted = 0";
	$creditRidesResult = mysqli_query($db, $creditsQuery);
	$creditRides = fetchRides($creditRidesResult);
	
	//build and send email
	$userName = $user['name'];
	$debtorName = $user['name'];
	
	// mail to user
	$toUser = $user['email'];
	$subjectUser = "Abrechnung: $debtorName";
	$txtUser = buildMail($debtorName, $saldo, $debtRides, $creditRides);

	// mail to debtor
	$toDebtor = $debtor['email'];
	$subjectDebtor = "Abrechnung: $userName";
	$txtDebtor = buildMail($userName, $saldo * -1, $creditRides, $debtRides);

	
	// configure headers
	$headers = 'From: <noreply@carteam.com>';
	$headers .= 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
	
	// send
	mail($toUser, $subjectUser, $txtUser, $headers);
	mail($toDebtor, $subjectDebtor, $txtDebtor, $headers);
	
	//remove user and debtor from rides
	updateRides();
	
	echo $_GET['callback'].'('.json_encode("Ihnen wurde die Abrechnung per E-Mail zugeschickt.").')';	

	function fetchRides($ridesResult) {
		$rides = array();
		
		while($rideResult = $ridesResult->fetch_assoc()){
			$ride = array(
				'communityName' 	=> $rideResult['communityName'],
				'date' 						=> $rideResult['date'],
				'departure' 			=> $rideResult['departure'],
				'destination' 		=> $rideResult['destination'],
				'price' 					=> $rideResult['price']
			);
			array_push($rides, $ride);
		}
		return $rides;
	}
	
	function buildMail($debtor, $saldo, $debtRides, $creditRides){
		$txt = "";
		$txt .="
		<html>
			<head>
			</head>
			<body>
				<h1>Abrechnung mit $debtor!</h1>
				</br>
		";
		
		$txt .= "<h3>";
		if($saldo > 0)
			$txt .= "Sie bekommen noch $saldo Euro von $debtor!";
		else if ($saldo < 0){
			$positiveSaldo = $saldo * -1;
			$txt .= "Sie müssen $debtor noch $positiveSaldo Euro überweisen!";
		}else
			$txt .= "Die Verbindlichkeiten/Forderungen zwischen Ihnen und $debtor sind ausgeglichen!";
		$txt .= "</h3>";
	
		if(count($creditRides) > 0){
			$txt .= "<h2>Forderungen:</h2>";
			$txt .= buildRides($creditRides, "green");
		}
		if(count($debtRides) > 0){
			$txt .= "<h2>Verbindlichkeiten:</h2>";
			$txt .= buildRides($debtRides, "red");
		}
		
		$txt .=
	 "		<h3> Viele liebe Gruesse, Ihr CarTeam </h3>
			</body>
		</html>
	 ";
		return $txt;
	}
	
	// Function to add a row with all the data of the rides
	function buildRides($rides, $color) {
		$txt = "<ul>";
		foreach ($rides as &$ride) {
			$communityName 	= $ride['communityName'];
			$date 					= $ride['date'];
			$departure 			= $ride['departure'];
			$destination 		= $ride['destination'];
			$price 					= $ride['price'];
			$txt .="
			<div>
				<font size = 5>
					$communityName: $date $departure nach $destination -
					<font color='$color' style='float:right'>$price</font>
				</font>
			</div>
			";
		}
		$txt .="</ul>";
		return $txt;
	}
	
	function updateAccounting(userID, debtorID) {
		$queryUser = 		"UPDATE RidesUsers ru
										INNER JOIN
										Rides r
										ON
										ru.ride = r.id
										SET Accounted = 1
										WHERE r.driver_id = $debtorID AND ru.user = $userID 
										AND concat(r.date, ' ', r.departure_time) < now() AND Accounted = 0";
		$queryDebtor = 	"UPDATE RidesUsers ru
										INNER JOIN
										Rides r
										ON
										ru.ride = r.id
										SET Accounted = 1
										WHERE r.driver_id = $userID AND ru.user = $debtorID 
										AND concat(r.date, ' ', r.departure_time) < now() AND Accounted = 0";
		mysqli_query($db, $queryUser);
		mysqli_query($db, $queryDebtor);
	}
?>