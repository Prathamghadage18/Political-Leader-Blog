// JavaScript for Shree Ajay Dash Website

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initNavbar();
    initSmoothScrolling();
    initGalleryModal();
    initScrollAnimations();
    initContactForm();
    initNewsletterSignup();
    initSocialShare();
    
    // Navbar functionality
    function initNavbar() {
        const navbar = document.getElementById('mainNav');
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Close mobile menu when clicking on nav links
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
        
        // Add scrolled class styles
        const style = document.createElement('style');
        style.textContent = `
            .navbar.scrolled {
                background: rgba(255, 153, 51, 0.95) !important;
                backdrop-filter: blur(10px);
                padding: 0.5rem 0;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Smooth scrolling for navigation links
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Gallery modal functionality
    function initGalleryModal() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const modal = document.getElementById('galleryModal');
        const modalImage = document.getElementById('modalImage');
        
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                modalImage.src = img.src;
                modalImage.alt = img.alt;
                
                // Update modal title
                const modalTitle = modal.querySelector('.modal-title');
                modalTitle.textContent = img.alt;
            });
        });
        
        // Add keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                const closeBtn = modal.querySelector('.btn-close');
                closeBtn.click();
            }
        });
    }
    
    // Scroll animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animateElements = document.querySelectorAll('.achievement-card, .timeline-content, .blog-post, .gallery-item');
        animateElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
        
        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            .fade-in {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            .fade-in.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .achievement-card:nth-child(1) { transition-delay: 0.1s; }
            .achievement-card:nth-child(2) { transition-delay: 0.2s; }
            .achievement-card:nth-child(3) { transition-delay: 0.3s; }
            .achievement-card:nth-child(4) { transition-delay: 0.4s; }
            .achievement-card:nth-child(5) { transition-delay: 0.5s; }
            .achievement-card:nth-child(6) { transition-delay: 0.6s; }
        `;
        document.head.appendChild(style);
    }
    
    // Contact form functionality
    function initContactForm() {
        const contactForm = document.querySelector('.contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(this);
                const name = this.querySelector('input[type="text"]').value;
                const email = this.querySelector('input[type="email"]').value;
                const subject = this.querySelectorAll('input[type="text"]')[1].value;
                const message = this.querySelector('textarea').value;
                
                // Basic validation
                if (!name || !email || !subject || !message) {
                    showNotification('Please fill in all fields', 'error');
                    return;
                }
                
                if (!isValidEmail(email)) {
                    showNotification('Please enter a valid email address', 'error');
                    return;
                }
                
                // Simulate form submission
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.innerHTML = '<span class="loading"></span> Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="bi bi-check-circle"></i> Sent!';
                    submitBtn.classList.add('btn-success');
                    
                    // Reset form
                    this.reset();
                    
                    showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.classList.remove('btn-success');
                        submitBtn.disabled = false;
                    }, 3000);
                }, 2000);
            });
        }
    }
    
    // Newsletter signup functionality
    function initNewsletterSignup() {
        const newsletterForms = document.querySelectorAll('.newsletter-signup form, .footer .input-group');
        
        newsletterForms.forEach(form => {
            const input = form.querySelector('input[type="email"]');
            const button = form.querySelector('button');
            
            if (input && button) {
                button.addEventListener('click', function() {
                    const email = input.value.trim();
                    
                    if (!email) {
                        showNotification('Please enter your email address', 'error');
                        return;
                    }
                    
                    if (!isValidEmail(email)) {
                        showNotification('Please enter a valid email address', 'error');
                        return;
                    }
                    
                    // Simulate subscription
                    const originalText = button.textContent;
                    button.innerHTML = '<span class="loading"></span> Subscribing...';
                    button.disabled = true;
                    
                    setTimeout(() => {
                        button.innerHTML = '<i class="bi bi-check-circle"></i> Subscribed!';
                        button.classList.add('btn-success');
                        input.value = '';
                        
                        showNotification('Successfully subscribed to newsletter!', 'success');
                        
                        // Reset button after 3 seconds
                        setTimeout(() => {
                            button.innerHTML = originalText;
                            button.classList.remove('btn-success');
                            button.disabled = false;
                        }, 3000);
                    }, 1500);
                });
            }
        });
    }
    
    // Social share functionality
    function initSocialShare() {
        const shareButtons = document.querySelectorAll('.social-share .btn');
        
        shareButtons.forEach(button => {
            button.addEventListener('click', function() {
                const platform = this.querySelector('i').classList[1];
                let shareUrl = '';
                let shareText = 'Check out Shree Ajay Dash - BJP Leader from Odisha!';
                let shareTitle = 'Shree Ajay Dash - BJP Leader';
                
                switch (platform) {
                    case 'bi-facebook':
                        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
                        break;
                    case 'bi-twitter':
                        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(window.location.href)}`;
                        break;
                    case 'bi-whatsapp':
                        shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + window.location.href)}`;
                        break;
                    case 'bi-instagram':
                        // Instagram doesn't support direct sharing via URL
                        showNotification('Copy the link and share on Instagram', 'info');
                        return;
                    case 'bi-youtube':
                        shareUrl = 'https://www.youtube.com/channel/UC...'; // Add actual YouTube channel URL
                        break;
                }
                
                if (shareUrl) {
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                }
            });
        });
    }
    
    // Utility functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="bi bi-${getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add notification styles
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 9999;
                    max-width: 400px;
                    animation: slideInRight 0.3s ease;
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                    padding: 1rem;
                    border-radius: 10px;
                    color: white;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                }
                
                .notification-info { background: #17a2b8; }
                .notification-success { background: #28a745; }
                .notification-error { background: #dc3545; }
                .notification-warning { background: #ffc107; color: #212529; }
                
                .notification i {
                    margin-right: 0.5rem;
                    font-size: 1.2rem;
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    color: inherit;
                    font-size: 1.5rem;
                    margin-left: auto;
                    cursor: pointer;
                    opacity: 0.7;
                }
                
                .notification-close:hover {
                    opacity: 1;
                }
                
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Add to page
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', function() {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
    }
    
    function getNotificationIcon(type) {
        switch (type) {
            case 'success': return 'check-circle';
            case 'error': return 'exclamation-circle';
            case 'warning': return 'exclamation-triangle';
            default: return 'info-circle';
        }
    }
    
    // Add loading animation styles
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        .loading {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        .btn-success {
            background-color: #28a745 !important;
            border-color: #28a745 !important;
        }
    `;
    document.head.appendChild(loadingStyle);
    
    // Add scroll to top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.title = 'Scroll to top';
    document.body.appendChild(scrollToTopBtn);
    
    // Add scroll to top styles
    const scrollToTopStyle = document.createElement('style');
    scrollToTopStyle.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--bjp-saffron);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transition: all 0.3s ease;
            z-index: 1000;
        }
        
        .scroll-to-top:hover {
            background: var(--bjp-saffron-dark);
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.2);
        }
        
        .scroll-to-top.show {
            display: flex;
        }
    `;
    document.head.appendChild(scrollToTopStyle);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K to focus search (if implemented)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            // Focus search input if exists
            const searchInput = document.querySelector('input[type="search"]');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Escape to close modals
        if (e.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal.show');
            openModals.forEach(modal => {
                const closeBtn = modal.querySelector('.btn-close');
                if (closeBtn) closeBtn.click();
            });
        }
    });
    
    // Add lazy loading for images (if needed)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Initialize tooltips if Bootstrap is available
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
    
    // Add page load animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Add loaded class styles
        const loadedStyle = document.createElement('style');
        loadedStyle.textContent = `
            body {
                opacity: 0;
                transition: opacity 0.5s ease;
            }
            
            body.loaded {
                opacity: 1;
            }
        `;
        document.head.appendChild(loadedStyle);
    });
    
    console.log('Shree Ajay Dash website initialized successfully! 🚀');
});
