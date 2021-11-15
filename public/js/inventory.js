// function myFunction(communityMember) {
//     var checkbox = document.getElementById("communityMember");
//     if (checkbox.checked == true){
//         text.style.display = "block";
//     } else {
//         text.style.display = "none";
//     }
// }

// function myFunction1() {
//     var x = document.getElementById("pantryMember").checked;
//     if (x) {
//         document.getElementById("Member").style.display = "block";
//     } else {
//         document.getElementById("Member").style.display = "none";
//     }
// }
// document.getElementById("pantryMember").onclick = myFunction1;


function createItemTile(data) {
    const tile = document.createElement("div");
    tile.classList.add("tile");

    const img = document.createElement("img");
    img.src = "http:///i.imgur.com/hfM1J8s.png";
    img.style["opacity"] = "0.5";
    img.style["transition"] = "none";
    img.alt = `${data.name}`;
    img.classList.add("tile-img");
    
    const food = document.createElement("div");
    food.textContent = data.name;

    const quantity = document.createElement("div");
    quantity.textContent = "Quantity: " + data.quantity;

    tile.appendChild(img);
    tile.appendChild(food);
    tile.appendChild(quantity);

    return tile;
}

let tempFoodDatabase = [
    {name:"Sweet Potato", quantity:"5"},
    {name:"Apples", quantity:"10"},
    {name:"Bananas", quantity:"15"},
    {name:"Bread", quantity:"1"},
    {name:"Pineapple", quantity:"7"},
    {name:"Jelly", quantity:"4"},
    {name:"Peanut Butter", quantity:"12"},
    {name:"Eggs", quantity:"24"},
]

function loadItems() {
    const tileContainer = document.getElementById("food-container");
    tempFoodDatabase.forEach(item => tileContainer.appendChild(createItemTile(item)))
    console.log("added items");
}

// Triggers every time the page is loaded
document.addEventListener("DOMContentLoaded", function() {
    console.log("Inventory page loaded...");
    loadItems();
});
