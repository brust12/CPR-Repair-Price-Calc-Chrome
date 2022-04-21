/**
 * @author Riley Brust <brust.developer@gmail.com>
 * @version 0.0.5
 * @description Chrome extention that displays repair cost in the websites.
 * @file inject.js
 */


function addHTML(labor,part_item,url){
    var cost = part_item.textContent;
    cost = cost.replace('$','');
    var repair_price = calcRepair(Number(cost),labor); 

    var repair_div = document.createElement('div');
    repair_div.style.color      = "#e3051b";
    repair_div.style.fontWeight = "bold";
    repair_div.className ="repair-div";

    var costs_div = document.createElement('div');
    costs_div.className ="repair-div";
    costs_div.style.color = "black";
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
  
    addPrices(labor);
    if(url.includes("wholesale")){
        buttonInsert();
    }
}

main();