<?php 
//this is the start of the function
//the function is called getAmdGpu and takes two inputs called amdGPU and db, db is just specifying the database we connect to
function getAmdGpu($amdGpu, $db) {
	//this is the statement we'll create
	$stmt = $db->prepare("SELECT * FROM gpuarray WHERE ID = :valueOfGPU");
	//above, we'll select everything from the table gpuarray where the ID matches whatever we pass in for the value
	//below we set the value of valueOfGPU to be the parameter we specified earlier
	if ($stmt->execute(array(':valueOfGPU' => $amdGpu)))
    {
		//if there is a match in the database it will return that single row
        return $stmt->fetch(PDO::FETCH_ASSOC); 
    }
	//if there is no match it will return false
    return false;
}
//this is where we actually call the function and pass in both the value for $amd and the value for $db (this $db is actually coming from the connect.php file
//the results are returned and in this case are set to the variable $resultsfromquery
//you can then use these results in your page i.e. $resultsfromquery[ID], $resultsfromquery[name of your column]  $resultsfromquery[gpuName]

function getAmdGpuID($amdGpu, $db) {
	$stmt2 = $db->prepare("SELECT ID FROM gpuarray WHERE ID = :valueOfGPU");
	if ($stmt2->execute(array(':valueOfGPU' => $amdGpu))) {
        return $stmt2->fetch(PDO::FETCH_ASSOC); 
    }
    return false;
}
function cycleAmdID($db) {
	global $amdGpuIDArray;
	$amdGpuIDArray = array();
		for ($i = 1; $i < 20; $i++) {
			$resultsfromqueryAmdID=getAmdGpuID($i, $db);

			if ($resultsfromqueryAmdID) {
			array_push($amdGpuIDArray, $resultsfromqueryAmdID[ID]);
			}
		}
	global $lastIDamdGpuID;
	$lastIDamdGpuID = array_pop($amdGpuIDArray);
}
cycleAmdID($db);

function createArray($lastIDamdGpuID, $db) {
	global $amdGpuArray;
	$amdGpuArray = array();
	for ($i = 1; $i <= $lastIDamdGpuID; $i++) {
		$resultsfromqueryAmd=getAmdGpu($i, $db);
		array_push($amdGpuArray, $resultsfromqueryAmd);
	}
}

createArray($lastIDamdGpuID, $db);
$amdGpuArray_json = json_encode($amdGpuArray);
//===============//

