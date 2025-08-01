document.addEventListener("DOMContentLoaded", () => {
    // Navigation functionality
    const navLinks = document.querySelectorAll("nav ul li a, .site-title a, .logo a");
    const hamburger = document.querySelector(".hamburger");
    const navUl = document.querySelector("nav ul");

    function toggleMenu() {
        hamburger.classList.toggle("active");
        navUl.classList.toggle("active");
    }

    hamburger.addEventListener("click", toggleMenu);
    hamburger.setAttribute('tabindex', '0');
    hamburger.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') toggleMenu();
    });

    navLinks.forEach((link) => {
        link.setAttribute('tabindex', '0');
        link.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') link.click();
        });
        link.addEventListener("click", () => {
            navUl.classList.remove("active");
            hamburger.classList.remove("active");
        });
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href").substring(1);
            if (targetId === "hero") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({ behavior: "smooth" });
                }
            }
        });
    });

    // Modal functionality
    const openModalButtons = document.querySelectorAll("[data-modal-target]");
    const closeModalButtons = document.querySelectorAll("[data-close-button]");
    const overlay = document.getElementById("overlay");

    openModalButtons.forEach((button) => {
        button.setAttribute('tabindex', '0');
        button.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') button.click();
        });
        button.addEventListener("click", () => {
            const modal = document.querySelector(button.dataset.modalTarget);
            openModal(modal);
        });
    });

    closeModalButtons.forEach((button) => {
        button.setAttribute('tabindex', '0');
        button.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') button.click();
        });
        button.addEventListener("click", () => {
            const modal = button.closest(".modal, .blog-modal");
            closeModal(modal); // Close the specific modal
        });
    });

    if (overlay) {
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                document.querySelectorAll(".modal.active, .blog-modal.active").forEach((modal) => {
                    closeModal(modal);
                });
            }
        });
    }

    function openModal(modal) {
        if (!modal) return;
        modal.classList.add("active");
        overlay.classList.add("active");
        document.body.style.overflow = "hidden"; // Disable scrolling
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = ""; // Re-enable scrolling
    }

    // Back to Top Button
    const backToTopButton = document.getElementById("backToTop");
    window.addEventListener("scroll", () => {
        backToTopButton.style.display = window.scrollY > 300 ? "block" : "none";
    });
    backToTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById("darkModeToggle");
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    // Header hide and stick on scroll
    const header = document.querySelector("header");
    let lastScrollTop = 0;
    let isScrolling;

    window.addEventListener("scroll", () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            header.classList.add("hidden"); // Hide header when scrolling down
            header.classList.remove("sticky"); // Remove sticky class
        } else {
            header.classList.remove("hidden"); // Show header when scrolling up
            header.classList.add("sticky"); // Add sticky class
        }

        lastScrollTop = scrollTop;

        // Clear timeout if scrolling
        clearTimeout(isScrolling);

        // Add hidden class after scrolling stops
        isScrolling = setTimeout(() => {
            if (scrollTop > 0) {
                header.classList.add("hidden");
            }
        }, 200); // Delay before hiding header after scrolling stops
    });

    // Enhanced 3D hero title effect
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.addEventListener('mousemove', (e) => {
            const { offsetX, offsetY, target } = e;
            const { offsetWidth, offsetHeight } = target;
            
            // Calculate rotation
            const xPos = ((offsetX / offsetWidth) - 0.5) * 2;
            const yPos = ((offsetY / offsetHeight) - 0.5) * 2;
            
            // Apply more dramatic 3D transform
            heroTitle.style.transform = `
                perspective(1000px)
                rotateX(${yPos * 10}deg)
                rotateY(${xPos * 10}deg)
                translateZ(50px)
            `;
            
            // Dynamic shadow based on mouse position
            const shadowX = xPos * 20;
            const shadowY = yPos * 20;
            heroTitle.style.textShadow = `
                ${shadowX}px ${shadowY}px 7px #fff,
                ${shadowX * 1.2}px ${shadowY * 1.2}px 10px #fff,
                ${shadowX * 1.4}px ${shadowY * 1.4}px 21px #FFD700,
                ${shadowX * 1.6}px ${shadowY * 1.6}px 42px #FFD700,
                ${shadowX * 1.8}px ${shadowY * 1.8}px 82px #FFD700
            `;
        });

        heroTitle.addEventListener('mouseleave', () => {
            heroTitle.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            heroTitle.style.textShadow = '';
        });
    }

    // Testimonial carousel
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });
    }

    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 6000);

    // Scroll-triggered animations
    const elementsToAnimate = document.querySelectorAll('section, .service, .project-card, .blog-card, .icon-placeholder, #about, .testimonial, footer');
    function checkElementsInView() {
        elementsToAnimate.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
                element.classList.add('in-view');
            }
        });
    }

    window.addEventListener('scroll', checkElementsInView);
    window.addEventListener('load', checkElementsInView);

    // Services section visibility
    const servicesSection = document.querySelector("#services");
    if (servicesSection) {
        servicesSection.style.display = "block";
        servicesSection.style.visibility = "visible";
        servicesSection.style.opacity = "1";
        servicesSection.style.zIndex = "2";
    }

    // Ensure services section z-index
    if (servicesSection) {
        servicesSection.style.zIndex = "1"; // Ensure it is above other elements
    }

    // Ensure blog section visibility
    const blogSection = document.querySelector("#blog");
    if (blogSection) {
        blogSection.style.display = "block";
        blogSection.style.visibility = "visible";
        blogSection.style.opacity = "1";
    }

    // Ensure projects section visibility
    const projectsSection = document.querySelector("#projects");
    if (projectsSection) {
        projectsSection.style.display = "block";
        projectsSection.style.visibility = "visible";
        projectsSection.style.opacity = "1";
    }

    // Ensure portfolio section visibility
    const portfolioSection = document.querySelector("#portfolio");
    if (portfolioSection) {
        portfolioSection.style.display = "block";
        portfolioSection.style.visibility = "visible";
        portfolioSection.style.opacity = "1";
    }

    // About logo animations
    const aboutLogo = document.querySelector('.about-logo');
    if (aboutLogo) {
        aboutLogo.setAttribute('tabindex', '0');
        aboutLogo.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') aboutLogo.click();
        });
        aboutLogo.addEventListener('click', () => {
            ['bounce', 'spin', 'flip', 'shoot', 'flip-vertical'].forEach((animation, i) => {
                setTimeout(() => {
                    aboutLogo.classList.add(animation);
                    setTimeout(() => aboutLogo.classList.remove(animation), 1000 + (i === 3 ? 3000 : 0));
                }, i * 100);
            });
        });
    }

    // Portfolio iframe viewer
    window.openIframe = function (url) {
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:10000;';
        const iframeContainer = document.createElement('div');
        iframeContainer.style.cssText = 'position:fixed;top:50%;left:50%;width:80%;height:80%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.8);border-radius:10px;overflow:hidden;z-index:10001;';
        const closeButton = document.createElement('button');
        closeButton.innerText = 'Close';
        closeButton.style.cssText = 'position:absolute;top:10px;right:10px;padding:10px;background:#FFD700;border:none;border-radius:5px;cursor:pointer;z-index:10002;';
        closeButton.addEventListener('click', () => document.body.removeChild(overlay));
        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;border:none;';
        iframeContainer.append(iframe, closeButton);
        overlay.appendChild(iframeContainer);
        document.body.appendChild(overlay);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) document.body.removeChild(overlay);
        });
    };

    // Make service images open modals
    const serviceImages = document.querySelectorAll(".service img[data-modal-target]");
    serviceImages.forEach((img) => {
        img.addEventListener("click", () => {
            const modal = document.querySelector(img.dataset.modalTarget);
            openModal(modal);
        });
    });

    // Make blog images open modals
    const blogImages = document.querySelectorAll(".blog-card img[data-modal-target]");
    blogImages.forEach((img) => {
        img.addEventListener("click", () => {
            const modal = document.querySelector(img.dataset.modalTarget);
            openModal(modal);
        });
    });

    // Form security and rate limiting
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const submissionDelay = 30000; // 30 seconds between submissions
    let lastSubmission = 0;

    // Generate CSRF token
    const csrfToken = Math.random().toString(36).substring(2);
    document.querySelector('input[name="_csrf"]').value = csrfToken;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Check submission rate
        const now = Date.now();
        if (now - lastSubmission < submissionDelay) {
            alert('Please wait before submitting again.');
            return;
        }

        // Basic spam check
        const honeypot = document.querySelector('input[name="_gotcha"]').value;
        if (honeypot) {
            return; // Silently fail if honeypot is filled
        }

        // Disable submit button
        submitBtn.disabled = true;
        
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json',
                    'X-CSRF-Token': csrfToken
                }
            });

            if (response.ok) {
                contactForm.reset();
                alert('Message sent successfully!');
                lastSubmission = now;
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            alert('Error sending message. Please try again later.');
        } finally {
            submitBtn.disabled = false;
        }
    });

    // Protect against XSS in chat messages
    function sanitizeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // Update message display function
    function addMessage(text, from) {
        const msg = document.createElement('div');
        msg.className = 'chatbot-message ' + from;
        msg.style.margin = '0.5rem 0';
        msg.style.textAlign = from === 'user' ? 'right' : 'left';
        // Sanitize message content
        const sanitizedText = sanitizeHTML(text);
        msg.innerHTML = `<span style="background:${from==='user'?'#FFD700':'#2563eb'};color:${from==='user'?'#222':'#fff'};padding:0.5em 1em;border-radius:16px;display:inline-block;max-width:80%;">${sanitizedText}</span>`;
        chatbotMessages.appendChild(msg);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Smooth scroll to contact form
    function scrollToContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.scrollIntoView({ behavior: 'smooth' });
            // Focus on the name input after scrolling
            setTimeout(() => {
                document.getElementById('name').focus();
            }, 1000);
        }
    }
});