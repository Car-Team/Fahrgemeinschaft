<?php
//$loginName = JSON.parse(localStorage.getItem('userdata')).loginname;

$db = mysqli_connect("87.230.14.183", "car", "car", "car");
if(!$db)
{
  exit("Verbindungsfehler: ".mysqli_connect_error());
}

$sqlQuery = "SELECT * FROM Walls WHERE ReceiverID = 1";

$result = mysqli_query($db, $sqlQuery);
$rows = $result->num_rows;
$successful = ($rows == 1);
echo $rows;
if($successful) {
	$wresultData = $result->fetch_array();
	
	$wallResult = array(
        'successful'    	=> $successful,
		'id'				=> $wresultData[0],//ID
        'receiverid'        => $wresultData[1],//Name
        'sender'			=> $wresultData[2],//Email
        'textinput'			=> $wresultData[3],//Tel
        'timestamp'			=> $wresultData[4]//PicID

	//	'car'			=> $car,
	);
	exit(json_encode($wallResult));
} else {
	exit(json_encode(array('successful' => false)));
}
?>


/*
		var uData = {
			'wdbuser' : 'car',
			'wdbpw' : 'car',
			'wloginName' : 'car',
			'wloginPw' : 'car'
		}	
		$.ajax({
			type: "POST",
			url: "wall.php",
			data: uData,
			dataType: "json",
			success:	function(wallResult) {			

							if(wallResult.successful){								
								localStorage.setItem("walldata", JSON.stringify({
									id: wallResult.id, 
									receiverid: wallResult.receiverid,
									sender: wallResult.sender, 
									textinput: wallResult.textinput, 
									timestamp: wallResult.timestamp}));
								//$.mobile.changePage("menu.html");
							}else {
								alert("FEHLER!");
							}
						},
		});

*/