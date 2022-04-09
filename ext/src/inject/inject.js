function calcRepair(partcost,isTablet){

	return partcost +5;

}

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------
		document.body.addEventListener("load",function(){
			console.log("List changed!");
		},false)
		var elements = document.getElementsByClassName("price"),i,len;
		for(i=0,len = elements.length; i<len; i++){
			var price = elements[i].textContent;
			price = price.substring(1);
			var num = calcRepair(Number(price)); 

			// var num = Math.round((Number(price)*2)+55)-.01;
			console.log(price);
			var txt = document.createTextNode(" Repair Price: $"+num);
			elements[i].style.color = "red";
			var parent = elements[i].parentElement.parentElement;
			parent.insertBefore(txt,parent.lastChild);


		}

	}
	}, 10);
});