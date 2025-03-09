document.addEventListener("DOMContentLoaded", function () {
    // Remove the existing form submission handling code

    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach((link) => {
        link.setAttribute('tabindex', '0');
        link.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                link.click();
            }
        });
        link.addEventListener("click", function () {
            const navUl = document.querySelector("nav ul");
            navUl.classList.remove("active");
            const hamburger = document.querySelector(".hamburger");
            hamburger.classList.remove("active");
        });
    });

    const openModalButtons = document.querySelectorAll("[data-modal-target]");
    const closeModalButtons = document.querySelectorAll("[data-close-button]");
    const overlay = document.getElementById("overlay");

    openModalButtons.forEach((button) => {
        button.setAttribute('tabindex', '0');
        button.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                button.click();
            }
        });
        button.addEventListener("click", () => {
            const modal = document.querySelector(button.dataset.modalTarget);
            openModal(modal);
        });
    });

    closeModalButtons.forEach((button) => {
        button.setAttribute('tabindex', '0');
        button.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                button.click();
            }
        });
        button.addEventListener("click", () => {
            const modal = button.closest(".modal");
            closeModal(modal);
        });
    });

    if (overlay) {
        overlay.addEventListener("click", () => {
            const modals = document.querySelectorAll(".modal.active, .blog-modal.active");
            modals.forEach((modal) => {
                closeModal(modal);
            });
        });
    }

    function openModal(modal) {
        if (modal == null) return;
        modal.classList.add("active");
        overlay.classList.add("active");
    }

    function closeModal(modal) {
        if (modal == null) return;
        modal.classList.remove("active");
        overlay.classList.remove("active");
    }

    window.closeModal = closeModal;

    // Handle background position on scroll
    document.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        document.body.style.backgroundPositionY = `${scrollPosition * 0.5}px`; /* Adjust the multiplier for desired effect */
    });

    window.openIframe = function (url) {
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        overlay.style.zIndex = '10000';

        const iframeContainer = document.createElement('div');
        iframeContainer.style.position = 'fixed';
        iframeContainer.style.top = '50%';
        iframeContainer.style.left = '50%';
        iframeContainer.style.width = '80%';
        iframeContainer.style.height = '80%';
        iframeContainer.style.transform = 'translate(-50%, -50%)';
        iframeContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        iframeContainer.style.zIndex = '10001';
        iframeContainer.style.borderRadius = '10px';
        iframeContainer.style.overflow = 'hidden';

        const closeButton = document.createElement('button');
        closeButton.innerText = 'Close';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '10px';
        closeButton.style.right = '10px';
        closeButton.style.padding = '10px';
        closeButton.style.backgroundColor = '#FFD700';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '5px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.zIndex = '10002';
        closeButton.setAttribute('tabindex', '0');
        closeButton.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                closeButton.click();
            }
        });
        closeButton.addEventListener('click', () => {
            document.body.removeChild(overlay);
        });

        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';

        iframeContainer.appendChild(iframe);
        iframeContainer.appendChild(closeButton);
        overlay.appendChild(iframeContainer);
        document.body.appendChild(overlay);

        // Close iframe when clicking outside of it
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
    };

    // Add animations to the logo in the About section
    const aboutLogo = document.querySelector('.about-logo');
    if (aboutLogo) {
        aboutLogo.setAttribute('tabindex', '0');
        aboutLogo.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                aboutLogo.click();
            }
        });
        aboutLogo.addEventListener('click', () => {
            aboutLogo.classList.add('bounce');
            setTimeout(() => {
                aboutLogo.classList.remove('bounce');
            }, 6000); // Duration of the bounce animation
        });

        aboutLogo.addEventListener('click', () => {
            aboutLogo.classList.add('spin');
            setTimeout(() => {
                aboutLogo.classList.remove('spin');
            }, 1000); // Duration of the spin animation
        });

        aboutLogo.addEventListener('click', () => {
            aboutLogo.classList.add('flip');
            setTimeout(() => {
                aboutLogo.classList.remove('flip');
            }, 1000); // Duration of the flip animation
        });

        aboutLogo.addEventListener('click', () => {
            aboutLogo.classList.add('shoot');
            setTimeout(() => {
                aboutLogo.classList.remove('shoot');
            }, 4000); // Duration of the shoot animation
        });

        // Add flip vertical animation to the logo in the About section
        aboutLogo.addEventListener('click', () => {
            aboutLogo.classList.add('flip-vertical');
            setTimeout(() => {
                aboutLogo.classList.remove('flip-vertical');
            }, 1000); // Duration of the flip vertical animation
        });
    }

    // Add event listeners to the "Contact" buttons in the blog modals
    const modalBtns = document.querySelectorAll('.modal-btn');
    modalBtns.forEach((btn) => {
        btn.setAttribute('tabindex', '0');
        btn.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                btn.click();
            }
        });
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor behavior
            closeModal(btn.closest('.blog-modal')); // Close the modal
            setTimeout(() => {
                // Scroll to the footer after the modal closes
                document.querySelector('#footer').scrollIntoView({ behavior: 'smooth' });
            }, 300); // Delay to allow the modal to close first
        });
    });

    // Testimonial carousel functionality
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove('active');
            if (i === index) {
                testimonial.classList.add('active');
            }
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    // Initial display
    showTestimonial(currentTestimonial);

    // Change testimonial every 6 seconds
    setInterval(nextTestimonial, 6000);

    // Add 3D effect to the hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.addEventListener('mousemove', (e) => {
            const { offsetX, offsetY, target } = e;
            const { offsetWidth, offsetHeight } = target;
            const xPos = (offsetX / offsetWidth) - 0.5;
            const yPos = (offsetY / offsetHeight) - 0.5;
            heroTitle.style.transform = `rotateX(${yPos * 30}deg) rotateY(${xPos * 30}deg)`;
        });

        heroTitle.addEventListener('mouseleave', () => {
            heroTitle.style.transform = 'rotateX(0) rotateY(0)';
        });
    }

    let lastScrollTop = 0;
    const header = document.querySelector("header");

    window.addEventListener("scroll", function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            // Scroll down
            header.style.top = "-100px"; // Adjust as needed
        } else {
            // Scroll up
            header.style.top = "0";
        }
        lastScrollTop = scrollTop;
    });

    // Back to Top Button
    const backToTopButton = document.getElementById("backToTop");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    });

    backToTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Dark Mode Toggle Button
    const darkModeToggle = document.getElementById("darkModeToggle");
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    // Function to check if an element is in the viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Add 'in-view' class to elements when they come into view
    const elementsToAnimate = document.querySelectorAll('section, .service, .project-card, .blog-card, .icon-placeholder, #about, .testimonial, footer');
    function checkElementsInView() {
        elementsToAnimate.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('in-view');
            }
        });
    }

    // Check elements on scroll and on load
    window.addEventListener('scroll', checkElementsInView);
    window.addEventListener('load', checkElementsInView);

    // Initial check
    checkElementsInView();
});

function toggleMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navUl = document.querySelector("nav ul");
    hamburger.setAttribute('tabindex', '0');
    hamburger.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            hamburger.click();
        }
    });
    hamburger.classList.toggle("active");
    navUl.classList.toggle("active");
}