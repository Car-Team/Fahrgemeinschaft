<?php

header('Content-Type: text/javascript; charset=UTF-8');


$id = $_GET['id'];
$pw = $_GET['pw'];
$fb_id = $_GET['fb_id'];

$result = array(
	'successful'  => false,
	'message'			=> ""
);

$db = mysqli_connect("87.230.14.183", "car", "car", "car");
mysqli_query($db, "SET NAMES 'utf8'");
if(!$db)
{
  echo "Verbindungsfehler: ".mysqli_connect_error();
}
if($fb_id = "") {
	$pwCheck = "SELECT * FROM Users WHERE ID = '$id' AND LoginPW = '$pw'";
	$result = mysqli_query($db, $sqlQuery);
	$rows = $result->num_rows;
	$successful = ($rows == 1);
}else {
	$successful = true;
}
if($successful){
	$sqlQuery = "UPDATE Users SET Email="", LoginPW ="",  Name ="Gelöschter Benutzer", Email = "", Tel = "", PicID = "0", Description="", CarID = "", FBID = ""  Where ID='$id'";

	mysqli_query($db, $sqlQuery);

	$result['successful'] = true;
	$result['message'] = "Löschen erfolgreich!";

} else {

	$result['successful'] = false;
	$result['message'] = "Das eingegebene Passwort ist falsch!";
	
}
echo $_GET['callback'].'('.json_encode($result) .')';

?>

