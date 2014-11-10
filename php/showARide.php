<?php
	echo "php läuft";
	$db = mysqli_connect("87.230.14.183", "car", "car", "car");

	$sqlQuery = "SELECT * FROM Rides WHERE ID = 9";
	
	$result = mysqli_query($db, $sqlQuery) or die (mysql_error());
	echo $result;
	
	while($row = $result->fetch_assoc()){
		$resultData[] = $row;
	};
	
	mysqli_close($db);
	
?>