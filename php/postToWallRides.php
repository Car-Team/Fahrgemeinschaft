<?php
$loginID = $_POST['loginID'];
$viewRideID = $_POST['viewRideID'];
$text = $_POST['text'];

$db = mysqli_connect("87.230.14.183", "car", "car", "car");
if(!$db)
{
  exit("Verbindungsfehler: ".mysqli_connect_error());
}
mysqli_query($db, "SET NAMES 'utf8'");
$sqlQuery = "INSERT INTO `WallsRides`(`ReceiverID`, `SenderID`, `Textinput`) VALUES ('$viewRideID','$loginID','$text')"; //, `Timestamp`
//"INSERT INTO `Walls`(`LoginPW`, `Name`, `Email`, `Tel`, `PicID`, `CarID`) VALUES ('$pw','$name','$email','$tel',0,0);";

mysqli_query($db, $sqlQuery);

exit("Post erfolgreich verschickt");
?>