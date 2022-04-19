/**
 * @author Riley Brust <brust.developer@gmail.com>
 * @version 0.0.5
 * @description Helper functions to delete and add to the page
 * @file helper.js
 */
function deletePrices(){
    var elements = document.getElementsByClassName("repair-div");
    let length = elements.length;
    if(length == 0) return;
    let item;
    for(let i=length-1;i >=0;i--){
        item = elements[i];
       item.remove();
    }
}

function buttonInsert(){
    button = document.createElement("button");
    button.style.textContent = "Delete";
    contain = document.createElement("span");
    title = document.createElement("label");
    title.innerHTML = "Delete";

    title.style.cssText= `font-size:22px;`;
    button.addEventListener("click",deletePrices);
    center = document.getElementById("center");
   

    
    button.textContent = "Remove Prices";
    contain.style.cssText = 
        `font-size: 10px; display:inline-block;width: 200px;float:right;bottom:2px;right:100px;position:fixed;`;
    contain.appendChild(title);
    contain.appendChild(button);
    center.appendChild(contain);
}

function calcRepair(partcost,labor){
	var mult;
	if(partcost <= 9.99){
		mult = 5;
	}else if(partcost >=10  &  partcost <= 24.99) {
		mult = 2.5;
	}else if(partcost >=25  &  partcost <= 49.99) {
		mult =2.25;
	}else if(partcost >=50  &  partcost <= 99.99) {
		mult = 2.00;
	}else if(partcost >=100 &  partcost <= 199.99){
		mult = 1.5;
	}else if(partcost >=200){
		mult =1.25;
	}
	var price = (partcost * mult) + labor;
	var rounded = Math.ceil(price/10) * 10;
	return Math.round(rounded) - .01;
}
