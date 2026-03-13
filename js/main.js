/* ============================================================================
   PARKER KITCHENS DEMO SITE - JAVASCRIPT
   Handles navigation, modals, scroll animations, and interactions
   ============================================================================ */

// ============================================================================
// DOM ELEMENTS
// ============================================================================

const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const demoModal = document.getElementById('demoModal');
const modalClose = document.querySelector('.modal-close');
const ctaButtons = document.querySelectorAll('.cta-button');
const modalBackdrop = document.querySelector('.modal-backdrop');

// ============================================================================
// MOBILE MENU TOGGLE
// ============================================================================

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================================================================
// DEMO MODAL FUNCTIONALITY
// ============================================================================

function openDemoModal() {
    demoModal.classList.add('active');
    demoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Focus trap - focus on first focusable element
    const focusableElements = demoModal.querySelectorAll('button, a[href]');
    if (focusableElements.length > 0) {
        focusableElements[0].focus();
    }
}

function closeDemoModal() {
    demoModal.classList.remove('active');
    demoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

// Open modal on CTA button click
ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        openDemoModal();
    });
});

// Close modal on close button click
modalClose.addEventListener('click', closeDemoModal);

// Close modal on backdrop click
modalBackdrop.addEventListener('click', closeDemoModal);

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && demoModal.classList.contains('active')) {
        closeDemoModal();
    }
});

// ============================================================================
// SCROLL ANIMATIONS (Intersection Observer)
// ============================================================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards for scroll animations
const animatableElements = document.querySelectorAll(
    '.problem-card, .trust-card, .testimonial-card, .plan-card, .service-card, .success-point'
);

animatableElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ============================================================================
// SMOOTH SCROLL BEHAVIOR
// ============================================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================================================
// PHONE LINK HANDLING
// ============================================================================

const phoneLinks = document.querySelectorAll('.phone-link');
phoneLinks.forEach(link => {
    link.addEventListener('click', () => {
        const phone = link.getAttribute('data-phone');
        window.location.href = `tel:${phone}`;
    });
});

// ============================================================================
// NAVBAR SCROLL EFFECT
// ============================================================================

const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add subtle shadow when scrolled
    if (scrollTop > 10) {
        navbar.style.boxShadow = '0 2px 8px rgba(28, 25, 23, 0.08)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// ============================================================================
// ACCESSIBILITY - FOCUS MANAGEMENT
// ============================================================================

// Trap focus within modal when open
const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function handleModalFocus(e) {
    if (!demoModal.classList.contains('active')) return;
    
    const focusableElements = demoModal.querySelectorAll(focusableSelectors);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        }
    } else {
        // Tab
        if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && demoModal.classList.contains('active')) {
        handleModalFocus(e);
    }
});

// ============================================================================
// PARALLAX EFFECT (SUBTLE)
// ============================================================================

// Subtle parallax on hero section background
const heroBackground = document.querySelector('.hero-background');

if (heroBackground) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        heroBackground.style.transform = `translateY(${scrollTop * 0.5}px)`;
    });
}

// ============================================================================
// BUTTON INTERACTION EFFECTS
// ============================================================================

// Add ripple effect on button click
function addRippleEffect(event) {
    const button = event.currentTarget;
    
    // Only add ripple to CTA buttons
    if (!button.classList.contains('cta-button') && 
        !button.classList.contains('modal-button') &&
        !button.classList.contains('phone-link')) {
        return;
    }
    
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    // Add ripple styles if not already in CSS
    if (!document.querySelector('style[data-ripple]')) {
        const style = document.createElement('style');
        style.setAttribute('data-ripple', 'true');
        style.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
            }
            @keyframes rippleEffect {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
}

// Attach ripple effect to all interactive buttons
document.querySelectorAll('button, .phone-link').forEach(element => {
    element.addEventListener('click', addRippleEffect);
});

// ============================================================================
// PAGE LOAD ANIMATIONS
// ============================================================================

// Animate hero content on load
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }
});

// ============================================================================
// LAZY LOAD IMAGES (if any)
// ============================================================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================================================
// FORM & VALIDATION (if needed in future)
// ============================================================================

// Placeholder for form validation if contact form is added later

// ============================================================================
// CONSOLE LOG FOR TESTING
// ============================================================================

console.log('%cParker Kitchens Demo Site', 'font-size: 16px; color: #CA8A04; font-weight: bold;');
console.log('%cBuilt by Dreamfree', 'font-size: 12px; color: #44403C;');
console.log('%cDemo Features: Mobile-responsive, Scroll animations, Modal CTAs, Accessibility-first', 'font-size: 11px; color: #78716F;');

// ============================================================================
// READY STATE
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Parker Kitchens demo site ready');
    
    // Log viewport and browser info for debugging
    console.log(`Viewport: ${window.innerWidth}x${window.innerHeight}`);
    console.log(`Device pixel ratio: ${window.devicePixelRatio}`);
});

// ============================================================================
// HANDLE WINDOW RESIZE
// ============================================================================

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }, 250);
});

// ============================================================================
// TRACK SCROLL DEPTH (for analytics)
// ============================================================================

let maxScrollPercentage = 0;

window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = scrollHeight > 0 ? 
        (window.pageYOffset / scrollHeight) * 100 : 0;
    
    if (scrollPercentage > maxScrollPercentage) {
        maxScrollPercentage = scrollPercentage;
    }
    
    // Log when user reaches certain milestones (for analytics)
    if (maxScrollPercentage > 25 && maxScrollPercentage < 26) {
        // User has scrolled 25% through page
    }
    if (maxScrollPercentage > 50 && maxScrollPercentage < 51) {
        // User has scrolled 50% through page
    }
    if (maxScrollPercentage > 75 && maxScrollPercentage < 76) {
        // User has scrolled 75% through page
    }
});

// ============================================================================
// PREFERS REDUCED MOTION
// ============================================================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    document.documentElement.style.scrollBehavior = 'auto';
    animatableElements.forEach(el => {
        el.style.transition = 'none';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
}
