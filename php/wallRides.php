<?php
	$viewProfileID = $_GET['viewRideID'];
	$db = mysqli_connect("87.230.14.183", "car", "car", "car");
	mysqli_query($db, "SET NAMES 'utf8'");
	$sqlQuery = "SELECT w.ID, w.ReceiverID, w.SenderID, w.Textinput, w.Timestamp, u.name, u.picID FROM WallsRides w, Users u WHERE w.ReceiverID = '$viewProfileID' AND w.SenderID = u.ID ORDER BY w.Timestamp DESC";
	$result = mysqli_query($db, $sqlQuery) or die (mysql_error());
	//echo "<ul>";//while ($row = mysqli_fetch_array($result))//{//	echo "<li>";//    echo $row['ID'] . " " . $row['Sender'];//    echo "</li>";//}//echo "</ul>";
	$rows = $result->num_rows;
	if($rows>0){
		$successful = (1 == 1);	
	}
	while( $row = mysqli_fetch_assoc( $result ) ) {
	    $wallentries[] = $row;
	}
	echo $_GET['callback'].'('.json_encode($wallentries).')';
?>