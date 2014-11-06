<?php	
	$db = mysqli_connect("87.230.14.183", "car", "car", "car");
	$sqlQuery = "INSERT INTO Rides (
		'price',
		'date',
		'departure_time',
		'departure',
		'destination'
		)
		VALUES (
		'$_GET['price']',
		'$_GET['date']',
		'date("d.m.Y",$timestamp)',
		'date("H:i",$timestamp)',
		'Hamburg',
		'Kiel'
		)";
	$result = mysqli_query($db, $sqlQuery) or die (mysql_error());
	/*$rows = $result->num_rows;
	if($rows>0){
		$successful = (1 == 1);	
	}
	while( $row = mysqli_fetch_assoc( $result ) ) {
	    $commententries[] = $row;
	}
	^*/
	mysqli_close($db);
	echo  $_GET['callback'].'('.json_encode($resultData) .')';
	
?>