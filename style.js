// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Function to switch tabs
    function switchTab(tabId) {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to selected button and content
        const selectedButton = document.querySelector(`[data-tab="${tabId}"]`);
        const selectedContent = document.getElementById(tabId);
        
        if (selectedButton && selectedContent) {
            selectedButton.classList.add('active');
            selectedContent.classList.add('active');
        }
    }
    
    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            const keyNum = parseInt(e.key);
            if (keyNum >= 1 && keyNum <= 7) {
                e.preventDefault();
                const tabIds = ['history', 'humor', 'proverbs', 'politics', 'medicine', 'culture', 'programmer'];
                if (tabIds[keyNum - 1]) {
                    switchTab(tabIds[keyNum - 1]);
                }
            }
        }
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            const activeButton = document.querySelector('.tab-button.active');
            const allButtons = Array.from(tabButtons);
            const currentIndex = allButtons.indexOf(activeButton);
            
            if (diff > 0 && currentIndex < allButtons.length - 1) {
                // Swipe left - next tab
                allButtons[currentIndex + 1].click();
            } else if (diff < 0 && currentIndex > 0) {
                // Swipe right - previous tab
                allButtons[currentIndex - 1].click();
            }
        }
    }
    
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.animation = 'fadeIn 0.5s ease-in-out';
        });
    });
    
    // Accessibility improvements
    tabButtons.forEach(button => {
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-selected', 'false');
        button.setAttribute('tabindex', '0');
    });
    
    tabContents.forEach(content => {
        content.setAttribute('role', 'tabpanel');
        content.setAttribute('aria-hidden', 'true');
    });
    
    // Update accessibility when tab changes
    function updateAccessibility(tabId) {
        tabButtons.forEach(btn => {
            const isSelected = btn.getAttribute('data-tab') === tabId;
            btn.setAttribute('aria-selected', isSelected.toString());
        });
        
        tabContents.forEach(content => {
            const isHidden = content.id !== tabId;
            content.setAttribute('aria-hidden', isHidden.toString());
        });
    }
    
    // Override switchTab to update accessibility
    const originalSwitchTab = switchTab;
    switchTab = function(tabId) {
        originalSwitchTab(tabId);
        updateAccessibility(tabId);
    };
    
    // Initialize accessibility
    updateAccessibility('history');
});