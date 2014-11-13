<?php

function compress($source, $destination, $quality) {
    $info = getimagesize($source);
    
    if ($info['mime'] == 'image/jpeg')
        $image = imagecreatefromjpeg($source)

    elseif ($info['mime'] == 'image/jpg')
        $image = imagecreatefromjpeg($source);

    elseif ($info['mime'] == 'image/gif')
        $image = imagecreatefromgif($source);

    elseif ($info['mime'] == 'image/png')
        $image = imagecreatefrompng($source);

    imagejpeg($image, $destination, $quality);
}

$target_dir = "uploads/";
$userID = "empty";
$target_path = $target_dir;
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);

// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
    $userID = $_POST["data"];
    $target_path = $target_dir.$userID;
    $check = getimagesize($_FILES["fileToUpload"]["name"]);
    if($check !== false) {
        echo "Datei ist ein Bild - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "Datei ist kein Bild.";
        $uploadOk = 0;
    }
}

// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
    echo "Sorry, nur JPG, JPEG, PNG & GIF Dateien sind erlaubt.";
    $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, deine Datei wurde nicht hochgeladen.";

// Upload without compression
if ($_FILES["fileToUpload"]["size"] <= 500000) {
    compress($_FILES["fileToUpload"], $target_path, 80);
} elseif ($_FILES["fileToUpload"]["size"] <= 1000000) {
    compress($_FILES["fileToUpload"], $target_path, 60);
} else {
    compress($_FILES["fileToUpload"], $target_path, 40);
}

// Final check of size
if ($_FILES["fileToUpload"]["size"] > 1000000) {
    echo "Sorry, die Datei ist zu groß.";
    $uploadOk = 0;
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["name"], $target_path)) {
        // In Datenbank eintragen
        $db = mysqli_connect("87.230.14.183", "car", "car", "car");
        if(!$db)
        {
          echo("Verbindungsfehler: ".mysqli_connect_error());
        }
        mysqli_query($db, "SET NAMES 'utf8'");
        $sqlQuery = "UPDATE Users SET `PicID` = '$target_path' WHERE `ID` = `$userID`";
        mysqli_query($db, $sqlQuery);

        echo "Die Datei ". basename( $_FILES["fileToUpload"]["name"]). " wurde hochgeladen.";
    } else {
        echo "Sorry, es trat ein Fehler beim Hochladen auf.";
    }
}
?>