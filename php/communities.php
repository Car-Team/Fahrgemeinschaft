<?php
$action = $_GET['action'];

$db = mysqli_connect("87.230.14.183", "car", "car", "car");
if(!$db)
{
  exit("Verbindungsfehler: ".mysqli_connect_error());
}

switch ($action) {
    case "getCommunities":
		$userID = $_GET['userID'];

		$sqlQuery = "SELECT Communities.community_id, Community.name
					FROM Communities
					INNER JOIN Community
					ON Communities.community_id=Community.ID
					WHERE Communities.user_id = $userID";
        break;
    case "createCommunity":
   		$userID = mysqli_real_escape_string($db, $_GET['userID']);
    	$communityName = mysqli_real_escape_string($db, $_GET['communityName']);
    	// $userID = $_GET['userID'];
    	// $communityName = $_GET['communityName'];

		$sqlQuery = "INSERT INTO Community (creator_id, name)
					VALUES ('".$userID."', '".$communityName."')";
    	break;
}


$result = mysqli_query($db, $sqlQuery);

while($row = $result->fetch_assoc()){
	$resultData[] = $row;
}

mysqli_close($db);
echo  $_GET['callback'].'('.json_encode($resultData) .')';
?>