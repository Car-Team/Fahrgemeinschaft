<?php
$name = $_POST['name'];
$email = $_POST['email'];
$tel = $_POST['tel'];
$username = $_POST['username'];
$pw = $_POST['pw'];

$db = mysqli_connect("87.230.14.183", "car", "car", "car");
if(!$db)
{
  exit("Verbindungsfehler: ".mysqli_connect_error());
}

$sqlQuery = "INSERT INTO `Users`(`LoginName`, `LoginPW`, `Name`, `Email`, `Tel`, `PicID`, `CarID`) VALUES ('$username','$pw','$name','$email','$tel',0,0);";
mysqli_query($db, $sqlQuery);

exit("Registrierung erfolgreich!");
?>