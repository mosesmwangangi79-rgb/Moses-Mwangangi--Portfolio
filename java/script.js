document.addEventListener("DOMContentLoaded", function () {

    // 1. WELCOME BUTTON
    const welcomeBtn = document.getElementById("welcomeBtn");

    if (welcomeBtn) {
        welcomeBtn.addEventListener("click", function () {
            alert("Welcome to Moses's Software Engineering Portfolio! 🚀");
        });
    }


    // 2. DYNAMIC COPYRIGHT YEAR
    // Finds the footer and updates the year automatically.
    const footer = document.querySelector(".footer");

    if (footer) {
        const paragraphs = footer.querySelectorAll("p");

        paragraphs.forEach(function (paragraph) {
            if (paragraph.textContent.includes("All rights reserved")) {
                paragraph.textContent =
                    "© " + new Date().getFullYear() +
                    " All rights reserved.";
            }
        });
    }


    // 3. SCROLL ANIMATIONS
    const animatedSections = document.querySelectorAll(
        ".section-heading, .about-content, .skill-card, " +
        ".project-card, .education-card, .contact-content"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("js-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        animatedSections.forEach(function (element) {
            element.classList.add("js-reveal");
            observer.observe(element);
        });
    }


    // 4. CONTACT FORM VALIDATION
    const contactForm = document.querySelector(".contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !subject || !message) {
                alert("Please fill in all the fields.");
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            alert(
                "Thank you, " + name + "! Your form is valid. " +
                "However, the website needs a backend or form service " +
                "to deliver your message."
            );
        });
    }


    // 5. ACTIVE NAVIGATION LINK
    const navLinks = document.querySelectorAll(
        '.navbar a[href^="#"]'
    );

    const pageSections = document.querySelectorAll(
        "main section[id]"
    );

    function updateActiveLink() {
        let currentSection = "home";

        pageSections.forEach(function (section) {
            if (window.scrollY >= section.offsetTop - 160) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(function (link) {
            if (link.getAttribute("href") === "#" + currentSection) {
                link.classList.add("js-active");
            } else {
                link.classList.remove("js-active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();


    // 6. CONFIRM JAVASCRIPT IS WORKING
    console.log("Moses Portfolio JavaScript loaded successfully!");
// 7. MOBILE NAVIGATION MENU
    const menuToggle = document.getElementById("menuToggle");
    const mainNavbar = document.getElementById("mainNavbar");

    if (menuToggle && mainNavbar) {

        menuToggle.addEventListener("click", function () {
            const isOpen = mainNavbar.classList.toggle("menu-open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });

        // Close the menu after clicking an internal navigation link.
        mainNavbar.querySelectorAll('a[href^="#"]').forEach(function (link) {
            link.addEventListener("click", function () {
                mainNavbar.classList.remove("menu-open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");
            });
        });

        // Close the menu when switching to desktop width.
        window.addEventListener("resize", function () {
            if (window.innerWidth > 768) {
                mainNavbar.classList.remove("menu-open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");
            }
        });
    }
});