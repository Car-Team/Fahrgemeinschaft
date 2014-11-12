<?php
header('Content-Type: text/javascript; charset=UTF-8');
$fb_id = $_GET['fb_id'];
$name = $_GET['name'];

$db = mysqli_connect("87.230.14.183", "car", "car", "car");
if(!$db)
{
  echo $_GET['callback'].'Verbindungsfehler: ".mysqli_connect_error()';
}

$sqlQuery = "INSERT INTO `Users`(`LoginPW`, `Name`, `Email`, `Tel`, `PicID`, `CarID`,`FBID`) VALUES (0,'$name',0,0,0,0,'$fb_id');";
mysqli_query($db, $sqlQuery);

echo $_GET['callback'].'Registrierung erfolgreich!';
?>