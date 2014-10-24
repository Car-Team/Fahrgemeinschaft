<?php

$loginID = $_POST['loginID'];
$carmodel = $_POST['carmodel'];
$carcolor = $_POST['carcolor'];
$caryear = $_POST['caryear'];
$carlicenseplate = $_POST['carlicenseplate'];
$carseats = $_POST['carseats'];
$cardescription = $_POST['cardescription'];


$db = mysqli_connect("87.230.14.183", "car", "car", "car");
if(!$db)
{
  exit("Verbindungsfehler: ".mysqli_connect_error());
}
mysqli_query($db, "SET NAMES 'utf8'");
$sqlQuery = "UPDATE `Cars` SET `ModelName`='$carmodel', `LicensePlate`='$carlicenseplate', `Seats`='$carseats', `ConstructionYear`='$caryear', `Description`='$cardescription', `Colour`='$carcolor' WHERE `ID`='$loginID'"; //, `Timestamp` //, `Email`='$email', `Tel`='$tel', `Descritpion`='$description'
//"INSERT INTO `Walls`(`LoginPW`, `Name`, `Email`, `Tel`, `PicID`, `CarID`) VALUES ('$pw','$name','$email','$tel',0,0);";

mysqli_query($db, $sqlQuery);

exit("Post erfolgreich verschickt");
?>