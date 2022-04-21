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

function updateLabor(labor){
    let addedPrices = document.getElementsByClassName("repair-div");
    for(const item of addedPrices){
        console.log(item);
    }


}

function addPrices(labor){
    var elements;
    //Loop for adding prices
    let url = document.URL;
    if(url.includes("sentrix") || url.includes("defenders"))    elements = document.getElementsByClassName("price");
    if(url.includes("wholesale"))                               elements = document.getElementsByClassName("currency");
    
    for(const part_item of elements){   
        //Looping through each price element on the page.
        let parentclass = part_item.parentElement.className;
        if(parentclass == "old-price") continue;    //skip if the price is a sale item.

        //Checking if the parent class is one that would contain parts or skipping if its another price. EX: the cart price.
        let parentClass4 = part_item.parentElement.parentElement.parentElement.parentElement;
        let parentClass3 = part_item.parentElement.parentElement.parentElement;
        if(!(parentClass4.className == "catalog-view-details-grid-hover"      //MD items page
        ||   parentClass3.className == "cat_prod_cell"                        //MS items page
        ||   parentClass4.className == "detailpage"                           //MS part page
        ||   parentClass4.className == "product-info"                         //MD part page
        ||   parentClass4.className == "details")) continue;                  //WSG Parts     
        
        addHTML(labor,part_item,url);
   
    }

}
function buttonInsert(){
    let delete_button = document.createElement("button");
    let add_button = document.createElement("button");
    add_button.textContent ="Add Prices";
    delete_button.style.textContent = "Delete";
    let contain = document.createElement("span");
    let title = document.createElement("label");
    title.innerHTML = "Delete";

    title.style.cssText= `font-size:22px;`;
    delete_button.addEventListener("click",deletePrices);
    add_button.addEventListener("click",updateLabor);
    let center = document.getElementById("center");
   

    
    delete_button.textContent = "Remove Prices";
    contain.style.cssText = 
        `font-size: 10px; display:inline-block;width: 200px;float:right;bottom:2px;right:100px;position:fixed;`;
    contain.appendChild(title);
    contain.appendChild(delete_button);
    contain.appendChild(add_button);
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
