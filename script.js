// Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    navLinks.classList.toggle('active');

    // Toggle ARIA attributes for accessibility
    const isExpanded = navLinks.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isExpanded);
    // Add/remove overflow-hidden to body to prevent scrolling when menu is open
    document.body.classList.toggle('no-scroll', isExpanded);
}

// Smooth scrolling for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Calculate scroll position, accounting for fixed header height
            const headerOffset = document.querySelector('header').offsetHeight; // Get dynamic header height
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            const hamburger = document.querySelector('.hamburger');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', false);
                document.body.classList.remove('no-scroll');
            }
        }
    });
});

// Update current year in footer
document.addEventListener('DOMContentLoaded', () => {
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Intersection Observer for scroll-reveal animations
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    document.querySelectorAll('section:not(#hero)').forEach(section => {
        section.classList.add('animate-on-scroll'); // Add base animation class
        observer.observe(section);
    });
    
    // Make sure hero is immediately visible (don't wait for intersection)
    const heroSection = document.querySelector('#hero');
    if (heroSection) {
        heroSection.classList.add('is-visible');
    }
});

// ... (your existing JavaScript code) ...

document.addEventListener('DOMContentLoaded', () => {
    // ... (your existing current year and Intersection Observer code) ...

    // Back to Top Button functionality
    const backToTopButton = document.getElementById('back-to-top');

    const toggleBackToTop = () => {
        if (window.scrollY > 300) { // Show button after scrolling 300px
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    };

    window.addEventListener('scroll', toggleBackToTop);

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Initial check in case user loads page already scrolled down
    toggleBackToTop();
});