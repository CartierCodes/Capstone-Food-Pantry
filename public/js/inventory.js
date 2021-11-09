function myFunction() {
    var checkbox = document.getElementById("community");
    if (checkbox.checked == true){
        text.style.display = "block";
    } else {
        text.style.display = "none";
    }
}

function myFunction1(){
    var checkbox = document.getElementById("pantry");
    if (checkbox.checked == true){
        text.style.display = "block";
    } else {
        text.style.display = "none";
    }
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
    quantity.textContent = data.quantity;

    tile.appendChild(img);
    tile.appendChild(food);
    tile.appendChild(quantity);

    return tile;
}

function loadItems() {
    const tileContainer = document.getElementById("food-container");
    tileContainer.appendChild(createItemTile({name:"Sweet Potato", quantity:"5"}));
    tileContainer.appendChild(createItemTile({name:"Apples", quantity:"10"}));
    tileContainer.appendChild(createItemTile({name:"Bananas", quantity:"15"}));
    tileContainer.appendChild(createItemTile({name:"Bread", quantity:"1"}));
    console.log("added items");
}

// Triggers every time the page is loaded
document.addEventListener("DOMContentLoaded", function() {
    console.log("Inventory page loaded...");
    loadItems();
});