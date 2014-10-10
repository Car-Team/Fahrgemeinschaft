<?php
$email = $_POST['email'];
$username = $_POST['username'];
$pw = $_POST['pw'];

$db = mysqli_connect("87.230.14.183", "car", "car", "car");
if(!$db)
{
  exit("Verbindungsfehler: ".mysqli_connect_error());
}

$sqlQuery = "INSERT INTO `Users`(`LoginName`, `LoginPW`, `Email`, `PicID`, `CarID`) VALUES ('$username','$pw','$email',0,0);";
mysqli_query($db, $sqlQuery);

exit("Registrierung erfolgreich!");
?>