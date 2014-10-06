<?php
$loginName = $_POST['loginName'];
$loginPw = $_POST['loginPw'];

$db = mysqli_connect("87.230.14.183", "car", "car", "car");
if(!$db)
{
  exit("Verbindungsfehler: ".mysqli_connect_error());
}

$sqlQuery = "SELECT * FROM Benutzer WHERE LoginName = '".$loginName."' AND LoginPW = '".$loginPw."'";
$result = mysqli_query($db, $sqlQuery);
$rows = $result->num_rows;
$successful = ($rows == 1);

if($successful) {
	$resultData = $result->fetch_assoc();
	
	$loginResult = array(
        'successful'    => $successful,
        'name'          => $resultData['Name'],
        'eMail'			=> $resultData['Email'],
        'tel'			=> $resultData['Tel'],      
        'picID'			=> $resultData['PicID'],
		'carID'			=> $resultData['CarID']
	);
	exit(json_encode($loginResult));
} else {
	exit(json_encode(array('successful' => false)));
}
?>