function getNvidiaGpu($nvidiaGpu, $db) {
	$stmt = $db->prepare("SELECT * FROM nvidiagpuarray WHERE ID = :valueOfNGPU");
	if ($stmt->execute(array(':valueOfNGPU' => $nvidiaGpu))) {
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    return false;
}
function getNvidiaGpuID($nvidiaGpu, $db) {
	$stmt2 = $db->prepare("SELECT ID FROM nvidiagpuarray WHERE ID = :valueOfNGPU");
	if ($stmt2->execute(array(':valueOfNGPU' => $nvidiaGpu))) {
        return $stmt2->fetch(PDO::FETCH_ASSOC); 
    }
    return false;
}
function cycleNvidiaID($db) {
	global $nvidiaGpuIDArray;
	$nvidiaGpuIDArray = array();
		for ($i = 1; $i < 20; $i++) {
			$resultsfromqueryID=getNvidiaGpuID($i, $db);

			if ($resultsfromqueryID) {
			array_push($nvidiaGpuIDArray, $resultsfromqueryID[ID]);
			}
		}
	global $lastIDNvidiaGpuID;
	$lastIDNvidiaGpuID = array_pop($nvidiaGpuIDArray);
}
cycleNvidiaID($db);

function createNvidiaArray($lastIDNvidiaGpuID, $db) {
	global $nvidiaGpuArray;
	$nvidiaGpuArray = array();
	for ($i = 1; $i <= $lastIDNvidiaGpuID; $i++) {
		$resultsfromquery=getNvidiaGpu($i, $db);
		array_push($nvidiaGpuArray, $resultsfromquery);
	}
}
createNvidiaArray($lastIDNvidiaGpuID, $db);
$nvidiaGpuArray_json = json_encode($nvidiaGpuArray);

//===============//
function getIntelCpu($intelCpu, $db) {
	$stmt = $db->prepare("SELECT * FROM intelcpuarray WHERE ID = :valueOfICPU");
	if ($stmt->execute(array(':valueOfICPU' => $intelCpu))) {
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    return false;
}
function getIntelCpuID($intelCpu, $db) {
	$stmt = $db->prepare("SELECT ID FROM intelcpuarray WHERE ID = :valueOfICPU");
	if ($stmt->execute(array(':valueOfICPU' => $intelCpu))) {
        return $stmt->fetch(PDO::FETCH_ASSOC); 
    }
    return false;
}
function cycleIntelID($db) {
	global $intelCpuIDArray;
	$intelCpuIDArray = array();
		for ($i = 1; $i < 20; $i++) {
			$resultsfromqueryIntelID=getIntelCpuID($i, $db);

			if ($resultsfromqueryIntelID) {
			array_push($intelCpuIDArray, $resultsfromqueryIntelID[ID]);
			}
		}
	global $lastIDIntelCpuID;
	$lastIDIntelCpuID = array_pop($intelCpuIDArray);
}
cycleIntelID($db);

function createIntelArray($lastIDIntelCpuID, $db) {
	global $intelCpuArray;
	$intelCpuArray = array();
	for ($i = 1; $i <= $lastIDIntelCpuID; $i++) {
		$resultsfromquery=getIntelCpu($i, $db);
		array_push($intelCpuArray, $resultsfromquery);
	}
}
createIntelArray($lastIDIntelCpuID, $db);
$intelCpuArray_json = json_encode($intelCpuArray);

//===============//
function getAmdCpu($amdCpu, $db) {
	$stmt = $db->prepare("SELECT * FROM amdcpuarray WHERE ID = :valueOfACPU");
	if ($stmt->execute(array(':valueOfACPU' => $amdCpu))) {
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    return false;
}
function getAmdCpuID($amdCpu, $db) {
	$stmt = $db->prepare("SELECT ID FROM amdcpuarray WHERE ID = :valueOfACPU");
	if ($stmt->execute(array(':valueOfACPU' => $amdCpu))) {
        return $stmt->fetch(PDO::FETCH_ASSOC); 
    }
    return false;
}
function cycleAmdCpuID($db) {
	global $amdCpuIDArray;
	$amdCpuIDArray = array();
		for ($i = 1; $i < 20; $i++) {
			$resultsfromqueryAmdCpuID=getAmdCpuID($i, $db);

			if ($resultsfromqueryAmdCpuID) {
			array_push($amdCpuIDArray, $resultsfromqueryAmdCpuID[ID]);
			}
		}
	global $lastIDAmdCpuID;
	$lastIDAmdCpuID = array_pop($amdCpuIDArray);
}
cycleAmdCpuID($db);

function createAmdArray($lastIDAmdCpuID, $db) {
	global $amdCpuArray;
	$amdCpuArray = array();
	for ($i = 1; $i <= $lastIDAmdCpuID; $i++) {
		$resultsfromquery=getAmdCpu($i, $db);
		array_push($amdCpuArray, $resultsfromquery);
	}
}
createAmdArray($lastIDAmdCpuID, $db);
$amdCpuArray_json = json_encode($amdCpuArray);

/* LEGEND: 
	$amdGpu/$nvidiaGpu = number matching ID in database (in our case, $i looping 0-15)
	$stmt/$stmt2 = gets results into our general array
	$resultsfromquery = general array results, use [ID], [name], [price] to specify each specific table
	$resultsfromqueryAmdID/$resultsfromqueryNvidiaID = accesses general array corresponding to $amdGpu/$nvidiaGpu
	$amdGpuIDArray/$nvidiaGpuIDArray = specifies only ID from general array into new array
	$lastIDAmdGpuID/$lastIDNvidiaGpuID = grabs last ID to form new array with exact amount of entries
	$amdGpuArray/$nvidiaGpuArray = gathers all possibilities of IDs up to the last found ID into one new single array
*/
?>