// Set active nav link based on current page
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Handle root path
        if (currentPage === '/' && href === '/') {
            link.classList.add('active');
        } else if (currentPage.includes(href) && href !== '/') {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Initialize scroll animations
    observeElements();
});

// Intersection Observer for scroll-triggered animations
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe all animated elements
    document.querySelectorAll('.work-item, .work-detail, .about-section, .contact-method, .skill-column').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add hover animation to interactive elements
document.querySelectorAll('.work-item, .contact-method').forEach(el => {
    el.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    el.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Smooth transitions for buttons
document.querySelectorAll('.cta-button, .view-more').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(5px)';
    });
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

// Add ripple effect on click for buttons
document.querySelectorAll('.cta-button, .btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        setTimeout(() => ripple.remove(), 600);
    });
});

console.log('Portfolio loaded with animations');
