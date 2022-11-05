/**
 * @author Riley Brust <brust.developer@gmail.com>
 * @version 0.0.6
 * @description Helper functions to add prices to the page.
 * @file helper.js
 */

function addPrices(labor){
    var elements;
    //Loop for adding prices
    let url = document.URL;
    if(url.includes("sentrix") || url.includes("defenders") || url.includes("cpr"))    elements = document.getElementsByClassName("price");
    
    for(const part_item of elements){   
        //Looping through each price element on the page.
        let parentclass = part_item.parentElement.className;
        if(parentclass == "old-price") continue;    //skip if the price is a sale item on MD.

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
	var rounded = Math.ceil(price / 10) * 10;
	return Math.round(rounded) - .01;
}
