<?php
$arraytype = array("0" => "amdcpu","1" => "intelcpu","2" => "amdgpu","3" => "nvidiagpu","4" => "psu","5" => "ram","6" => "storage","7" => "motherboard");
function arrayFetch($arraytype, $arraycategories) {
	$connection = mysql_connect('####', '#####', '####');
	mysql_select_db('lucasbastos');
	for($i = 0, $size = count($arraytype); $i < $size; $i++) {
		$type = (string) $arraytype[$i];
    	$query = "SELECT * FROM pcbuilderarray WHERE type = '$type' ORDER BY arrayID"; 
		$result = mysql_query($query);
		$array[$type] = array();
		while($row = mysql_fetch_assoc($result)){
			array_push($array[$type], $row);
		}
		global $jsonarray;
		$jsonarray[$type] = json_encode($array[$type]);
	}
}
arrayFetch($arraytype, $arraycategories);
?>
