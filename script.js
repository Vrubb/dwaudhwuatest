// Configuration
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const COLUMNS = 26; // A-Z columns
const ROWS = 50;    // Letters per column
const WRAP_OFFSET = 1000; // Distance before wrapping

// DOM Elements
const grid = document.getElementById("grid");
const popup = document.getElementById("popup");
const closePopup = document.querySelector(".close-popup");

// State
let scrollX = 0;
let scrollY = 0;
let targetX = 0;
let targetY = 0;
let isDragging = false;
let startX, startY;

// Create the grid
function createGrid() {
    grid.innerHTML = "";
    
    // Create columns
    for (let c = 0; c < COLUMNS; c++) {
        const column = document.createElement("div");
        column.className = "column";
        
        // Random speed for parallax effect (0.7 to 1.3)
        column.dataset.speed = (0.7 + Math.random() * 0.6).toFixed(2);
        
        // Create letters in column
        for (let r = 0; r < ROWS; r++) {
            const letter = document.createElement("div");
            letter.className = "letter";
            const letterChar = LETTERS[Math.floor(Math.random() * LETTERS.length)];
            letter.textContent = letterChar;
            
            // Make "G" clickable
            if (letterChar === "G") {
                letter.style.opacity = "1";
                letter.addEventListener("click", (e) => {
                    e.stopPropagation();
                    popup.classList.add("active");
                });
            }
            
            column.appendChild(letter);
        }
        
        grid.appendChild(column);
    }
}

// Handle infinite scrolling with wrapping
function updateScroll() {
    // Apply easing to scroll
    scrollX += (targetX - scrollX) * 0.1;
    scrollY += (targetY - scrollY) * 0.1;
    
    // Wrap around when reaching edges
    if (Math.abs(scrollX) > WRAP_OFFSET) {
        scrollX = scrollX > 0 ? scrollX - WRAP_OFFSET * 2 : scrollX + WRAP_OFFSET * 2;
        targetX = scrollX;
    }
    
    if (Math.abs(scrollY) > WRAP_OFFSET) {
        scrollY = scrollY > 0 ? scrollY - WRAP_OFFSET * 2 : scrollY + WRAP_OFFSET * 2;
        targetY = scrollY;
    }
    
    // Apply scroll with parallax
    document.querySelectorAll(".column").forEach(column => {
        const speed = parseFloat(column.dataset.speed);
        column.style.transform = `translate(${scrollX * speed}px, ${scrollY * speed}px)`;
    });
    
    requestAnimationFrame(updateScroll);
}

// Drag event handlers
function handleMouseDown(e) {
    isDragging = true;
    startX = e.clientX - scrollX;
    startY = e.clientY - scrollY;
    document.body.style.cursor = "grabbing";
}

function handleMouseMove(e) {
    if (!isDragging) return;
    targetX = e.clientX - startX;
    targetY = e.clientY - startY;
}

function handleMouseUp() {
    isDragging = false;
    document.body.style.cursor = "grab";
}

// Event listeners
document.addEventListener("mousedown", handleMouseDown);
document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("mouseup", handleMouseUp);
document.addEventListener("mouseleave", handleMouseUp);

closePopup.addEventListener("click", () => {
    popup.classList.remove("active");
});

// Prevent text selection during drag
document.addEventListener("selectstart", (e) => {
    if (isDragging) e.preventDefault();
});

// Initialize
createGrid();
updateScroll();
