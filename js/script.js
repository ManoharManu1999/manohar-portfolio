document.addEventListener("DOMContentLoaded", () => {
    /* ===============================
       1. Smooth Scroll Navigation
    ================================ */
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith("#")) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    /* ===============================
       2. Header Scroll Effect
    ================================ */
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ===============================
       4. Intersection Observer (Scroll Animations)
    ================================ */
    const observerOptions = { threshold: 0.15 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Trigger specific animations based on ID
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                    loadRadarChart();
                }
                if (entry.target.id === 'experience' || entry.target.id === 'hero') {
                    animateCounters();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal, .hero-new').forEach(el => observer.observe(el));

    /* ===============================
       5. Skill Bar Animation
    ================================ */
    function animateSkillBars() {
        const skills = { ".sql": "90%", ".python": "80%", ".powerbi": "75%", ".viz": "85%" };
        for (const [selector, width] of Object.entries(skills)) {
            const el = document.querySelector(selector);
            if (el) el.style.width = width;
        }
    }

    /* ===============================
       6. Number Counter Animation
    ================================ */
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        const speed = 200;

        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const updateCount = () => {
                const count = +counter.innerText;
                const inc = target / speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    /* ===============================
       7. Radar Chart Initialization
    ================================ */
    function loadRadarChart() {
        const ctx = document.getElementById("skillsRadar");
        if (!ctx || window.myRadarChart) return; // Prevent double initialization

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
});