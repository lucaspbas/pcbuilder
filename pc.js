var CPU;
var MOBO;
var RAM;
var PSU;
var GPU;
var STORAGE;
var CASE;
var COOLING;
var GPURANGEMAX;
var GPURANGEMIN;
var GPURANGENUM;

function priceCalculate() {
	var price = document.getElementById("price").value;
	price = parseFloat(Math.round(price)).toFixed(2);
	if (price > 100) {
		percentageCalculate(price);
		calculateRange(GPU);
		matchRange(GPURANGEMIN, GPURANGEMAX);
	} else {
		document.getElementById("priceshow").innerHTML = "Price too low.";
	}
}
//price not number value, number value too many decimals //
function percentageCalculate(price) {
	console.log(price);
	CPU = price*.20;
	MOBO = price*.10;
	RAM = price*.06;
	PSU = price*.08;
	GPU = price*.30;
	STORAGE = price*.06;
	CASE = price*.10;
	COOLING = price*.10;
	var retotal = CPU+MOBO+RAM+PSU+GPU+STORAGE+CASE+COOLING;
	retotal = parseFloat(Math.round(retotal)).toFixed(2);
	if (price === retotal) {
		console.log("Success!");
		document.getElementById("header").innerHTML = "Here is an estimated budget:";
		document.getElementById("priceshow").style.display="block";
		document.getElementById("priceshow").innerHTML = "CPU: $"+(Math.round(CPU))+"<br>"+
													 	"Motherboard: $"+(Math.round(MOBO))+"<br>"+
													 	"RAM: $"+RAM+"<br>"+
													 	"PSU: $"+PSU+"<br>"+
													 	"GPU: $"+GPU+"<br>"+
													 	"Storage (HDD/SSD): $"+STORAGE+"<br>"+
													 	"Case: $"+CASE+"<br>"+
													 	"Cooling (CPU/Case fans): $"+COOLING+"<br>"
	} else {
		console.log("Unsuccessful, "+retotal.value);
		document.getElementById("priceshow").innerHTML = "An error has occurred.";
	}
}

function calculateRange(GPU) {
	GPU = (Math.round(GPU));
	GPURANGEMAX = (Math.round(GPU + (GPU*.14)));
	GPURANGEMIN = (Math.round(GPU - (GPU*.14)));
	GPURANGENUM = (Math.round(GPURANGEMAX - GPURANGEMIN));
	console.log("min: "+GPURANGEMIN+",gpu: "+GPU+",max: "+GPURANGEMAX+", range: "+GPURANGENUM);
}

function matchRange(GPURANGEMIN, GPURANGEMAX) {
		if (GPURANGEMIN < amdGpuArray[0][1] && amdGpuArray[0][1] < GPURANGEMAX) {
				document.getElementById("recommendedGPU").innerHTML ="Our recommended AMD GPU: "+amdGpuArray[0][0];
		} else if (GPURANGEMIN < amdGpuArray[1][1] && amdGpuArray[1][1] < GPURANGEMAX) {
				console.log(amdGpuArray[1][0]);
		} else if (isNaN) {
				console.log("Erorr.");
		} else {
				console.log("Nothing found.");
		}
}




//var amdGpuArray;//
var amdGpuArray = [["RX 560 2GB", 110], ["RX 560 4GB", 130], ["RX 570 4GB", 200]];
