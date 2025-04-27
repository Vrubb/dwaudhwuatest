document.addEventListener('DOMContentLoaded', () => {
    // Configuration
    const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const COLUMNS = LETTERS.length;
    const ROWS = 50;
    const SCROLL_SPEED = 0.1;
    
    // DOM Elements
    const gridContainer = document.getElementById('gridContainer');
    const grid = document.getElementById('grid');
    const popup = document.getElementById('popup');
    const closePopup = document.querySelector('.close-popup');
    
    // State
    let scrollY = 0;
    let targetY = 0;
    let isDragging = false;
    let startY = 0;
    let lastY = 0;
    let velocity = 0;
    let animationFrameId = null;
    
    // Create grid columns
    function createGrid() {
        grid.innerHTML = '';
        
        for (let c = 0; c < COLUMNS; c++) {
            const column = document.createElement('div');
            column.className = 'column';
            
            for (let r = 0; r < ROWS; r++) {
                const letter = document.createElement('div');
                letter.className = 'letter';
                letter.textContent = LETTERS[c];
                
                if (LETTERS[c] === 'G') {
                    letter.addEventListener('click', () => {
                        popup.classList.add('active');
                    });
                }
                
                column.appendChild(letter);
            }
            
            grid.appendChild(column);
        }
    }
    
    // Smooth scroll animation
    function animate() {
        // Apply easing
        scrollY += (targetY - scrollY) * SCROLL_SPEED;
        
        // Apply scroll to grid
        grid.style.transform = `translate(-50%, ${scrollY}px)`;
        
        animationFrameId = requestAnimationFrame(animate);
    }
    
    // Handle mouse down
    function handleMouseDown(e) {
        isDragging = true;
        startY = e.clientY;
        lastY = e.clientY;
        targetY = scrollY;
        document.body.style.cursor = 'grabbing';
        
        // Cancel any existing animation
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    }
    
    // Handle mouse move
    function handleMouseMove(e) {
        if (!isDragging) return;
        
        const deltaY = e.clientY - lastY;
        targetY += deltaY;
        lastY = e.clientY;
        velocity = deltaY;
    }
    
    // Handle mouse up
    function handleMouseUp() {
        if (!isDragging) return;
        
        isDragging = false;
        document.body.style.cursor = 'grab';
        
        // Apply momentum
        targetY += velocity * 10;
        
        // Start animation
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
        
        closePopup.addEventListener('click', () => {
            popup.classList.remove('active');
        });
        
        // Start animation
        animate();
    }
    
    init();
});
