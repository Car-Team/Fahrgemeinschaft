<?php
	$loginID = $_POST['loginID'];
	$loginName = $_POST['loginName'];

	$db = mysqli_connect("87.230.14.183", "car", "car", "car");
	mysqli_query($db, "SET NAMES 'utf8'");
	$sqlQuery = "SELECT w.ID, w.ReceiverID, w.SenderID, w.Textinput, w.Timestamp, u.name FROM Walls w, Users u WHERE w.ReceiverID = '$loginID' AND w.SenderID = u.ID ORDER BY w.Timestamp DESC";
	$result = mysqli_query($db, $sqlQuery) or die (mysql_error());
	//echo "<ul>";//while ($row = mysqli_fetch_array($result))//{//	echo "<li>";//    echo $row['ID'] . " " . $row['Sender'];//    echo "</li>";//}//echo "</ul>";
	$rows = $result->num_rows;
	if($rows>0){
		$successful = (1 == 1);	
	}
	while( $row = mysqli_fetch_assoc( $result ) ) {
	    $wallentries[] = $row;
	}
	echo json_encode($wallentries);
?>