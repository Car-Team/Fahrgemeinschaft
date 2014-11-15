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
	$sqlQuery = "INSERT INTO `Rides` (`price`, `date`, `departure_time`, `departure`, `destination`, `free_places`, `car_name`, `ride_infos`, `driver_id`, `groupID`) 
		VALUES ('$price','$date','$time','$departure','$destination','$freePlaces', '$carName','$rideInfos','$userID','$groupID')";
	mysqli_query($db, $sqlQuery);
	echo $_GET['callback'].'('.json_encode("Post erfolgreich verschickt").')';
?>