"use strict";
var CPU;
var MOBO;
var RAM;
var PSU;
var GPU;
var STORAGE;
var CASE;
var COOLING;
var CPURANGEMAX;
var CPURANGEMIN;
var GPURANGEMAX;
var GPURANGEMIN;
var price;
var i;
var j;
var AGPUPRICE;
var NGPUPRICE;
var ICPUPRICE;
var ACPUPRICE;
function ifNumber() {
	if (isNaN(document.getElementById("price").value)) {
		document.getElementById("pricediv").style.display="none";
		document.getElementById("alertdiv").style.display="block";
		document.getElementById("priceshow").style.display="block";
		document.getElementById("priceshow").innerHTML = "<strong>Not a valid number.</strong> Please avoid using letters or symbols.";
	} else {
		priceCalculate();
	}
}
function priceCalculate(price) {
	price = parseFloat(Math.round(document.getElementById("price").value)).toFixed(2);
	if (399 < price && price <= 6000) {
		percentageCalculate(price);
		calculateCPURange(CPU);
		calculateGPURange(GPU);
		matchAMDRange(GPURANGEMIN, GPURANGEMAX);
		matchNVIDIARange(GPURANGEMIN, GPURANGEMAX);
		matchIntelRange(CPURANGEMIN, CPURANGEMAX);
		matchAmdCpuRange(CPURANGEMIN, CPURANGEMAX);
		determinePSU(PSU);
		determineMOBO(MOBO);
		determineRAM(RAM);
		determineSTORAGE(STORAGE);
		ifMultiple();
		document.getElementById("pricediv").style.display="block";
		document.getElementById("priceshow").style.display="none";
		document.getElementById("alertdiv").style.display="none";
		document.getElementById("priceshow").innerHTML = "";
	} else if (price > 6000) {
		document.getElementById("pricediv").style.display="none";
		document.getElementById("alertdiv").style.display="block";
		document.getElementById("priceshow").style.display="block";
		document.getElementById("priceshow").innerHTML = "<strong>Price too high.</strong> Try below $6000.";
		clearAll();
	} else {
		document.getElementById("pricediv").style.display="none";
		document.getElementById("alertdiv").style.display="block";
		document.getElementById("priceshow").style.display="block";
		document.getElementById("priceshow").innerHTML = "<strong>Price too low.</strong> Try above $400.";
		clearAll();
	}
}
function percentageCalculate(price) {
	if (price <= 500) {
		CPU = price*.25;
		MOBO = price*.12;
		RAM = price*.15;
		PSU = price*.09;
		GPU = price*.27;
		STORAGE = price*.12;
		CASE = 0;
		COOLING = 0;
		var retotal = CPU+MOBO+RAM+PSU+GPU+STORAGE+CASE+COOLING;
	} else if (501 <= price && price <= 999) {
		CPU = price*.25;
		MOBO = price*.10;
		RAM = price*.15;
		PSU = price*.09;
		GPU = price*.29;
		STORAGE = price*.12;
		CASE = 0;
		COOLING = 0;
		var retotal = CPU+MOBO+RAM+PSU+GPU+STORAGE+CASE+COOLING;
	} else if (1000 <= price && price <= 6000) {
		CPU = price*.25;
		MOBO = price*.12;
		RAM = price*.12;
		PSU = price*.07;
		GPU = price*.29;
		STORAGE = price*.15;
		CASE = 0;
		COOLING = 0;
		var retotal = CPU+MOBO+RAM+PSU+GPU+STORAGE+CASE+COOLING;
	} else {
		var retotal = 0;
	}
	retotal = parseFloat(Math.round(retotal)).toFixed(2);
	htmlUpdate(price, retotal, CPU, MOBO, RAM, PSU, GPU, STORAGE, CASE, COOLING);
}
function calculateCPURange(CPU) {
	CPU = (Math.round(CPU));
	CPURANGEMAX = (Math.round(CPU + (CPU*.14)));
	CPURANGEMIN = (Math.round(CPU - (CPU*.14)));
}
function calculateGPURange(GPU) {
	GPU = (Math.round(GPU));
	GPURANGEMAX = (Math.round(GPU + (GPU*.14)));
	GPURANGEMIN = (Math.round(GPU - (GPU*.14)));
}
function determineMOBO(MOBO) {
	var intelCpuText;
	intelCpuText = document.getElementById("CPUINTEL").innerHTML;
	var amdCpuText;
	amdCpuText = document.getElementById("CPUAMD").innerHTML;
	MOBO = (Math.round(MOBO));
	if (intelCpuText) {
		if (+MOBO >= 30 && +MOBO < 90) {
  			document.getElementById("MOBOINTEL").innerHTML = "Budget Z370 (Intel) motherboard";
		} else if (+MOBO >= 90 && +MOBO < 150) {
  			document.getElementById("MOBOINTEL").innerHTML = "Z370 (Intel) motherboard";
		} else if (+MOBO >= 150 && +MOBO < 800) {
			if (intelCpuText.includes('X')) {
				document.getElementById("MOBOINTEL").innerHTML = "X299 (Intel) motherboard";
			} else {
				document.getElementById("MOBOINTEL").innerHTML = "Higher end Z370 (Intel) motherboard";
			}
		}
	} else {
			document.getElementById("MOBOINTEL").innerHTML = "";
	}
	if (amdCpuText) {
		if (+MOBO >= 30 && +MOBO < 90) {
  			document.getElementById("MOBOAMD").innerHTML = "Budget A320 (AMD) motherboard";
		} else if (+MOBO >= 90 && +MOBO < 150) {
  			document.getElementById("MOBOAMD").innerHTML = "B350 (AMD) motherboard";
		} else if (+MOBO >= 150 && +MOBO < 800) {
			if (amdCpuText.includes('Thread')) {
				document.getElementById("MOBOAMD").innerHTML = "X399 (AMD) motherboard";
			} else {
				document.getElementById("MOBOAMD").innerHTML = "Higher end X370 (AMD) motherboard";
			}
		}
	} else {
			document.getElementById("MOBOAMD").innerHTML = "";
	}
}
//changing these next 3 to grab from database soon
function determineSTORAGE(STORAGE) {
	STORAGE = (Math.round(STORAGE));
	if (+STORAGE >= 30 && +STORAGE < 90) {
		document.getElementById("STORAGE").innerHTML = "1TB HDD";
	} else if (+STORAGE >= 90 && +STORAGE < 130) {
		document.getElementById("STORAGE").innerHTML = "2TB HDD";
	} else if (+STORAGE >= 130 && +STORAGE < 250) {
		document.getElementById("STORAGE").innerHTML = "2TB HDD + 240GB SSD";
	} else if (+STORAGE >= 250 && +STORAGE < 330) {
		document.getElementById("STORAGE").innerHTML = "2TB HDD + 480GB SSD";
	} else if (+STORAGE >= 330 && +STORAGE < 550) {
		document.getElementById("STORAGE").innerHTML = "3TB HDD + 480GB SSD";
	} else if (+STORAGE >= 550 && +STORAGE < 620) {
		document.getElementById("STORAGE").innerHTML = "3TB HDD + 960GB SSD";
	} else if (+STORAGE >= 620 && +STORAGE < 1000) {
		document.getElementById("STORAGE").innerHTML = "4TB HDD + 1TB NVMe M.2 SSD";
	} else {
		document.getElementById("STORAGE").innerHTML = "";
	}
}
function determineRAM(RAM) {
	RAM = (Math.round(RAM));
	if (+RAM >= 30 && +RAM < 90) {
		document.getElementById("RAM").innerHTML = "8GB DDR4 2400";
	} else if (+RAM >= 90 && +RAM < 140) {
		document.getElementById("RAM").innerHTML = "8GB DDR4 3000";
	} else if (+RAM >= 140 && +RAM < 160) {
		document.getElementById("RAM").innerHTML = "16GB DDR4 2400";
	} else if (+RAM >= 160 && +RAM < 215) {
		document.getElementById("RAM").innerHTML = "16GB DDR4 3000";
	} else if (+RAM >= 215 && +RAM < 300) {
		document.getElementById("RAM").innerHTML = "16GB DDR4 4000";
	} else if (+RAM >= 300 && +RAM < 400) {
		document.getElementById("RAM").innerHTML = "32GB DDR4 3000";
	} else if (+RAM >= 400 && +RAM < 620) {
		document.getElementById("RAM").innerHTML = "32GB DDR4 3600";
	} else if (+RAM >= 620 && +RAM < 1000) {
		document.getElementById("RAM").innerHTML = "64GB DDR4 2400";
	} else {
		document.getElementById("RAM").innerHTML = "";
	}
}
function determinePSU(PSU) {
	PSU = (Math.round(PSU));
	if (+PSU >= 30 && +PSU < 80) {
		document.getElementById("PSU").innerHTML = "Budget 400 - 650W power supply";
	} else if (+PSU >= 80 && +PSU < 150) {
		document.getElementById("PSU").innerHTML = "600 - 800W power supply";
	} else if (+PSU >= 150 && +PSU <= 500) {
		document.getElementById("PSU").innerHTML = "800 - 1200W power supply";
	} else {
		document.getElementById("PSU").innerHTML = "";
	}
}
//
//<?php echo $lastIDamdGpuID; ?>;
function matchAMDRange(GPURANGEMIN, GPURANGEMAX) {
	for (i = 0; i < amdGpuArray.length; i++) {
		AGPUPRICE = amdGpuArray[i].price;
				if (+AGPUPRICE >= GPURANGEMIN && +AGPUPRICE <= GPURANGEMAX) {
						document.getElementById("GPUAMD").innerHTML ="AMD "+amdGpuArray[i].name;
						break;
				} else {
					if (GPURANGEMIN > Number(amdGpuArray[amdGpuArray.length-1].price)) {
						document.getElementById("GPUAMD").innerHTML ="AMD "+amdGpuArray[amdGpuArray.length-1].name;
						break;
					} else {
						if (GPURANGEMIN > Number(amdGpuArray[amdGpuArray.length-2].price)) {
							document.getElementById("GPUAMD").innerHTML ="AMD "+amdGpuArray[amdGpuArray.length-2].name;
							break;
						} else if (+AGPUPRICE >= GPURANGEMIN-30 && +AGPUPRICE <= GPURANGEMAX+30) {
							document.getElementById("GPUAMD").innerHTML ="AMD "+amdGpuArray[i].name;
							break;
						} else  {
							document.getElementById("GPUAMD").innerHTML ="";
						}
					}
				}
	}
}
function matchNVIDIARange(GPURANGEMIN, GPURANGEMAX) {
	for (i = 0; i < nvidiaGpuArray.length; i++) {
		NGPUPRICE = nvidiaGpuArray[i].price;
				if (+NGPUPRICE >= GPURANGEMIN && +NGPUPRICE <= GPURANGEMAX) {
					document.getElementById("GPUNVIDIA").innerHTML ="NVIDIA "+nvidiaGpuArray[i].name;
					break;
				} else {
					if (GPURANGEMIN > Number(nvidiaGpuArray[nvidiaGpuArray.length-1].price)) {
						document.getElementById("GPUNVIDIA").innerHTML ="NVIDIA "+nvidiaGpuArray[nvidiaGpuArray.length-1].name;
						break;
					} else {
						if (GPURANGEMIN > Number(nvidiaGpuArray[nvidiaGpuArray.length-2].price)) {
							document.getElementById("GPUNVIDIA").innerHTML ="NVIDIA "+nvidiaGpuArray[nvidiaGpuArray.length-2].name;
							break;
						} else if (+NGPUPRICE >= GPURANGEMIN-30 && +NGPUPRICE <= GPURANGEMAX+30) {
							document.getElementById("GPUNVIDIA").innerHTML ="NVIDIA "+nvidiaGpuArray[i].name;
							break;
						} else {
							document.getElementById("GPUNVIDIA").innerHTML ="";
						}
					}
				}
	}
}
function matchIntelRange(CPURANGEMIN, CPURANGEMAX) {
	for (i = 0; i < intelCpuArray.length; i++) {
		ICPUPRICE = intelCpuArray[i].price;
				if (+ICPUPRICE >= CPURANGEMIN && +ICPUPRICE <= CPURANGEMAX) {
					document.getElementById("CPUINTEL").innerHTML ="Intel "+intelCpuArray[i].name;
					break;
				} else {
					if (CPURANGEMIN > Number(intelCpuArray[intelCpuArray.length-1].price)) {
						document.getElementById("CPUINTEL").innerHTML ="Intel "+intelCpuArray[intelCpuArray.length-1].name;
						break;
					} else {
						if (CPURANGEMIN > Number(intelCpuArray[intelCpuArray.length-2].price)) {
							document.getElementById("CPUINTEL").innerHTML ="Intel "+intelCpuArray[intelCpuArray.length-2].name;
							break;
						} else {
							document.getElementById("CPUINTEL").innerHTML ="";
						}
					}
				}
	}
}
function matchAmdCpuRange(CPURANGEMIN, CPURANGEMAX) {
	for (i = 0; i < amdCpuArray.length; i++) {
		ACPUPRICE = amdCpuArray[i].price;
				if (+ACPUPRICE >= CPURANGEMIN && +ACPUPRICE <= CPURANGEMAX) {
					document.getElementById("CPUAMD").innerHTML ="AMD "+amdCpuArray[i].name;
					break;
				} else {
					if (CPURANGEMIN > Number(amdCpuArray[amdCpuArray.length-1].price)) {
						document.getElementById("CPUAMD").innerHTML ="AMD "+amdCpuArray[amdCpuArray.length-1].name;
						break;
					} else {
						if (CPURANGEMIN > Number(amdCpuArray[amdCpuArray.length-2].price)) {
							document.getElementById("CPUAMD").innerHTML ="AMD "+amdCpuArray[amdCpuArray.length-2].name;
							break;
						} else {
							document.getElementById("CPUAMD").innerHTML ="";
						}
					}
				}
	}
}
function htmlUpdate (price, retotal, CPU, MOBO, RAM, PSU, GPU, STORAGE, CASE, COOLING) {
	if (price === retotal) {
		document.getElementById("header").innerHTML = "Here is a recommended build:";
		document.getElementById("header").style.display = "block";
		document.getElementById("pricediv").style.display = "block";
		/*document.getElementById("priceshow").style.display="block";
		document.getElementById("priceshow").innerHTML ="<li onclick='infoClick()'>CPU: $"+(Math.round(CPU)).toFixed(2)+"</li><br>"+
													 	"Motherboard: $"+(Math.round(MOBO)).toFixed(2)+"<br>"+
													 	"RAM: $"+(Math.round(RAM)).toFixed(2)+"<br>"+
													 	"PSU: $"+(Math.round(PSU)).toFixed(2)+"<br>"+
													 	"GPU: $"+(Math.round(GPU)).toFixed(2)+"<br>"+
													 	"Storage (HDD/SSD): $"+(Math.round(STORAGE)).toFixed(2)+"<br>"+
													 	"Total: $"+price+"<br>";
													 	"Cooling (CPU/Case fans): $"+(Math.round(COOLING)).toFixed(2)+"<br>"*/
	} else {
		document.getElementById("priceshow").style.display = "block";
		document.getElementById("priceshow").innerHTML = "An error has occurred.";
		document.getElementById("pricediv").style.display = "none";
		
	}
}
function clearAll() {
	document.getElementById("GPUAMD").innerHTML = "";
	document.getElementById("GPUNVIDIA").innerHTML = "";
	document.getElementById("CPUINTEL").innerHTML ="";
	document.getElementById("CPUAMD").innerHTML ="";
	document.getElementById("MOBOAMD").innerHTML = "";
	document.getElementById("MOBOINTEL").innerHTML = "";
	document.getElementById("PSU").innerHTML ="";
	document.getElementById("RAM").innerHTML ="";
	document.getElementById("STORAGE").innerHTML ="";
	document.getElementById("or1").innerHTML ="";
	document.getElementById("or2").innerHTML ="";
	document.getElementById("or3").innerHTML ="";
}
function ifMultiple() {
	if (!document.getElementById("CPUAMD").innerHTML == "" && !document.getElementById("CPUINTEL").innerHTML == "") {
		document.getElementById("or1").innerHTML ="or";
	} else {
		document.getElementById("or1").innerHTML ="";
	}
	if (!document.getElementById("MOBOAMD").innerHTML == "" && !document.getElementById("MOBOINTEL").innerHTML == "") {
		document.getElementById("or2").innerHTML ="or";
	} else {
		document.getElementById("or2").innerHTML ="";
	}
	if (!document.getElementById("GPUAMD").innerHTML == "" && !document.getElementById("GPUNVIDIA").innerHTML == "") {
		document.getElementById("or3").innerHTML ="or";
	} else {
		document.getElementById("or3").innerHTML ="";
	}
}
