document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       01. MOBILE HAMBURGER MENU
       ========================================= */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    // Safety check to ensure elements exist before adding events
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Toggle icon between hamburger (☰) and close (X)
            if (navMenu.classList.contains('active')) {
                hamburger.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            } else {
                hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
            }
        });

        // Close the menu automatically when a link or button is clicked
        document.querySelectorAll('.nav-links a, .nav-cta a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });
    }

    /* =========================================
       02. SMOOTH SCROLL NAVIGATION (WITH OFFSET)
       ========================================= */
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            const targetId = link.getAttribute('href');
            
            // Only execute if it's an anchor link pointing to an ID
            if (targetId && targetId.startsWith("#")) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Calculates header height so it doesn't overlap the section title
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    /* =========================================
       03. HEADER SCROLL EFFECT
       ========================================= */
    const header = document.getElementById('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    /* =========================================
       04. NUMBER COUNTER ANIMATION
       ========================================= */
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        const speed = 200; // The lower the number, the faster the count

        counters.forEach(counter => {
            // Prevent re-animating if already completed
            if (counter.classList.contains('animated')) return;

            const target = +counter.getAttribute('data-target');
            
            const updateCount = () => {
                const count = +counter.innerText;
                const inc = target / speed;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15); // Refresh rate
                } else {
                    counter.innerText = target;
                    counter.classList.add('animated'); // Mark as finished
                }
            };
            
            updateCount();
        });
    }

    /* =========================================
       05. SCROLL REVEAL ANIMATIONS (OBSERVER)
       ========================================= */
    const observerOptions = { 
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px" // Triggers slightly before coming into full view
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add active class to trigger CSS fade-in
                entry.target.classList.add('active');

                // Trigger number counters when Hero or Experience sections appear
                if (entry.target.id === 'experience' || entry.target.id === 'hero') {
                    animateCounters();
                }

                // Trigger legacy animations if those elements exist
                if (entry.target.id === 'skills') {
                    if (typeof animateSkillBars === 'function') animateSkillBars();
                    if (typeof loadRadarChart === 'function') loadRadarChart();
                }
                
                // Stop observing once animated to save memory
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Target all elements with the 'reveal' class, plus the hero section
    document.querySelectorAll('.reveal, .hero-new, #hero').forEach(el => {
        observer.observe(el);
    });

    /* =========================================
       06. OPTIONAL/LEGACY CHART ANIMATIONS
       ========================================= */
    // Note: Kept intact for future use if you ever revert to progress bars or charts.
    
    function animateSkillBars() {
        const skills = { ".sql": "90%", ".python": "80%", ".powerbi": "75%", ".viz": "85%" };
        for (const [selector, width] of Object.entries(skills)) {
            const el = document.querySelector(selector);
            if (el) el.style.width = width;
        }
    }

    function loadRadarChart() {
        const ctx = document.getElementById("skillsRadar");
        
        // Prevent console error if canvas doesn't exist or Chart.js isn't loaded
        if (!ctx || typeof Chart === 'undefined' || window.myRadarChart) return; 

        const isLight = document.body.classList.contains('light-mode');
        const labelColor = isLight ? "#1e293b" : "#cfd6ff";
        const gridColor = isLight ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)";

        window.myRadarChart = new Chart(ctx, {
            type: "radar",
            data: {
                labels: ["SQL", "Python", "Power BI", "Data Viz", "Analysis", "Warehousing"],
                datasets: [{
                    label: 'Skill Level',
                    data: [90, 80, 75, 85, 85, 70],
                    backgroundColor: "rgba(127, 140, 240, 0.2)",
                    borderColor: "#7f8cf0",
                    pointBackgroundColor: "#7f8cf0",
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    r: {
                        angleLines: { color: gridColor },
                        grid: { color: gridColor },
                        pointLabels: { color: labelColor, font: { size: 12, weight: '600' } },
                        ticks: { display: false },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }
            }
        });
    }
/* =========================================
       07. BACK TO TOP BUTTON
       ========================================= */
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        // Show the button when the user scrolls down 300px
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        // Smoothly scroll back to the very top when clicked
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});