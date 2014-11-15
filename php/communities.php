<?php
	$action = $_GET['action'];

	$db = mysqli_connect("87.230.14.183", "car", "car", "car");
	$db->set_charset("utf8");
	if(!$db)
	{
	  exit("Verbindungsfehler: ".mysqli_connect_error());
	}

	switch ($action) {
	    case "getCommunities":
			$userID = mysqli_real_escape_string($db, $_GET['userID']);

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
	    	$sqlQuery = "SELECT name, creator_id FROM Community WHERE ID = '".$communityID."'";
	    	$result = mysqli_query($db, $sqlQuery);
	    	$resultData = $result->fetch_assoc();
	    	$sqlQuery = "SELECT Users.Name, Users.PicID, Users.ID
						FROM Communities
						INNER JOIN Users
						ON Communities.user_id=Users.ID
						WHERE Communities.community_id = $communityID";
	    	$result = mysqli_query($db, $sqlQuery);
	    	while($row = $result->fetch_assoc()){
				$resultData['members'][] = $row;
			};
	    	$sqlQuery = "SELECT Users.Email, Users.ID
						FROM Invites
						INNER JOIN Users
						ON Invites.user_id=Users.ID
						WHERE community_id = $communityID";
	    	$result = mysqli_query($db, $sqlQuery);
	    	while($row = $result->fetch_assoc()){
				$resultData['invites'][] = $row;
			};
	    	$sqlQuery = "SELECT Rides.ID, Rides.date, Rides.departure_time, Rides.departure, Rides.destination 
						FROM Rides
						WHERE groupID = $communityID Order By Rides.date";
	    	$result = mysqli_query($db, $sqlQuery);
	    	while($row = $result->fetch_assoc()){
				$resultData['rides'][] = $row;
			};
	    	break;
	    case "inviteMember":
			$inviteMail = mysqli_real_escape_string($db, $_GET['inviteMail']);
			$communityID = mysqli_real_escape_string($db, $_GET['communityID']);

			$sqlQuery = "INSERT INTO Invites (user_id, community_id)
						VALUES ((SELECT ID FROM Users WHERE Email='".$inviteMail."'), '".$communityID."')";
						
			$resultData = mysqli_query($db, $sqlQuery);
	        break;
	    case "getInvites":
			$userID = mysqli_real_escape_string($db, $_GET['userID']);

			$sqlQuery = "SELECT Invites.community_id, Community.name
						FROM Invites
						INNER JOIN Community
						ON Invites.community_id=Community.ID
						WHERE Invites.user_id = $userID";
						
			$result = mysqli_query($db, $sqlQuery);

			while($row = $result->fetch_assoc()){
				$resultData[] = $row;
			};
	        break;
	    case "acceptInvite":
	   		$userID = mysqli_real_escape_string($db, $_GET['userID']);
	    	$communityID = mysqli_real_escape_string($db, $_GET['communityID']);

			$sqlQuery = "START TRANSACTION";
			$resultData = mysqli_query($db, $sqlQuery);
			$sqlQuery = "INSERT INTO Communities (user_id, community_id) VALUES('".$userID."', '".$communityID."')";
			$resultData = mysqli_query($db, $sqlQuery);
				if(!$resultData)
					break;
			$sqlQuery = "DELETE FROM Invites WHERE user_id = '".$userID."' AND community_id = '".$communityID."'";
			$resultData = mysqli_query($db, $sqlQuery);
				if(!$resultData)
					break;
			$sqlQuery = "COMMIT";
			$resultData = mysqli_query($db, $sqlQuery);
			break;
	    case "refuseInvite":
	   		$userID = mysqli_real_escape_string($db, $_GET['userID']);
	    	$communityID = mysqli_real_escape_string($db, $_GET['communityID']);

			$sqlQuery = "DELETE FROM Invites WHERE user_id = '".$userID."' AND community_id = '".$communityID."'";
			$resultData = mysqli_query($db, $sqlQuery);
	    	break;
	    case "removeMember":
			$userID = mysqli_real_escape_string($db, $_GET['userID']);
	    	$communityID = mysqli_real_escape_string($db, $_GET['communityID']);

			$sqlQuery = "DELETE FROM Communities WHERE user_id = '".$userID."' AND community_id = '".$communityID."'";
			$resultData = mysqli_query($db, $sqlQuery);
	    	break;
	    case "removeInvite":
			$userID = mysqli_real_escape_string($db, $_GET['userID']);
	    	$communityID = mysqli_real_escape_string($db, $_GET['communityID']);

			$sqlQuery = "DELETE FROM Invites WHERE user_id = '".$userID."' AND community_id = '".$communityID."'";
			$resultData = mysqli_query($db, $sqlQuery);
	    	break;
	};

	mysqli_close($db);
	echo  $_GET['callback'].'('.json_encode($resultData) .')';
?>