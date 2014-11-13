<?php

$loginID = $_GET['loginID'];
$carmodel = $_GET['carmodel'];
$carcolor = $_GET['carcolor'];
$caryear = $_GET['caryear'];
$carlicenseplate = $_GET['carlicenseplate'];
$carseats = $_GET['carseats'];
$cardescription = $_GET['cardescription'];


$db = mysqli_connect("87.230.14.183", "car", "car", "car");
if(!$db)
{
  exit("Verbindungsfehler: ".mysqli_connect_error());
}
mysqli_query($db, "SET NAMES 'utf8'");
$sqlQuery = "UPDATE `Cars` SET `ModelName`='$carmodel', `LicensePlate`='$carlicenseplate', `Seats`='$carseats', `ConstructionYear`='$caryear', `Description`='$cardescription', `Colour`='$carcolor' WHERE `ID`='$loginID'"; //, `Timestamp` //, `Email`='$email', `Tel`='$tel', `Descritpion`='$description'
//"INSERT INTO `Walls`(`LoginPW`, `Name`, `Email`, `Tel`, `PicID`, `CarID`) VALUES ('$pw','$name','$email','$tel',0,0);";

mysqli_query($db, $sqlQuery);

echo $_GET['callback'].'('."Post erfolgreich verschickt".')';
?>