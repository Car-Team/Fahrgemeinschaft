<?php
header('Content-Type: text/javascript; charset=UTF-8');
$wallID = $_GET['wallID'];

$db = mysqli_connect("87.230.14.183", "car", "car", "car");
if(!$db)
{
  exit("Verbindungsfehler: ".mysqli_connect_error());
}
mysqli_query($db, "SET NAMES 'utf8'");
$sqlQuery = "DELETE From Walls Where ID = '$wallID'"; //, `Timestamp`
mysqli_query($db, $sqlQuery);
$sqlQuery2 = "DELETE From Comments Where WallID = '$wallID'"; //, `Timestamp`
mysqli_query($db, $sqlQuery2);

echo $_GET['callback'].'('.json_encode("Erfolgreich geloescht").')';
?>