<?php
	//@author MHinzmann
	
	$userID = $_GET['userID'];
	$debtorID = $_GET['debtorID'];
	
	$user = array(
	
	);
	
	$debtor = array(
		
	);
	
	// $db = mysqli_connect("87.230.14.183", "car", "car", "car");
	// $db->set_charset("utf8");
	// if(!$db)
	// {
	  // echo "Verbindungsfehler: ".mysqli_connect_error();
	// }
	
	// $rides = array();
	
	// $debtsQuery = "	SELECT r.id, r.driver_id driver, price
									// FROM RidesUsers ru, Rides r  
									// WHERE r.id = ru.ride AND r.driver_id = $debtorID AND ru.user = $userID";
	// $debtsResult = mysqli_query($db, $debtsQuery);
	
	// while($row = $debtsResult->fetch_assoc()){
		// array_push($rides, $row);
	// }
	
	// $creditsQuery = "	SELECT r.id, r.driver_id driver, price
										// FROM RidesUsers ru, Rides r  
										// WHERE r.id = ru.ride AND r.driver_id = $userID AND ru.user = $debtorID";
	// $creditsResult = mysqli_query($db, $creditsQuery);
	
	// while($row = $creditsResult->fetch_assoc()){
		// array_push($rides, $row);
	// }

	$name = "KARL";
	
	// $to = $user['email'];
	$to = "mirco.hinzmann@gmail.com";
	$subject = "Abrechnung: Karl";
	$txt = "
	<html>
		<head>
		</head>
		<body>
			<h1>Abrechnung mit $name!</h1>
		</body>
	</html>";
	$headers = 'From: <noreply@carteam.com>';
	$headers .= 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

	mail($to, $subject, $txt, $headers);

	echo $_GET['callback'].'('.json_encode(1).')';
	
?>