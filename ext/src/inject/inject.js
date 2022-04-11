

function calcRepair(partcost,isTablet){
	var labor = isTablet ? 75 : 55;
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
	var partc = (partcost*mult)+labor;
	var rounded = Math.ceil(partc/10)*10;
	return Math.round(rounded)-.01;

}

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
		//Trying to check if more items are fetched
		document.addEventListener("load",function(){
			console.log("List changed!");
		},false)
		

		var URL = document.URL;
		// if(URL.includes("mobiledefenders")){
		// 	console.log("TRUE")
		// }

		var elements = document.getElementsByClassName("price"),i,len;
		var isTablet;
		if(document.URL.includes("ipad")){
			isTablet = true;
		}else{
			isTablet = false;
		}
		console.log(isTablet);

		for(i=0,len = elements.length; i<len; i++){
			if(elements[i].parentElement.className =="old-price" || elements[i].parentElement.parentElement.id == "cartblock"){
				continue;
			}
			var price = elements[i].textContent;
			price = price.replace('$','')


			var num = calcRepair(Number(price),isTablet); 

			var span = document.createElement('span');
			var part = document.createElement('div');

			part.style.fontSize ="smaller";
			span.style.color = "red"; 

			span.appendChild(document.createTextNode(" Repair Price: $"+num));
			var part_price = num - 55;;
			part.appendChild(document.createTextNode("Part Price: $"+Number(part_price.toPrecision(2)-.01)));

			var parent = elements[i].parentElement.parentElement.parentElement;

			parent.insertBefore(span,parent.lastChild);
			parent.insertBefore(part,parent.lastChild);


		}
	}
	}, 10);
});