<?php
$userID = $_POST['userID'];


$db = mysqli_connect("87.230.14.183", "car", "car", "car");
if(!$db)
{
  exit("Verbindungsfehler: ".mysqli_connect_error());
}

$sqlQuery = "SELECT communities.community_id, community.name
			FROM communities
			INNER JOIN community
			ON communities.community_id=community.ID
			WHERE communities.user_id = ".$userID;

$result = mysqli_query($db, $sqlQuery);

while($row = $result->fetch_assoc()){
	$resultData[] = $row;
}

mysqli_close($db);
exit(json_encode($resultData));	
?>