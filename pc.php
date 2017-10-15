<?php
session_start();
include 'connect.php';
include 'arrayfetch.php';
?>
<!DOCTYPE html>
<html lang="en">

<style>
	#nopadding {margin-bottom: 0px;}
	.h2 {
	margin-top: 20px;
	margin-bottom: 5px;
	}
	#top {background-color: lightgrey;}
	#header, #GPUAMD, #GPUNVIDIA, #CPUINTEL, #CPUAMD, #MOBOINTEL, #MOBOAMD, #RAM, #PSU, #STORAGE, #priceshow, h1, div {text-align: center;}
	#pricediv, #alertdiv {display: none;}
	ul { 
    display: block;
    list-style-type: disc;
    margin-top: 1em;
    margin-bottom: 1em;
    margin-left: 0;
    margin-right: 0;
	}
	.footer {
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	text-align: center;
	}
</style>

<body>

<head>	
	<title>PC Builder</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<link rel="icon" type="image/png" sizes="32x32" href="favicon32.png">
 	<meta name="viewport" content="width=device-width, initial-scale=1">
 	<script src="pc.js"></script>
</head>

<div class="jumbotron" id="nopadding">
	<h1>PCBuilder <small>Create a PC build in seconds.</small></h1><br>
</div>

<div class="container">
	<div class="page-header">
		<h2 id="header">What kind of computer can I build?</h2>
	</div>
</div>
<div class="container" id="alertdiv">
	<div class="alert alert-danger" >
			<p style="display:none" id="priceshow" class="text-danger"></p>
	</div>
</div>

<div id="pricediv" class="container">
	<div class="row">
		<div class="col-sm-4">
			<h3>CPU:</h3>
			<p id="CPUINTEL"></p>
			<p id="or1"></p>
			<p id="CPUAMD"></p>
		</div>
		<div class="col-sm-4">
			<h3>Motherboard:</h3>
			<p id="MOBOINTEL"></p>
			<p id="or2">or</p>
			<p id="MOBOAMD"></p>
		</div>
		<div class="col-sm-4">
			<h3>RAM:</h3>
			<p id="RAM"></p>
		</div>
	</div>
	<div class="row">
		<div class="col-sm-4">
			<h3>Power Supply:</h3>
			<p id="PSU"></p>
			
		</div>
		<div class="col-sm-4">
			<h3>GPU:</h3>
			<p id="GPUAMD"></p>
			<p id="or3">or</p>
			<p id="GPUNVIDIA"></p>
		</div>
		<div class="col-sm-4">
			<h3>Storage:</h3>
			<p id="STORAGE"></p>
		</div>
	</div>
</div>

<div class="container">
	 <div class="input-group">
      	<span class="input-group-addon"><i class="glyphicon glyphicon-usd"></i></span>
      	<input id="price" type="text" class="form-control" name="pricebox" placeholder="500" pattern="[0-9]">
      	<span class="input-group-btn"> <button class="btn btn-primary" type="button" onclick="ifNumber()"><i class="glyphicon glyphicon-arrow-right"></i></button></span>
    </div>
    <span class="help-block">Enter a price point between $400 to $6000.</span>
</div>
<br>
<br>
<div class="footer">
	<p><a href="http://lucasbastos.com"><small>By Lucas B. Ξ</small><a></p>
</div>
</body>
<script type="text/javascript">
var amdGpuArray = <?php echo $amdGpuArray_json; ?>;
var amdGpuLastID = <?php echo $lastIDamdGpuID; ?>;
var nvidiaGpuArray = <?php echo $nvidiaGpuArray_json; ?>;
var nvidiaGpuLastID = <?php echo $lastIDNvidiaGpuID; ?>;
var intelCpuArray = <?php echo $intelCpuArray_json; ?>;
var intelCpuLastID = <?php echo $lastIDIntelCpuID; ?>;
var amdCpuArray = <?php echo $amdCpuArray_json; ?>;
var amdCpuLastID = <?php echo $lastIDAmdCpuID; ?>;
</script>
</html>
