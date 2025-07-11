
/*
    This script uses a single canvas to render selected items instead of stacking many <img> tags.
    It assumes each selected clothing item has a known layer order (z-index).
    You can expand this to support filters, recoloring, and save-to-image features.
*/

const selectedLayers = [];  // Each item: { src: 'url', zIndex: number }
let canvas, ctx;

// Setup canvas once
function initializeCanvas() {
    canvas = document.createElement('canvas');
    canvas.id = 'avatarCanvas';
    canvas.width = 500;
    canvas.height = 400;
    canvas.style.position = 'absolute';
    canvas.style.left = '0';
    canvas.style.top = '0';
    canvas.style.zIndex = '1';
    canvas.style.pointerEvents = 'none';

    ctx = canvas.getContext('2d');
    const baseContainer = document.querySelector('.base-container');
    baseContainer.appendChild(canvas);
}

// Render all selected layers
async function renderCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const sorted = selectedLayers.sort((a, b) => a.zIndex - b.zIndex);

    for (let layer of sorted) {
        await drawImageToCanvas(layer.src);
    }
}

// Draw individual image to canvas
function drawImageToCanvas(src) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
            resolve();
        };
        img.onerror = resolve;
        img.src = src;
    });
}

// Toggle a layer in selectedLayers
function toggleLayer(src, categoryName) {
    const zIndex = getZIndex(categoryName);
    const existingIndex = selectedLayers.findIndex(l => l.zIndex === zIndex);

    if (existingIndex !== -1) {
        if (selectedLayers[existingIndex].src === src) {
            selectedLayers.splice(existingIndex, 1); // Remove
        } else {
            selectedLayers[existingIndex].src = src; // Replace
        }
    } else {
        selectedLayers.push({ src, zIndex });
    }

    renderCanvas();
}

// Replace getZIndex if not available
function getZIndex(categoryName) {
    const map = {
        bottomunderwear: 2, topunderwear: 3, boxers: 4,
        sweatshirt: 5, shoes: 6, pants: 7, skirt: 8,
        top: 9, dress: 10, jacket: 11, accessories: 12,
        hat: 13, bow: 14
    };
    return map[categoryName] || 0;
}

// Replace image toggles with canvas layer toggles
function toggleVisibility(itemId, categoryName) {
    const img = document.getElementById(itemId);
    if (!img) return;

    toggleLayer(img.src, categoryName);
}

// On load
window.addEventListener('DOMContentLoaded', () => {
    initializeCanvas();
});
