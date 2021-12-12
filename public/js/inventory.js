function createItemTile(data) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    
    const food = document.createElement("div");
    food.textContent = data.title;

    const quantity = document.createElement("div");
    quantity.textContent = data.quantity;

    const location = document.createElement("div");
    location.textContent = data.location;

    const category = document.createElement("div");
    category.textContent = data.category;

    tile.appendChild(food);
    tile.appendChild(quantity);
    tile.appendChild(location);
    tile.appendChild(category);

    return tile;
}

function loadItems() {
    const tileContainer = document.getElementById("food-container");
    console.log(foodItems)
    tileContainer.appendChild(createItemTile({title: "Item", quantity: "Quantity", location: "Location", category: "Category"}))
    foodItems.forEach(item => {
        tileContainer.appendChild(createItemTile(item));
    });
    
    // tempFoodDatabase.forEach(item => tileContainer.appendChild(createItemTile(item)))
    console.log("added items");
}

// Triggers every time the page is loaded
document.addEventListener("DOMContentLoaded", function() {
    console.log("Inventory page loaded...");
    loadItems();
});
