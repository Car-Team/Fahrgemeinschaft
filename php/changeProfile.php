<?php
header('Content-Type: text/javascript; charset=UTF-8');
$picurl = $_GET['picurl'];
$loginID = $_GET['loginID'];
$name = $_GET['name'];
$email = $_GET['email'];
$tel = $_GET['tel'];
$description = $_GET['description'];


$db = mysqli_connect("87.230.14.183", "car", "car", "car");
if(!$db)
{
  exit("Verbindungsfehler: ".mysqli_connect_error());
}
mysqli_query($db, "SET NAMES 'utf8'");
$sqlQuery = "UPDATE `Users` SET `Name`='$name', `Email`='$email', `Tel`='$tel', `Description`='$description', `PicID`='$picurl' WHERE `ID`='$loginID'"; //, `Timestamp` //, `Email`='$email', `Tel`='$tel', `Descritpion`='$description'
//"INSERT INTO `Walls`(`LoginPW`, `Name`, `Email`, `Tel`, `PicID`, `CarID`) VALUES ('$pw','$name','$email','$tel',0,0);";

mysqli_query($db, $sqlQuery);

echo $_GET['callback'].'('.json_encode("Post erfolgreich verschickt").')';
?>