"use strict";
var i;
var j;
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
var PSUMIN;
var PSUMAX;
var RAMMIN;
var RAMMAX;
var STORAGEMIN;
var STORAGEMAX;
var MOBOMIN;
var MOBOMAX;
var MOBOSOCKET;
var price;
var AGPUPRICE;
var NGPUPRICE;
var ICPUPRICE;
var ACPUPRICE;
var type = 1;
var num;
var retotal;
function pctype(num) {
		type = num;
		if (document.getElementById("pricediv").style.display == "block") {
			ifNumber();
		}
}
function ifNumber() {
	if (isNaN(document.getElementById("price").value)) {
		document.getElementById("pricediv").style.display="none";
		document.getElementById("alertdiv").style.display="block";
		document.getElementById("priceshow").style.display="block";
		document.getElementById("priceshow").innerHTML = "<strong>Not a valid number.</strong> Please avoid using letters or symbols.";
		document.getElementById("enterprice").className = "input-group has-error";
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
		determineCOOLER(COOLING);
		determinePSU(PSU);
		determineMOBO(MOBO);
		determineRAM(RAM);
		determineSTORAGE(STORAGE);
		ifMultiple();
		document.getElementById("pricediv").style.display="block";
		document.getElementById("priceshow").style.display="none";
		document.getElementById("alertdiv").style.display="none";
		document.getElementById("priceshow").innerHTML = "";
		document.getElementById("enterprice").className = "input-group";
	} else if (price > 6000) {
		document.getElementById("pricediv").style.display="none";
		document.getElementById("alertdiv").style.display="block";
		document.getElementById("priceshow").style.display="block";
		document.getElementById("priceshow").innerHTML = "<strong>Price too high.</strong> Try below $6000.";
		document.getElementById("enterprice").className = "input-group has-error";
		clearAll();
	} else {
		document.getElementById("pricediv").style.display="none";
		document.getElementById("alertdiv").style.display="block";
		document.getElementById("priceshow").style.display="block";
		document.getElementById("priceshow").innerHTML = "<strong>Price too low.</strong> Try above $400.";
		document.getElementById("enterprice").className = "input-group has-error";
		clearAll();
	}
}
function percentageCalculate(price) {
	if (type === 1) {
		if (price <= 500) {
			CPU = price*.25;
			MOBO = price*.12;
			RAM = price*.15;
			PSU = price*.09;
			GPU = price*.27;
			STORAGE = price*.12;
			COOLING = price*.07;
			retotal = CPU+MOBO+RAM+PSU+GPU+STORAGE;
		} else if (501 <= price && price <= 999) {
			CPU = price*.25;
			MOBO = price*.10;
			RAM = price*.15;
			PSU = price*.09;
			GPU = price*.29;
			STORAGE = price*.12;
			COOLING = price*.07;
			retotal = CPU+MOBO+RAM+PSU+GPU+STORAGE;
		} else if (1000 <= price && price <= 6000) {
			CPU = price*.25;
			MOBO = price*.12;
			RAM = price*.12;
			PSU = price*.07;
			GPU = price*.29;
			STORAGE = price*.15;
			COOLING = price*.07;
			retotal = CPU+MOBO+RAM+PSU+GPU+STORAGE;
		} else {
			retotal = 0;
		}
		retotal = parseFloat(Math.round(retotal)).toFixed(2);
		htmlUpdate(price, retotal, CPU, MOBO, RAM, PSU, GPU, STORAGE);
	} else if (type === 2) {
		if (400 <= price && price <= 999) {
			CPU = price*.27;
			MOBO = price*.10;
			RAM = price*.13;
			PSU = price*.09;
			GPU = price*.29;
			STORAGE = price*.12;
			COOLING = price*.07;
			retotal = CPU+MOBO+RAM+PSU+GPU+STORAGE;
		} else if (1000 <= price && price <= 6000) {
			CPU = price*.30;
			MOBO = price*.12;
			RAM = price*.11;
			PSU = price*.07;
			GPU = price*.29;
			STORAGE = price*.12;
			COOLING = price*.07;
			retotal = CPU+MOBO+RAM+PSU+GPU+STORAGE;
		} else {
			retotal = 0;
		}
		retotal = parseFloat(Math.round(retotal)).toFixed(2);
		htmlUpdate(price, retotal, CPU, MOBO, RAM, PSU, GPU, STORAGE);
	} else if (type === 3) {
		if (400 <= price && price <= 6000) {
			CPU = price*.30;
			MOBO = price*.12;
			RAM = price*.15;
			PSU = price*.11;
			GPU = price*.18;
			STORAGE = price*.14;
			COOLING = price*.07;
			retotal = CPU+MOBO+RAM+PSU+GPU+STORAGE;
		} else {
			retotal = 0;
		}
		retotal = parseFloat(Math.round(retotal)).toFixed(2);
		htmlUpdate(price, retotal, CPU, MOBO, RAM, PSU, GPU, STORAGE);
	}
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
function determineCOOLER(COOLING) {
	COOLING = (Math.round(COOLING));
	var intelCpuText = document.getElementById("CPUINTEL").innerHTML;
	var amdCpuText = document.getElementById("CPUAMD").innerHTML;
	if ((intelCpuText.includes('X') || intelCpuText.includes('K')) && (amdCpuText.includes('X') || amdCpuText.includes('Thread'))) {
		document.getElementById("COOLER").innerHTML = "These CPUs do not include a cooler. <br> CPU Cooler <small><em>$"+COOLING+"</em></small>";
	} else if (intelCpuText.includes('X') || intelCpuText.includes('K')) {
			document.getElementById("COOLER").innerHTML = "This Intel CPU does not include a cooler. <br> CPU Cooler <small><em>$"+COOLING+"</em></small>";
	} else if (amdCpuText.includes('X') || amdCpuText.includes('Thread')) {
			document.getElementById("COOLER").innerHTML = "This AMD CPU does not include a cooler. <br> CPU Cooler <small><em>$"+COOLING+"</em></small>";
	} else {
			document.getElementById("COOLER").innerHTML = "";
	}	
}		
function determineMOBO(MOBO) {
	var intelCpuText = document.getElementById("CPUINTEL").innerHTML;
	var amdCpuText = document.getElementById("CPUAMD").innerHTML;
	MOBO = (Math.round(MOBO));
		for (i = 0; i < motherboardArray.length; i++) {
			MOBOMIN = motherboardArray[i].pricemin;
			MOBOMAX = motherboardArray[i].pricemax;
			MOBOSOCKET = motherboardArray[i].socket;
			if (intelCpuText) {
				if ((+MOBO >= MOBOMIN && +MOBO < MOBOMAX) && MOBOSOCKET == "LGA 1151") {
					document.getElementById("MOBOINTEL").innerHTML = motherboardArray[i].name+" <small><em>$"+MOBO+"</em></small>";
				}
				if ((+MOBO >= MOBOMIN && +MOBO < MOBOMAX) && MOBOSOCKET == "LGA 2066") {
					document.getElementById("MOBOINTEL").innerHTML = motherboardArray[i].name+" <small><em>$"+MOBO+"</em></small>";
				}
			} else {
				document.getElementById("MOBOINTEL").innerHTML = "";
			}
			if (amdCpuText) {
				if ((+MOBO >= MOBOMIN && +MOBO < MOBOMAX) && MOBOSOCKET == "AM4") {
		  			document.getElementById("MOBOAMD").innerHTML = motherboardArray[i].name+" <small><em>$"+MOBO+"</em></small>";
				} 
				if ((+MOBO >= MOBOMIN && +MOBO < MOBOMAX) && MOBOSOCKET == "TR4") {
		  			document.getElementById("MOBOAMD").innerHTML = motherboardArray[i].name+" <small><em>$"+MOBO+"</em></small>";
				}
			} else {
					document.getElementById("MOBOAMD").innerHTML = "";
			}
		}	
}
function determineSTORAGE(STORAGE) {
	STORAGE = (Math.round(STORAGE));
	for (i = 0; i < storageArray.length; i++) {
		STORAGEMIN = storageArray[i].pricemin;
		STORAGEMAX = storageArray[i].pricemax;
		if (+STORAGE >= +STORAGEMIN && +STORAGE <= +STORAGEMAX) {
			document.getElementById("STORAGE").innerHTML = storageArray[i].name+" <small><em>$"+STORAGE+"</em></small>";
			break;
		} else {
			document.getElementById("STORAGE").innerHTML = "";
		}
	}	
}
function determineRAM(RAM) {
	RAM = (Math.round(RAM));
	for (i = 0; i < ramArray.length; i++) {
		RAMMIN = ramArray[i].pricemin;
		RAMMAX = ramArray[i].pricemax;
		if (+RAM >= +RAMMIN && +RAM <= +RAMMAX) {
			document.getElementById("RAM").innerHTML = ramArray[i].name+" <small><em>$"+RAM+"</em></small>";
			break;
		} else {
			document.getElementById("RAM").innerHTML = "";
		}
	}	
}
function determinePSU(PSU) {
	PSU = (Math.round(PSU));
	for (i = 0; i < psuArray.length; i++) {
		PSUMIN = psuArray[i].pricemin;
		PSUMAX = psuArray[i].pricemax;
		if (+PSU >= +PSUMIN && +PSU <= +PSUMAX) {
			document.getElementById("PSU").innerHTML = psuArray[i].name+" <small><em>$"+PSU+"</em></small>";
			break;
		} else {
		document.getElementById("PSU").innerHTML = "";
		}
	}	
}
function matchAMDRange(GPURANGEMIN, GPURANGEMAX) {
	for (i = 0; i < amdGpuArray.length; i++) {
		AGPUPRICE = amdGpuArray[i].price;
				if (+AGPUPRICE >= GPURANGEMIN && +AGPUPRICE <= GPURANGEMAX) {
						document.getElementById("GPUAMD").innerHTML ="AMD "+amdGpuArray[i].name+" <small><em>$"+amdGpuArray[i].price+"</em></small>";
						break;
				} else if (+AGPUPRICE >= GPURANGEMIN*.9 && +AGPUPRICE <= GPURANGEMAX) {
						document.getElementById("GPUAMD").innerHTML ="AMD "+amdGpuArray[i].name+" <small><em>$"+amdGpuArray[i].price+"</em></small>";
						break;
				} /*else if (+AGPUPRICE >= GPURANGEMIN*.8 && +AGPUPRICE <= GPURANGEMAX) {
						document.getElementById("GPUAMD").innerHTML ="AMD "+amdGpuArray[i].name+" <small><em>$"+amdGpuArray[i].price+"</em></small>";
						break;
				} */else {
					if ((GPURANGEMIN > Number(amdGpuArray[amdGpuArray.length-1].price) && +AGPUPRICE >= GPURANGEMIN) || GPURANGEMAX > Number(amdGpuArray[amdGpuArray.length-1].price)) {
						document.getElementById("GPUAMD").innerHTML ="AMD "+amdGpuArray[amdGpuArray.length-1].name+" <small><em>$"+amdGpuArray[amdGpuArray.length-1].price+"</em></small>";
						break;
					} else {
						if (GPURANGEMIN > Number(amdGpuArray[amdGpuArray.length-2].price) && +AGPUPRICE >= GPURANGEMIN) {
							document.getElementById("GPUAMD").innerHTML ="AMD "+amdGpuArray[amdGpuArray.length-2].name+" <small><em>$"+amdGpuArray[amdGpuArray.length-2].price+"</em></small>";
							break;
						} else {
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
						document.getElementById("GPUNVIDIA").innerHTML ="NVIDIA "+nvidiaGpuArray[i].name+" <small><em>$"+nvidiaGpuArray[i].price+"</em></small>";
						break;
				} else if (+NGPUPRICE >= GPURANGEMIN*.9 && +NGPUPRICE <= GPURANGEMAX) {
						document.getElementById("GPUNVIDIA").innerHTML ="NVIDIA "+nvidiaGpuArray[i].name+" <small><em>$"+nvidiaGpuArray[i].price+"</em></small>";
						break;
				}/* else if (+NGPUPRICE >= GPURANGEMIN*.8 && +NGPUPRICE <= GPURANGEMAX) {
						document.getElementById("GPUNVIDIA").innerHTML ="NVIDIA "+nvidiaGpuArray[i].name+" <small><em>$"+nvidiaGpuArray[i].price+"</em></small>";
						break;
				} */else {
					if ((GPURANGEMIN > Number(nvidiaGpuArray[nvidiaGpuArray.length-1].price) && +NGPUPRICE >= GPURANGEMIN) || GPURANGEMAX > Number(nvidiaGpuArray[nvidiaGpuArray.length-1].price)) {
						document.getElementById("GPUNVIDIA").innerHTML ="NVIDIA "+nvidiaGpuArray[nvidiaGpuArray.length-1].name+" <small><em>$"+nvidiaGpuArray[nvidiaGpuArray.length-1].price+"</em></small>";
						break;
					} else {
						if (GPURANGEMIN > Number(nvidiaGpuArray[nvidiaGpuArray.length-2].price) && +NGPUPRICE >= GPURANGEMIN) {
							document.getElementById("GPUNVIDIA").innerHTML ="NVIDIA "+nvidiaGpuArray[nvidiaGpuArray.length-2].name+" <small><em>$"+nvidiaGpuArray[nvidiaGpuArray.length-2].price+"</em></small>";
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
					document.getElementById("CPUINTEL").innerHTML ="Intel "+intelCpuArray[i].name+" <small><em>$"+intelCpuArray[i].price+"</em></small>";
					break;
				} else {
					if (CPURANGEMIN > Number(intelCpuArray[intelCpuArray.length-1].price)) {
						document.getElementById("CPUINTEL").innerHTML ="Intel "+intelCpuArray[intelCpuArray.length-1].name+" <small><em>$"+intelCpuArray[intelCpuArray.length-1].price+"</em></small>";
						break;
					} else {
						if (CPURANGEMIN > Number(intelCpuArray[intelCpuArray.length-2].price)) {
							document.getElementById("CPUINTEL").innerHTML ="Intel "+intelCpuArray[intelCpuArray.length-2].name+" <small><em>$"+intelCpuArray[intelCpuArray.length-2].price+"</em></small>";
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
					document.getElementById("CPUAMD").innerHTML ="AMD "+amdCpuArray[i].name+" <small><em>$"+amdCpuArray[i].price+"</em></small>";
					break;
				} else {
					if (CPURANGEMIN > Number(amdCpuArray[amdCpuArray.length-1].price)) {
						document.getElementById("CPUAMD").innerHTML ="AMD "+amdCpuArray[amdCpuArray.length-1].name+" <small><em>$"+amdCpuArray[amdCpuArray.length-1].price+"</em></small>";
						break;
					} else {
						if (CPURANGEMIN > Number(amdCpuArray[amdCpuArray.length-2].price)) {
							document.getElementById("CPUAMD").innerHTML ="AMD "+amdCpuArray[amdCpuArray.length-2].name+" <small><em>$"+amdCpuArray[amdCpuArray.length-2].price+"</em></small>";
							break;
						} else {
							document.getElementById("CPUAMD").innerHTML ="";
						}
					}
				}
	}
}
function htmlUpdate (price, retotal, CPU, MOBO, RAM, PSU, GPU, STORAGE) {
	if (price === retotal) {
		document.getElementById("header").innerHTML = "Here is a recommended build:";
		document.getElementById("header").style.display = "block";
		document.getElementById("pricediv").style.display = "block";
		/*document.getElementById("total").innerHTML =	"CPU: $"+(Math.round(CPU)).toFixed(2)+"<br>"+
													 	"Motherboard: $"+(Math.round(MOBO)).toFixed(2)+"<br>"+
													 	"RAM: $"+(Math.round(RAM)).toFixed(2)+"<br>"+
													 	"PSU: $"+(Math.round(PSU)).toFixed(2)+"<br>"+
													 	"GPU: ≈$"+(Math.round(GPU)).toFixed(2)+"<br>"+
													 	"Storage (HDD/SSD): $"+(Math.round(STORAGE)).toFixed(2)+"<br>"+
													 	"Total: about $"+price+"<br>";
													 	//"Cooling (CPU/Case fans): $"+(Math.round(COOLING)).toFixed(2)+"<br>"*/
	} else {
		document.getElementById("priceshow").style.display = "block";
		document.getElementById("priceshow").innerHTML = "An error has occurred.";
		document.getElementById("pricediv").style.display = "none";
		//document.getElementById("total").innerHTML = "";
		
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
	//document.getElementById("total").innerHTML ="";
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
