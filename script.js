document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const COLUMN_COUNT = 26; // A-Z columns
    const ROW_COUNT = 100;   // Rows per column
    const SCROLL_SPEED = 0.1;
    
    // DOM Elements
    const gridContainer = document.getElementById('gridContainer');
    const grid = document.getElementById('grid');
    const popup = document.getElementById('popup');
    const closePopup = document.querySelector('.close-popup');
    
    // State
    let scrollX = 0;
    let scrollY = 0;
    let targetX = 0;
    let targetY = 0;
    let isDragging = false;
    let startX, startY;
    let animationId = null;
    
    // Create grid
    function createGrid() {
        grid.innerHTML = '';
        
        // Create columns
        for (let c = 0; c < COLUMN_COUNT; c++) {
            const column = document.createElement('div');
            column.className = 'column';
            
            // Create rows
            for (let r = 0; r < ROW_COUNT; r++) {
                const letter = document.createElement('div');
                letter.className = 'letter';
                letter.textContent = LETTERS[c]; // Each column gets its own letter
                
                // Make "G" interactive
                if (LETTERS[c] === 'G') {
                    letter.style.opacity = '1';
                    letter.addEventListener('click', function(e) {
                        e.stopPropagation();
                        popup.classList.add('active');
                    });
                }
                
                column.appendChild(letter);
            }
            
            grid.appendChild(column);
        }
    }
    
    // Animation loop
    function animate() {
        // Apply easing
        scrollX += (targetX - scrollX) * SCROLL_SPEED;
        scrollY += (targetY - scrollY) * SCROLL_SPEED;
        
        // Apply transform
        grid.style.transform = `translate(${scrollX}px, ${scrollY}px)`;
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Event handlers
    function handleMouseDown(e) {
        isDragging = true;
        startX = e.clientX - scrollX;
        startY = e.clientY - scrollY;
        document.body.style.cursor = 'grabbing';
        
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    }
    
    function handleMouseMove(e) {
        if (!isDragging) return;
        
        targetX = e.clientX - startX;
        targetY = e.clientY - startY;
    }
    
    function handleMouseUp() {
        isDragging = false;
        document.body.style.cursor = 'grab';
        animate();
    }
    
    // Initialize
    function init() {
        createGrid();
        
        // Event listeners
        gridContainer.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseleave', handleMouseUp);
        
        closePopup.addEventListener('click', function() {
            popup.classList.remove('active');
        });
        
        animate();
    }
    
    init();
});
