/**
 * Portfolio Core JavaScript
 * Handles initialization, animations, scroll effects, filtering, and interactivity.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Loading Screen
    // ==========================================
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
        
        // Trigger initial reveals after load
        triggerReveals();
    }, 2000); // 2 second delay to simulate heavy loading for cyberpunk feel

    // ==========================================
    // 2. Custom Cursor (Magnetic & Hover Effects)
    // ==========================================
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    // Only activate custom cursor on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        // Smooth outline follow
        const animateCursor = () => {
            let distX = mouseX - outlineX;
            let distY = mouseY - outlineY;
            
            outlineX += distX * 0.2;
            outlineY += distY * 0.2;
            
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
            
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Hover states
        const interactiveElements = document.querySelectorAll('a, button, .magnetic, summary');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    }

    // ==========================================
    // 3. Navigation & Mobile Menu
    // ==========================================
    const navbar = document.getElementById('navbar');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navOverlay = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // Mobile Menu Toggle
    mobileBtn.addEventListener('click', () => {
        const isExpanded = mobileBtn.getAttribute('aria-expanded') === 'true';
        mobileBtn.setAttribute('aria-expanded', !isExpanded);
        navOverlay.classList.toggle('active');
        document.body.style.overflow = isExpanded ? 'auto' : 'hidden';
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileBtn.setAttribute('aria-expanded', 'false');
            navOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Active state
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // ==========================================
    // 4. Scroll Progress & Back to Top
    // ==========================================
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        // Scroll Progress
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + "%";

        // Back to top button
        if (winScroll > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
        
        // Active section tracking
        let current = '';
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            if (winScroll >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current) && current !== '') {
                link.classList.add('active');
            }
        });
    }, { passive: true });

    // ==========================================
    // 5. Intersection Observer (Scroll Reveals & Counters)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
    const counters = document.querySelectorAll('.counter');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it's a counter, animate it
                if (entry.target.classList.contains('counter')) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target); // Only animate once
                } else {
                    // Check if children have counters
                    const childCounters = entry.target.querySelectorAll('.counter');
                    childCounters.forEach(c => {
                        animateCounter(c);
                        c.classList.remove('counter'); // Prevent double animation
                    });
                }
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));
    
    // Function to trigger reveals immediately if already in viewport
    function triggerReveals() {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('active');
                const childCounters = el.querySelectorAll('.counter');
                childCounters.forEach(c => {
                    animateCounter(c);
                    c.classList.remove('counter');
                });
            }
        });
    }

    // Counter Animation Logic
    function animateCounter(counter) {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target + (target > 10 ? '+' : '');
            }
        };
        updateCounter();
    }

    // ==========================================
    // 6. Project Filtering & Search
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectSearch = document.getElementById('project-search');

    function filterProjects() {
        const searchTerm = projectSearch.value.toLowerCase();
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');

        projectCards.forEach(card => {
            const title = card.querySelector('.project-title').innerText.toLowerCase();
            const tech = card.querySelector('.tech-tags').innerText.toLowerCase();
            const categories = card.getAttribute('data-category');
            
            const matchesSearch = title.includes(searchTerm) || tech.includes(searchTerm);
            const matchesFilter = activeFilter === 'all' || categories.includes(activeFilter);

            if (matchesSearch && matchesFilter) {
                card.style.display = 'flex';
                // Small animation trick
                card.style.animation = 'none';
                card.offsetHeight; // trigger reflow
                card.style.animation = null;
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
            }
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProjects();
        });
    });

    if(projectSearch) {
        projectSearch.addEventListener('input', filterProjects);
    }

    // ==========================================
    // 7. Certifications Search
    // ==========================================
    const certSearch = document.getElementById('cert-search');
    const certCards = document.querySelectorAll('.cert-dashboard-card');

    if (certSearch) {
        certSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            certCards.forEach(card => {
                const text = card.innerText.toLowerCase();
                if (text.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // ==========================================
    // 8. Typing Animation
    // ==========================================
    const typingText = document.getElementById('typing-text');
    const words = ["Full Stack Developer", "AI Enthusiast", "Cybersecurity Enthusiast"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(type, typeSpeed);
    }
    
    if (typingText) {
        setTimeout(type, 2500); // Start after loader finishes
    }

    // ==========================================
    // 9. Parallax Effect for Hero
    // ==========================================
    const parallaxElements = document.querySelectorAll('[data-parallax="true"]');
    
    window.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth - e.pageX) / 90;
        const y = (window.innerHeight - e.pageY) / 90;
        
        parallaxElements.forEach(el => {
            const speed = el.getAttribute('data-speed') || 1;
            el.style.transform = `translateX(${x * speed}px) translateY(${y * speed}px)`;
        });
    });

    // ==========================================
    // 10. Copy to Clipboard
    // ==========================================
    const copyBtns = document.querySelectorAll('.copy-btn');
    const toast = document.getElementById('toast');
    let toastTimeout;

    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Show toast
                toast.classList.add('show');
                
                // Change icon temporarily
                const icon = btn.querySelector('i');
                icon.className = 'fas fa-check';
                
                clearTimeout(toastTimeout);
                toastTimeout = setTimeout(() => {
                    toast.classList.remove('show');
                    icon.className = 'far fa-copy';
                }, 3000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    });

    // ==========================================
    // 11. Form Validation & Submission
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic HTML5 validation trigger
            if (!contactForm.checkValidity()) {
                const formGroups = contactForm.querySelectorAll('.form-group');
                formGroups.forEach(group => {
                    const input = group.querySelector('.form-control');
                    if (!input.checkValidity()) {
                        group.classList.add('invalid');
                    } else {
                        group.classList.remove('invalid');
                    }
                });
                return;
            }
            
            // If valid, simulate send
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<span>Sending... <i class="fas fa-spinner fa-spin"></i></span>';
            btn.disabled = true;
            
            // Simulate network request
            setTimeout(() => {
                btn.innerHTML = '<span>Message Sent! <i class="fas fa-check"></i></span>';
                btn.classList.replace('btn-primary', 'btn-secondary');
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.classList.replace('btn-secondary', 'btn-primary');
                }, 3000);
            }, 2000);
        });
        
        // Remove invalid class on input
        const inputs = contactForm.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.parentElement.classList.remove('invalid');
            });
        });
    }

    // ==========================================
    // 12. Floating Particles Canvas (Vanilla JS)
    // ==========================================
    const canvas = document.getElementById('particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particlesArray = [];
        const numberOfParticles = window.innerWidth < 768 ? 40 : 80;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.color = Math.random() > 0.5 ? 'rgba(26, 140, 255, 0.5)' : 'rgba(153, 51, 255, 0.5)';
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x > canvas.width) this.x = 0;
                else if (this.x < 0) this.x = canvas.width;
                
                if (this.y > canvas.height) this.y = 0;
                else if (this.y < 0) this.y = canvas.height;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particlesArray = [];
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        });
    }

    // ==========================================
    // 13. Dynamic Year Footer
    // ==========================================
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // ==========================================
    // 14. PROJECT M: SECRET TRIGGER
    // ==========================================
    let secretBuffer = "";
    const secretCode = "bmw";

    window.addEventListener("keydown", (e) => {
        // Method 1: Typing "bmw"
        if (e.key.length === 1 && e.key.match(/[a-zA-Z]/)) {
            secretBuffer += e.key.toLowerCase();
            if (secretBuffer.length > secretCode.length) {
                secretBuffer = secretBuffer.substring(1);
            }
            if (secretBuffer === secretCode) {
                triggerProjectMBoot();
                secretBuffer = "";
            }
        }
        
        // Method 2: CTRL + SHIFT + M
        if (e.ctrlKey && e.shiftKey && (e.key === "M" || e.key === "m")) {
            e.preventDefault();
            triggerProjectMBoot();
        }
    });

    function triggerProjectMBoot() {
        const bootScreen = document.getElementById("project-m-boot");
        if (!bootScreen) return;
        
        bootScreen.classList.add("active");
        
        const lines = [
            { el: document.getElementById("boot-text-1"), text: "ACCESS GRANTED", delay: 500 },
            { el: document.getElementById("boot-text-2"), text: "Authenticating...", delay: 1500 },
            { el: document.getElementById("boot-text-3"), text: "BMW PROTOCOL", delay: 2500 },
            { el: document.getElementById("boot-text-4"), text: "Garage Unlocking...", delay: 3500 }
        ];

        lines.forEach(line => {
            setTimeout(() => {
                line.el.textContent = line.text;
            }, line.delay);
        });

        // Progress bar animation
        setTimeout(() => {
            const bar = document.querySelector(".boot-progress-bar");
            const fill = document.querySelector(".boot-progress-fill");
            if(bar && fill) {
                bar.style.display = "block";
                setTimeout(() => fill.style.width = "100%", 100);
            }
        }, 1500);

        // Redirect to garage.html
        setTimeout(() => {
            window.location.href = "garage.html";
        }, 4500);
    }
});
