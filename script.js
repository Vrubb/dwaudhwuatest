// Configuration
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const COLUMNS = 26; // A-Z columns
const ROWS = 100;   // Letters per column
const SCROLL_SPEED = 0.8; // Lower = smoother, slower movement
const COLUMN_WIDTH = 60; // px

// DOM Elements
const gridContainer = document.getElementById("grid-container");
const grid = document.getElementById("grid");
const popup = document.getElementById("popup");
const closePopup = document.querySelector(".close-popup");

// State
let scrollY = 0;
let targetY = 0;
let isDragging = false;
let startY;
let lastY;
let velocity = 0;
let lastTime = 0;
let columns = [];

// Create the grid
function createGrid() {
    grid.innerHTML = "";
    grid.style.width = `${COLUMNS * COLUMN_WIDTH}px`;
    
    // Create columns
    for (let c = 0; c < COLUMNS; c++) {
        const column = document.createElement("div");
        column.className = "column";
        
        // Create letters in column
        for (let r = 0; r < ROWS; r++) {
            const letter = document.createElement("div");
            letter.className = "letter";
            const letterChar = LETTERS[c]; // Each column gets its own letter
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
        columns.push(column);
    }
}

// Handle smooth scrolling with momentum
function updateScroll(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    
    if (isDragging) {
        velocity = (targetY - lastY) / deltaTime * 1000;
        lastY = targetY;
    } else {
        // Apply momentum
        velocity *= 0.95;
        targetY += velocity * deltaTime / 1000;
        
        // Apply rubber band effect at boundaries
        if (targetY > 0) {
            targetY = targetY * 0.3;
        } else if (targetY < -grid.clientHeight + gridContainer.clientHeight) {
            const overflow = targetY - (-grid.clientHeight + gridContainer.clientHeight);
            targetY = -grid.clientHeight + gridContainer.clientHeight + overflow * 0.3;
        }
    }
    
    // Apply easing to scroll
    scrollY += (targetY - scrollY) * SCROLL_SPEED;
    
    // Apply scroll to grid
    grid.style.transform = `translateY(${scrollY}px)`;
    
    requestAnimationFrame(updateScroll);
}

// Drag event handlers
function handleMouseDown(e) {
    isDragging = true;
    startY = e.clientY;
    lastY = e.clientY;
    targetY = scrollY;
    document.body.style.cursor = "grabbing";
}

function handleMouseMove(e) {
    if (!isDragging) return;
    const deltaY = e.clientY - lastY;
    targetY += deltaY;
    lastY = e.clientY;
}

function handleMouseUp() {
    isDragging = false;
    document.body.style.cursor = "grab";
}

// Event listeners
gridContainer.addEventListener("mousedown", handleMouseDown);
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
requestAnimationFrame(updateScroll);
