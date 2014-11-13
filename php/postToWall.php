<?php
$loginID = $_GET['loginID'];
$viewProfileID = $_GET['viewProfileID'];
$text = $_GET['text'];

$db = mysqli_connect("87.230.14.183", "car", "car", "car");
if(!$db)
{
  exit("Verbindungsfehler: ".mysqli_connect_error());
}
mysqli_query($db, "SET NAMES 'utf8'");
$sqlQuery = "INSERT INTO `Walls`(`ReceiverID`, `SenderID`, `Textinput`) VALUES ('$viewProfileID','$loginID','$text')"; //, `Timestamp`
//"INSERT INTO `Walls`(`LoginPW`, `Name`, `Email`, `Tel`, `PicID`, `CarID`) VALUES ('$pw','$name','$email','$tel',0,0);";

mysqli_query($db, $sqlQuery);

echo $_GET['callback'].'('."Post erfolgreich verschickt".')';
?>