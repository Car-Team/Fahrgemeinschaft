<?php
	$loginID = $_POST['loginID'];
	$loginName = $_POST['loginName'];

	$db = mysqli_connect("87.230.14.183", "car", "car", "car");
	mysqli_query($db, "SET NAMES 'utf8'");
	$sqlQuery = "SELECT c.ID, c.WallID, c.ReceiverID, c.SenderID, c.Textinput, c.Timestamp, u.name FROM Comments c, Users u WHERE c.ReceiverID = '$loginID' AND c.SenderID = u.ID ORDER BY c.Timestamp ASC";
	$result = mysqli_query($db, $sqlQuery) or die (mysql_error());
	//echo "<ul>";//while ($row = mysqli_fetch_array($result))//{//	echo "<li>";//    echo $row['ID'] . " " . $row['Sender'];//    echo "</li>";//}//echo "</ul>";
	$rows = $result->num_rows;
	if($rows>0){
		$successful = (1 == 1);	
	}
	while( $row = mysqli_fetch_assoc( $result ) ) {
	    $commententries[] = $row;
	}

	echo json_encode($commententries);
?>