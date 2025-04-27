const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const GRID = document.getElementById("grid");
const COLUMNS = 20; // Number of columns
const ROWS = 50;    // Letters per column
let scrollX = 0;
let scrollY = 0;
let targetX = 0;
let targetY = 0;
let isDragging = false;
let startX, startY;

// Generate the grid
function createGrid() {
    GRID.innerHTML = "";
    for (let i = 0; i < COLUMNS; i++) {
        const column = document.createElement("div");
        column.className = "column";
        column.style.setProperty("--speed", 0.5 + Math.random() * 0.5); // Parallax speed

        for (let j = 0; j < ROWS; j++) {
            const letter = document.createElement("div");
            letter.className = "letter";
            letter.textContent = LETTERS[Math.floor(Math.random() * LETTERS.length)];
            
            // Make "G" interactive
            if (letter.textContent === "G") {
                letter.style.opacity = "1";
                letter.addEventListener("click", () => {
                    document.getElementById("popup").classList.add("active");
                });
            }
            column.appendChild(letter);
        }
        GRID.appendChild(column);
    }
}

// Infinite scroll logic
function updateGridPosition() {
    const gridWidth = COLUMNS * 200; // Approximate width of all columns
    const gridHeight = ROWS * 100;   // Approximate height of all letters

    // Horizontal infinite loop
    if (targetX > 0) targetX = -gridWidth / 2;
    if (targetX < -gridWidth) targetX = 0;

    // Vertical infinite loop
    if (targetY > 0) targetY = -gridHeight / 2;
    if (targetY < -gridHeight) targetY = 0;

    // Apply smooth scrolling
    scrollX += (targetX - scrollX) * 0.05;
    scrollY += (targetY - scrollY) * 0.05;

    // Move columns with parallax
    document.querySelectorAll(".column").forEach((col) => {
        const speed = parseFloat(col.style.getPropertyValue("--speed"));
        col.style.transform = `translate(${scrollX * speed}px, ${scrollY * speed}px)`;
    });

    requestAnimationFrame(updateGridPosition);
}

// Drag to scroll
document.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX - scrollX;
    startY = e.clientY - scrollY;
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    targetX = e.clientX - startX;
    targetY = e.clientY - startY;
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});

// Close popup
document.querySelector(".close-popup").addEventListener("click", () => {
    document.getElementById("popup").classList.remove("active");
});

// Initialize
createGrid();
updateGridPosition();
    
    requestAnimationFrame(animate);
}

animate();
