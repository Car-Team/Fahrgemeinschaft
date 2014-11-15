<?php
	$to = "mirco.hinzmann@gmail.com";
	$subject = "My subject";
	$txt = "Hello world!";
	$headers = "From: webmaster@example.com";

	$geklappt = mail($to, $subject, $txt, $headers);
	echo $geklappt;
?>