// Hamburger menu
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const scrollDuration = 800;
const easingFunction = t => t * (2 - t);

let isScrolling = false;

// Function to smoothly scroll to a target element
const smoothScrollTo = (target) => {
    if (!target) return;

    const targetTop = target.getBoundingClientRect().top;
    const start = performance.now();

    const scrollStep = (timestamp) => {
        if (!isScrolling) return;

        const elapsedTime = timestamp - start;
        const progress = Math.min(elapsedTime / scrollDuration, 1);

        window.scrollTo(0, window.scrollY + targetTop * easingFunction(progress));

        if (progress < 1) {
            requestAnimationFrame(scrollStep);
        }
    };

    requestAnimationFrame(scrollStep);
};

mobileMenuBtn.addEventListener('click', () => {
    isScrolling = true;
    smoothScrollTo(document.body);

    // Wait for the scroll animation to finish, then open the menu
    setTimeout(() => {
        mobileMenu.classList.toggle('hidden');
        isScrolling = false;
    }, scrollDuration);
});


// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();

        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            const offset = target.offsetTop; // Get the top offset of the target element
            const headerHeight = document.querySelector('header').clientHeight; // Get the header height

            // Scroll to the target with smooth behavior and adjust the scrolling position
            window.scrollTo({
                top: offset - headerHeight,
                behavior: 'smooth'
            });

            mobileMenu.classList.toggle('hidden');
        }
    });
});

// Add the click event to the scroll-to-top arrow
const scrollToTopArrow = document.getElementById('scroll-to-top');
scrollToTopArrow.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});



// Sticky header
const header = document.querySelector('header');
const nav = header.querySelector('nav');

// Listen for the scroll event
window.addEventListener('scroll', () => {
    // Calculate the scroll distance
    const scrollY = window.scrollY;

    // Apply the sticky effect
    if (scrollY > 0) {
        header.classList.add('sticky-header');
    } else {
        header.classList.remove('sticky-header');
    }
});




// Function to handle intersection
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}

// Create an IntersectionObserver instance with the custom handler
const observer = new IntersectionObserver(handleIntersection, {
    rootMargin: '0px', // Adjust this value as needed
    threshold: 0.2 // Adjust this value as needed
});

// Select all elements with the class 'animation-part'
const animationParts = document.querySelectorAll('.animation-part');

// Observe each animation part
animationParts.forEach(section => {
    observer.observe(section);
});