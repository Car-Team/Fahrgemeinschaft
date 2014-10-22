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
						
			$result = mysqli_query($db, $sqlQuery);

			while($row = $result->fetch_assoc()){
				$resultData[] = $row;
			};
	        break;
	    case "createCommunity":
	   		$userID = mysqli_real_escape_string($db, $_GET['userID']);
	    	$communityName = mysqli_real_escape_string($db, $_GET['communityName']);

			$sqlQuery = "START TRANSACTION";
			$resultData = mysqli_query($db, $sqlQuery);
			$sqlQuery = "INSERT INTO Community (creator_id, name) VALUES('".$userID."', '".$communityName."')";
			$resultData = mysqli_query($db, $sqlQuery);
				if(!$resultData)
					break;
			$sqlQuery = "INSERT INTO Communities (user_id, community_id) VALUES('".$userID."', LAST_INSERT_ID())";
			$resultData = mysqli_query($db, $sqlQuery);
				if(!$resultData)
					break;
			$sqlQuery = "COMMIT";
			$resultData = mysqli_query($db, $sqlQuery);
	    	break;
	    case "loadCommunity":
	    	$communityID = mysqli_real_escape_string($db, $_GET['communityID']);
	    	$sqlQuery = "SELECT name FROM Community WHERE ID = '".$communityID."'";
	    	$result = mysqli_query($db, $sqlQuery);
	    	$resultData = $result->fetch_assoc();
	    	break;
	};

	mysqli_close($db);
	echo  $_GET['callback'].'('.json_encode($resultData) .')';
?>