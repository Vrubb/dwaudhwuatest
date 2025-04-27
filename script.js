// Generate A-Z letters randomly
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const GRID = document.getElementById("grid");
const POPUP = document.getElementById("popup");

// Create 20 columns with 50 letters each
function createGrid() {
    for (let i = 0; i < 20; i++) {
        const column = document.createElement("div");
        column.className = "column";
        
        // Random scroll speed for parallax
        column.style.setProperty("--speed", 0.5 + Math.random() * 0.5);

        for (let j = 0; j < 50; j++) {
            const letter = document.createElement("div");
            letter.className = "letter";
            letter.textContent = LETTERS[Math.floor(Math.random() * LETTERS.length)];
            
            // Highlight "G" and open popup
            if (letter.textContent === "G") {
                letter.style.opacity = "1";
                letter.addEventListener("click", () => {
                    POPUP.classList.add("active");
                });
            }
            
            column.appendChild(letter);
        }
        GRID.appendChild(column);
    }
}

// Close popup
document.querySelector(".close-popup").addEventListener("click", () => {
    POPUP.classList.remove("active");
});

// Initialize
createGrid();

// Horizontal/vertical scroll logic
let scrollX = 0;
let scrollY = 0;
let targetX = 0;
let targetY = 0;

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

// Smooth scrolling
function animate() {
    scrollX += (targetX - scrollX) * 0.05;
    scrollY += (targetY - scrollY) * 0.05;
    
    document.querySelectorAll(".column").forEach((col) => {
        const speed = parseFloat(col.style.getPropertyValue("--speed"));
        col.style.transform = `translate(${scrollX * speed}px, ${scrollY * speed}px)`;
    });
    
    requestAnimationFrame(animate);
}

animate();
