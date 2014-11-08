<?php	
	$price = $_GET['price'];
	$date = $_GET['date'];
	$time = $_GET['time'];
	$departure = $_GET['departure'];
	$destination = $_GET['destination'];

	$db = mysqli_connect("87.230.14.183", "car", "car", "car");

	$sqlQuery = "INSERT INTO Rides (price, date, departure_time, departure, destination) 
		VALUES ('".$price."','".$date."','".$time."','".$departure."','".$destination."')";
	
	$result = mysqli_query($db, $sqlQuery) or die (mysql_error());
	
	mysqli_close($db);
	
?>