/**
 * @author Riley Brust <brust.developer@gmail.com>
 */

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

function insert(){
    //check to see if were on a parts page or another page.
    let url = document.URL;
    const blacklist =["tools","brands","refurbishing","accessories","checkout"];
    if(blacklist.some((word)=>url.includes(word))) return;

    //Set Labor 
    var labor = 55;
    var device_type = "PHONE";
    if(url.includes("ipad") || url.includes("surface")){
        device_type = "TABLET";
        labor = 75;
    }
    if(url.includes("game-console") || url.includes("sony") || url.includes("xbox")||url.includes("nintendo")){
        device_type = "CONSOLE";
        labor =100;
    }
    console.log(device_type);
    //ADDING PRICES
    var elements = document.getElementsByClassName("price"),i,len;
    for(i=0,len = elements.length; i<len; i++){ //Looping through all price elements on the page.
        let parentclass = elements[i].parentElement.className;
        if(parentclass=="old-price") continue; //skip if the price is a sale item.

        //Checking if the parent class is one that would contain parts or skipping if its another price. EX the cart price.
        let parentClass4 = elements[i].parentElement.parentElement.parentElement.parentElement;
        let parentClass3 = elements[i].parentElement.parentElement.parentElement;
        if(!(parentClass4.className == "catalog-view-details-grid-hover" || parentClass3.className == "cat_prod_cell")) continue;

        var cost = elements[i].textContent;
        cost = cost.replace('$','')
        var repair_price = calcRepair(Number(cost),labor); 

        var repair_div = document.createElement('div');
        repair_div.style.color = "red";
        repair_div.style.fontWeight = "bold";

        // repair_div.style.fontSize = "smaller";

        var costs_div = document.createElement('div');
        // costs_div.style.fontSize ="smaller";
        costs_div.style.color = "black";
        if(url.includes("mobiledefenders")){
            repair_div.style.paddingTop = "5px";
            repair_div.style.paddingBottom = "5px";
            // costs_div.style.padding = "3px";
        }
        //ADDING HTML ELEMENTS TO THE PAGE
        var breakr = document.createElement("br");// for moving the price to a new line on Sentrix part page.
        repair_div.appendChild(document.createTextNode(" Repair Price: $"+repair_price),breakr);
        var part_price = repair_price - labor;;
        costs_div.appendChild(document.createTextNode("Part Price: $"+Number(part_price.toPrecision(2)-.01)+" - Labor: $"+labor));

        var parent = elements[i].parentElement.parentElement;
        parent.insertBefore(breakr,parent.lastChild)
        parent.insertBefore(repair_div,parent.lastChild);
        parent.insertBefore(costs_div,parent.lastChild);
    }
}

insert();
