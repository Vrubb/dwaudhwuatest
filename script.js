const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const GRID = document.getElementById("grid");
const COLUMN_COUNT = 20;
const ROWS_PER_COLUMN = 50;
let scrollX = 0;
let scrollY = 0;
let targetX = 0;
let targetY = 0;
let isDragging = false;
let startX, startY;

// Generate infinite grid
function createGrid() {
  GRID.innerHTML = "";
  
  // Create 4x grid size for seamless looping
  for (let i = 0; i < COLUMN_COUNT * 4; i++) {
    const column = document.createElement("div");
    column.className = "column";
    
    // Random parallax speed (0.5x to 1.5x)
    column.style.setProperty("--speed", 0.5 + Math.random());

    for (let j = 0; j < ROWS_PER_COLUMN * 4; j++) {
      const letter = document.createElement("div");
      letter.className = "letter";
      letter.textContent = LETTERS[Math.floor(Math.random() * LETTERS.length)];
      
      // Make "G" clickable
      if (letter.textContent === "G") {
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
function updateScroll() {
  // Loop horizontally
  if (targetX > 0) targetX = -window.innerWidth * 2;
  if (targetX < -window.innerWidth * 2) targetX = 0;
  
  // Loop vertically
  if (targetY > 0) targetY = -window.innerHeight * 2;
  if (targetY < -window.innerHeight * 2) targetY = 0;

  // Smooth scrolling
  scrollX += (targetX - scrollX) * 0.05;
  scrollY += (targetY - scrollY) * 0.05;

  // Apply parallax
  document.querySelectorAll(".column").forEach(col => {
    const speed = parseFloat(col.style.getPropertyValue("--speed"));
    col.style.transform = `translate(${scrollX * speed}px, ${scrollY * speed}px)`;
  });

  requestAnimationFrame(updateScroll);
}

// Drag handlers
document.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX - scrollX;
  startY = e.clientY - scrollY;
  document.body.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  targetX = e.clientX - startX;
  targetY = e.clientY - startY;
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  document.body.style.cursor = "grab";
});

// Initialize
createGrid();
updateScroll();
