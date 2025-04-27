document.addEventListener('DOMContentLoaded', () => {
    // Configuration
    const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const COLUMNS = 100; // Enough columns for infinite feel
    const ROWS = 100;    // Enough rows for infinite feel
    const SCROLL_SPEED = 0.08;
    const COLUMN_WIDTH = 60;
    const ROW_HEIGHT = 60;
    
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
    let animationFrameId = null;
    
    // Create grid
    function createGrid() {
        grid.innerHTML = '';
        
        // Make grid large enough for infinite feeling
        grid.style.width = `${COLUMNS * COLUMN_WIDTH}px`;
        grid.style.height = `${ROWS * ROW_HEIGHT}px`;
        
        // Create repeating A-Z pattern
        for (let c = 0; c < COLUMNS; c++) {
            const column = document.createElement('div');
            column.className = 'column';
            
            for (let r = 0; r < ROWS; r++) {
                const letter = document.createElement('div');
                letter.className = 'letter';
                const letterIndex = (c + r) % LETTERS.length;
                letter.textContent = LETTERS[letterIndex];
                
                // Make "G" interactive
                if (letter.textContent === 'G') {
                    letter.style.opacity = '1';
                    letter.addEventListener('click', (e) => {
                        e.stopPropagation();
                        popup.classList.add('active');
                    });
                }
                
                column.appendChild(letter);
            }
            
            grid.appendChild(column);
        }
    }
    
    // Handle smooth scrolling with boundaries
    function updateScroll() {
        // Apply easing
        scrollX += (targetX - scrollX) * SCROLL_SPEED;
        scrollY += (targetY - scrollY) * SCROLL_SPEED;
        
        // Apply scroll to grid
        grid.style.transform = `translate(${scrollX}px, ${scrollY}px)`;
        
        animationFrameId = requestAnimationFrame(updateScroll);
    }
    
    // Handle mouse down
    function handleMouseDown(e) {
        isDragging = true;
        startX = e.clientX - scrollX;
        startY = e.clientY - scrollY;
        document.body.style.cursor = 'grabbing';
        
        // Cancel any existing animation
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    }
    
    // Handle mouse move
    function handleMouseMove(e) {
        if (!isDragging) return;
        
        targetX = e.clientX - startX;
        targetY = e.clientY - startY;
    }
    
    // Handle mouse up
    function handleMouseUp() {
        isDragging = false;
        document.body.style.cursor = 'grab';
        
        // Restart animation
        updateScroll();
    }
    
    // Initialize
    function init() {
        createGrid();
        
        // Event listeners
        gridContainer.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseleave', handleMouseUp);
        
        closePopup.addEventListener('click', () => {
            popup.classList.remove('active');
        });
        
        // Start animation
        updateScroll();
    }
    
    init();
});
