<?php	
	$price = $_GET['price'];
	$date = $_GET['date'];
	$time = $_GET['time'];
	$departure = $_GET['departure'];
	$destination = $_GET['destination'];
	$freePlaces = $_GET['freePlaces'];
	$carName = $_GET['carName'];
	$rideInfos = $_GET['rideInfos'];
	$userName = $_GET['userName'];
	$userID = $_GET['userID'];
	$groupID = $_GET['groupID'];


	$db = mysqli_connect("87.230.14.183", "car", "car", "car");
	mysqli_query($db, "SET NAMES 'utf8'");
	$sqlQuery = "INSERT INTO `Rides` (`price`, `date`, `departure_time`, `departure`, `destination`, `free_places`, `car_name`, `ride_infos`, `driver_id`, `group`) 
		VALUES ('$price','$date','$time','$departure','$destination','$freePlaces', '$carName','$rideInfos','$userID','$groupID')";
	

	//$sqlQuery = "INSERT INTO `Rides` (`group`) VALUES ('$groupID')";
	//$sqlQuery = "INSERT INTO `Walls`(`ReceiverID`, `SenderID`, `Textinput`) VALUES ('$viewProfileID','$loginID','$text')"; //, `Timestamp`



	$result = mysqli_query($db, $sqlQuery) or die (mysql_error());
	
	if (!$result) {
    echo "DB Fehler, konnte die Datenbank nicht abfragen\n";
    echo 'MySQL Error: ' . mysql_error();
    exit;
	}
	mysqli_close($db);
	
?>