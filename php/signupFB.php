<?php
$fb_id = $_POST['fb_id'];
$name = $_POST['name'];
$email = $_POST['email'];

$db = mysqli_connect("87.230.14.183", "car", "car", "car");
if(!$db)
{
  exit("Verbindungsfehler: ".mysqli_connect_error());
}

$sqlQuery = "INSERT INTO `Users`(`LoginName`, `LoginPW`, `Name`, `Email`, `Tel`, `PicID`, `CarID`,`FBID`) VALUES (0,0,'$name','$email',0,0,0,'$fb_id');";
mysqli_query($db, $sqlQuery);0

exit("Registrierung erfolgreich!");
?>