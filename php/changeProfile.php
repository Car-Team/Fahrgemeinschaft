<?php
$loginID = $_POST['loginID'];
$name = $_POST['name'];
$email = $_POST['email'];
$tel = $_POST['tel'];
$description = $_POST['description'];
$db = mysqli_connect("87.230.14.183", "car", "car", "car");
if(!$db)
{
  exit("Verbindungsfehler: ".mysqli_connect_error());
}
mysqli_query($db, "SET NAMES 'utf8'");
$sqlQuery = "UPDATE `Users` SET `Name`='$name', `Email`='$email', `Tel`='$tel', `Description`='$description' WHERE `ID`='$loginID'"; //, `Timestamp` //, `Email`='$email', `Tel`='$tel', `Descritpion`='$description'
//"INSERT INTO `Walls`(`LoginPW`, `Name`, `Email`, `Tel`, `PicID`, `CarID`) VALUES ('$pw','$name','$email','$tel',0,0);";

mysqli_query($db, $sqlQuery);

echo $_GET['callback'].'('."Post erfolgreich verschickt".')';
?>