/**
 * @author Riley Brust <brust.developer@gmail.com>
 * @version 0.0.5
 * @description Chrome extention that displays repair cost in the websites.
 * @file inject.js
 */

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

function addHTML(labor,part_item,url){
    var cost = part_item.textContent;
    cost = cost.replace('$','');
    var repair_price = calcRepair(Number(cost),labor); 

    var repair_div = document.createElement('div');
    repair_div.style.color      = "#e3051b";
    repair_div.style.fontWeight = "bold";

    var costs_div = document.createElement('div');
    costs_div.style.color       = "black";
    if(url.includes("mobiledefenders")){
        repair_div.style.paddingTop    = "5px";
        repair_div.style.paddingBottom = "5px";
    }
       //Inserting the price elements
       var breakr = document.createElement("br");// for moving the price to a new line on Sentrix part page.
       repair_div.appendChild(document.createTextNode(" Repair Price: $"+repair_price),breakr);
       var part_price = repair_price +.01 - labor;
       costs_div.appendChild(document.createTextNode("Part Price: $" + Number(part_price - .01) + " - Labor: $" + labor));

       var parent = part_item.parentElement.parentElement;
       parent.insertBefore(breakr,parent.lastChild);
       parent.insertBefore(repair_div,parent.lastChild);
       parent.insertBefore(costs_div,parent.lastChild);
    }

function main(){
    //Check to see if were on a parts page or another page.
    let url = document.URL;
    const blacklist = ["tools","brands/","refurbishing","accessories","checkout"];
    if(blacklist.some((word) => url.includes(word))) return;

    //Set Labor 
    const tablets   = ["ipad","surface","galaxy-tab","samsung/tab"];
    const consoles  = ["game-console","sony","xbox","nintendo","macbook-parts"];
    var labor = 55;
    if(tablets.some((word) => url.includes(word)))   labor = 75;
    if(consoles.some((word)=> url.includes(word)))   labor = 100;
    var elements;
    //Loop for adding prices
    if(url.includes("sentrix") || url.includes("defenders")){
         elements = document.getElementsByClassName("price");
    }
    if(url.includes("wholesale")){
         elements = document.getElementsByClassName("currency");
    }
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
main();