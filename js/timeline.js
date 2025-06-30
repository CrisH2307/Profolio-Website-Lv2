document.addEventListener('DOMContentLoaded', () => {
    // Get all timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');

    // Function to check if element is in viewport
    const isInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    };

    // Function to handle scroll
    const handleScroll = () => {
        timelineItems.forEach(item => {
            if (isInViewport(item)) {
                item.classList.add('visible');
            } else {
                item.classList.remove('visible');
            }
        });
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Initial check
    handleScroll();
});
