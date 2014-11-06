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
$sqlQuery = "INSERT INTO `Cars`(`ID`, `ModelName`, `LicensePlate`, `Seats`, `ConstructionYear`, `Description`, `Colour`) VALUES ('$loginID','$carmodel','$carlicenseplate','$carseats','$caryear','$cardescription','$carcolor')";
mysqli_query($db, $sqlQuery);
$sqlQuery2 = "UPDATE `Users` SET `CarID`='$loginID' WHERE `ID`='$loginID'"; //, `Timestamp` //, `Email`='$email', `Tel`='$tel', `Descritpion`='$description'
mysqli_query($db, $sqlQuery2);

			//"INSERT INTO `Walls`(`ReceiverID`, `SenderID`, `Textinput`) VALUES ('$viewProfileID','$loginID','$text')"; //, `Timestam
			 //INSERT INTO `Cars`(`ID`, `ModelName`, `LicensePlate`, `Seats`, `ConstructionYear`, `Description`, `Colour`) VALUES ('4','4','4','4','4','4','4')

//"UPDATE `Cars` SET `ModelName`='$carmodel', `LicensePlate`='$carlicenseplate', `Seats`='$carseats', `ConstructionYear`='$caryear', `Description`='$cardescription', `Colour`='$carcolor' WHERE `ID`='$loginID'"; //, `Timestamp` //, `Email`='$email', `Tel`='$tel', `Descritpion`='$description'
//"INSERT INTO `Walls`(`LoginPW`, `Name`, `Email`, `Tel`, `PicID`, `CarID`) VALUES ('$pw','$name','$email','$tel',0,0);";



exit("Post erfolgreich verschickt");
?>