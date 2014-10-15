<?php
$fb_id = $_POST['fb_id'];

$db = mysqli_connect("87.230.14.183", "car", "car", "car");
mysqli_query($db, "SET NAMES 'utf8'");
if(!$db)
{
  exit("Verbindungsfehler: ".mysqli_connect_error());
}

$sqlQuery = "SELECT FBID FROM Users u WHERE FBID = '$fb_id'";

$result = mysqli_query($db, $sqlQuery);
$rows = $result->num_rows;
$successful = ($rows == 1);

if($successful) {
	exit(json_encode($loginResult));
} else {
	exit(json_encode(array('successful' => false)));
}
?>