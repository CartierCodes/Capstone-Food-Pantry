// TODO
// Switch this from checkBox onclick method to when the page loads and check login details
// (once login framework is done)
function staffOnClick() {
    let isChecked = document.getElementById("staffMember").checked;

    if (isChecked) {
        document.getElementById("Member").style.display = "block";
    } 
    else {
        document.getElementById("Member").style.display = "none";
    }
}

function addFoodItem() {
    let name = document.getElementsByName("food")[0].value;
    let location = document.getElementsByName("location")[0].value;
    let amount = document.getElementsByName("units")[0].value;
    
    // TODO
    // package as item and add it to database
    // then reload the item tiles
}

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
