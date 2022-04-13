

function calcRepair(partcost,labor){
	var mult;
	if(partcost <= 9.99){
		mult = 5;
	}else if(partcost >10 & partcost<=24.99){
		mult = 2.5;
	}else if(partcost>25 & partcost<=49.99) {
		mult =2.25;
	}else if(partcost>50 &partcost<=99.99){
		mult = 2.00;
	}else if(partcost>100 & partcost<=199.99){
		mult = 1.5;
	}else if (partcost >200){
		mult =1.25;
	}
	var price = (partcost*mult)+labor;
	var rounded = Math.ceil(price/10)*10;
	return Math.round(rounded)-.01;
}

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState == "complete") {
		clearInterval(readyStateCheckInterval);
		var labor = 55;
		var device_type = "PHONE";
		if(document.URL.includes("ipad") || document.URL.includes("surface")){
			device_type = "TABLET";
			labor = 75;
		}
		if(document.URL.includes("game-console") ||document.URL.includes("sony") ||document.URL.includes("xbox")||document.URL.includes("nintendo")){
			device_type = "CONSOLE";
			labor =100;
		}
		console.log(device_type);

		var elements = document.getElementsByClassName("price"),i,len;
		for(i=0,len = elements.length; i<len; i++){
			if(elements[i].parentElement.className =="old-price" || elements[i].parentElement.parentElement.id == "cartblock"){ //remove prices for sale and cart on Sentrix
				continue;
			}
			if((document.URL.includes("checkout"))){
				break;
			}
			var cost = elements[i].textContent;
			cost = cost.replace('$','')


			var num = calcRepair(Number(cost),labor); 

			var repair_div = document.createElement('div');
			var costs_div = document.createElement('div');
			costs_div.style.fontSize ="smaller";
			costs_div.style.color = "black";
			// costs_div.style.fontWeight = "bold";
			// part.style.float = "left";
			repair_div.style.color = "red"; 
			// repair_div.style.fontWeight = "bold";

			var breakr = document.createElement("br");
			repair_div.appendChild(document.createTextNode(" Repair Price: $"+num),breakr);
			var part_price = num - labor;;
			costs_div.appendChild(document.createTextNode("Part Price: $"+Number(part_price.toPrecision(2)-.01)+" - Labor: $"+labor));

			var parent = elements[i].parentElement.parentElement;
			parent.insertBefore(breakr,parent.lastChild)
			parent.insertBefore(repair_div,parent.lastChild);
			parent.insertBefore(costs_div,parent.lastChild);
		}
	}
	}, 10);
});