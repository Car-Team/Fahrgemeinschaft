<?php
	$db = mysqli_connect("87.230.14.183", "car", "car", "car");

	$sqlQuery = "SELECT * FROM Rides";
	
	$result = mysqli_query($db, $sqlQuery) or die (mysql_error());
	printf($result);
	while($row = $result->fetch_assoc()){
		$resultData[] = $row;
	};

	mysqli_close($db);
	
?>