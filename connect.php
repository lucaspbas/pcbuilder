<?php
	$host="#";
	$user="#";
	$dbname="#";
	$pass="#";
	try 
	{
		$db = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
	catch(PDOException $e)
    {
		echo "Connection failed: " . $e->;
    }
?>
