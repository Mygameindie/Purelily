
document.addEventListener("DOMContentLoaded", () => {
    const presetScrollBar = document.getElementById("presetScrollBar");
    const categoryScrollBar = document.getElementById("categoryScrollBar");
    const buttonContainer = document.querySelector(".scrollable-buttons");
    const baseContainer = document.querySelector(".base-container");

    const presets = [
        { name: "Default", action: applyPreset4 },
        { name: "Beach", action: applyPreset1 },
        { name: "Student", action: applyPreset2 },
        { name: "Bath", action: applyPreset3 },
        { name: "Remove", action: applyUnderwearOnlyPreset }
    ];

    const categories = [
        'top1', 'top2', 'pants1', 'pants2', 'skirt1', 'skirt2',
        'shoes1', 'shoes2', 'jacket1', 'jacket2', 'socks1', 'socks2',
        'hat1', 'hat2', 'dress1', 'dress2', 'sweatshirt1', 'sweatshirt2',
        'topunderwear1', 'bottomunderwear1', 'boxers1', 'boxers2',
        'onepiece1', 'bow1', 'bow2'
    ];

    function generatePresetButtons() {
        presetScrollBar.innerHTML = "";
        presets.forEach(preset => {
            const presetButton = document.createElement("button");
            presetButton.textContent = preset.name;
            presetButton.classList.add("preset-button");
            presetButton.onclick = preset.action;
            presetScrollBar.appendChild(presetButton);
        });
    }

    function generateCategoryButtons() {
        categoryScrollBar.innerHTML = "";
        categories.forEach(cat => {
            const tab = document.createElement("button");
            tab.textContent = cat;
            tab.classList.add("preset-button");
            tab.onclick = () => showCategoryButtons(cat);
            categoryScrollBar.appendChild(tab);
        });
    }

    async function showCategoryButtons(categoryName) {
        buttonContainer.innerHTML = "";
        const jsonPath = categoryName + ".json";

        try {
            const res = await fetch(jsonPath);
            if (!res.ok) throw new Error();
            const data = await res.json();

            for (let item of data) {
                const itemId = item.id.endsWith(".png") ? item.id : item.id + ".png";

                // Only add image if not in DOM yet
                if (!document.getElementById(itemId)) {
                    const img = document.createElement("img");
                    img.id = itemId;
                    img.src = item.src;
                    img.alt = item.alt;
                    img.classList.add(categoryName);
                    img.style.visibility = "hidden";
                    img.style.position = "absolute";
                    img.style.zIndex = getZIndex(categoryName);
                    img.loading = "lazy";
                    baseContainer.appendChild(img);
                }

                const buttonWrap = document.createElement("div");
                buttonWrap.classList.add("button-wrap");

                const button = document.createElement("img");
                button.src = item.src.replace(".png", "b.png");
                button.classList.add("item-button");
                button.loading = "lazy";
                button.onclick = () => toggleVisibility(itemId, categoryName);
                buttonWrap.appendChild(button);

                const colorButton = document.createElement("button");
                colorButton.textContent = "🎨";
                colorButton.classList.add("color-change-button");
                colorButton.onclick = (e) => {
                    e.stopPropagation();
                    if (document.getElementById(itemId).style.visibility === "hidden") {
                        toggleVisibility(itemId, categoryName);
                    }
                    showColorPicker(itemId);
                };
                buttonWrap.appendChild(colorButton);

                buttonContainer.appendChild(buttonWrap);
            }
        } catch (e) {
            console.error("Failed to load or parse JSON:", categoryName);
        }
    }

    generatePresetButtons();
    generateCategoryButtons();

    // Scroll behavior
    [presetScrollBar, categoryScrollBar].forEach(scrollEl => {
        scrollEl.addEventListener("wheel", (evt) => {
            if (evt.deltaY !== 0) {
                evt.preventDefault();
                scrollEl.scrollLeft += evt.deltaY;
            }
        }, { passive: false });
    });

    // Drag scroll support
    function enableDragScroll(scrollElement) {
        let isDown = false;
        let startX;
        let scrollLeft;

        scrollElement.addEventListener('mousedown', (e) => {
            isDown = true;
            scrollElement.classList.add('dragging');
            startX = e.pageX - scrollElement.offsetLeft;
            scrollLeft = scrollElement.scrollLeft;
        });

        scrollElement.addEventListener('mouseleave', () => {
            isDown = false;
            scrollElement.classList.remove('dragging');
        });

        scrollElement.addEventListener('mouseup', () => {
            isDown = false;
            scrollElement.classList.remove('dragging');
        });

        scrollElement.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scrollElement.offsetLeft;
            const walk = (x - startX) * 1.5;
            scrollElement.scrollLeft = scrollLeft - walk;
        });
    }

    enableDragScroll(presetScrollBar);
    enableDragScroll(categoryScrollBar);
});
