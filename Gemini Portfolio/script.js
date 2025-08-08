document.addEventListener('DOMContentLoaded', () => {

    // --- Preloader Logic ---
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // --- Scroll-triggered Fade-in Animations ---
    const fadeElems = document.querySelectorAll('.fade-in');
    const observerOptions = {
        root: null, // observes intersections relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    fadeElems.forEach(elem => {
        observer.observe(elem);
    });
    
    // --- Active Navigation Link Styling ---
    // (A simple version for this multi-page setup)
    const navLinks = document.querySelectorAll('.main-nav a');
    const currentLocation = window.location.href;

    navLinks.forEach(link => {
        if (link.href === currentLocation) {
            // First remove active class from all links
            document.querySelectorAll('.main-nav a.active').forEach(activeLink => {
                activeLink.classList.remove('active');
            });
            // Then add to the current one
            link.classList.add('active');
        }
    });


    // --- Portfolio Page Filtering Logic (Add this to the script) ---
    // This part of the script will only work on portfolio.html if you build it.
    const filterContainer = document.querySelector('.filter-buttons');
    const portfolioItems = document.querySelectorAll('.project-card[data-category]');

    if (filterContainer) {
        filterContainer.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON') return;

            // Handle active button state
            const activeBtn = filterContainer.querySelector('.active');
            activeBtn.classList.remove('active');
            e.target.classList.add('active');

            const filterValue = e.target.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

});