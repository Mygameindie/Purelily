function applyUnderwearOnlyPreset() {
    hideAllClothing();
    showUnderwear();
}

function applyPreset1() {
    hideAllClothing();
    showItem("topunderwear1_2.png", "topunderwear1");
    showItem("bottomunderwear1_2.png", "bottomunderwear1");
    showItem("boxers2_2.png", "boxers2");
}

function applyPreset2() {
    hideAllClothing();
    showItem("hat1_1.png", "hat1");
    showItem("hat2_2.png", "hat2");
    showItem("dress1_5.png", "dress1");
    showItem("dress2_3.png", "dress2");
	showUnderwear();
}

function applyPreset3() {
    hideAllClothing();
    showItem("skirt2_1.png", "skirt2");
    showItem("dress1_4.png", "dress1");
}

function applyPreset4() {
    hideAllClothing();
    showItem("bow1_1.png", "bow1");
    showItem("dress1_1.png", "dress1");
    showItem("hat2_1.png", "hat2");
    showItem("dress2_1.png", "dress2");
	showUnderwear();
}

// Shared functions
function hideAllClothing() {
    hideSpecificCategories([
        "top1", "top2", "pants1", "pants2", "skirt1", "skirt2",
        "shoes1", "shoes2", "jacket1", "jacket2", "dress1", "dress2",
        "sweatshirt1", "sweatshirt2", "hat1", "hat2", "socks1", "socks2",
        "accessories", "leaf1", "leaf2",
        "topunderwear1", "bottomunderwear1", "boxers1", "boxers2",
        "onepiece1", "topunderwear2", "accessories1", "accessories2",
        "bow1"
    ]);
}

function showUnderwear() {
    showItem("topunderwear1_1.png", "topunderwear1");
    showItem("bottomunderwear1_1.png", "bottomunderwear1");
    showItem("bottomunderwear2_1.png", "bottomunderwear2");
    showItem("boxers2_1.png", "boxers2");
}

function showItem(itemId, categoryName) {
    const selectedItem = document.getElementById(itemId);
    if (selectedItem) {
        selectedItem.style.visibility = "visible";
        selectedItem.style.display = "block";
        selectedItem.style.position = "absolute";
        selectedItem.style.left = "0";
        selectedItem.style.top = "0";
        selectedItem.style.zIndex = getZIndex(categoryName);
    } else {
        console.warn(`Item not found: ${itemId} in category ${categoryName}`);
    }
}