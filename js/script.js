document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       1. THEME TOGGLE & PERSISTENCE
    ================================ */
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const applyTheme = (isLight) => {
        if (isLight) {
            body.classList.add('light-mode');
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-mode');
            themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
            localStorage.setItem('theme', 'dark');
        }
    };

    // Load saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') applyTheme(true);
    else if (savedTheme === 'dark') applyTheme(false);
    else applyTheme(window.matchMedia('(prefers-color-scheme: light)').matches);

    themeToggle.addEventListener('click', () => applyTheme(!body.classList.contains('light-mode')));

    /* ===============================
       2. INTERSECTION OBSERVER (Animations)
    ================================ */
    const observerOptions = { threshold: 0.15 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Specific animations for certain sections
                if (entry.target.id === 'skills') animateSkillBars();
                if (entry.target.id === 'experience') animateCounters();
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    /* ===============================
       3. SKILL BARS & COUNTERS
    ================================ */
    function animateSkillBars() {
        const skills = { ".sql": "90%", ".python": "80%", ".powerbi": "75%", ".viz": "85%" };
        for (const [selector, width] of Object.entries(skills)) {
            const el = document.querySelector(selector);
            if (el) el.style.width = width;
        }
    }

    function animateCounters() {
        document.querySelectorAll('.counter').forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const speed = 200;
            const updateCount = () => {
                const count = +counter.innerText;
                const inc = target / speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target.toLocaleString() + (target > 1000 ? "+" : (target < 100 ? "%" : ""));
                }
            };
            updateCount();
        });
    }

    /* ===============================
       4. NAVIGATION & BACK TO TOP
    ================================ */
    const backToTop = document.getElementById('back-to-top');
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        // Header shadow on scroll
        header.classList.toggle('scrolled', window.scrollY > 50);
        // Show/Hide back to top button
        if (backToTop) backToTop.classList.toggle('show', window.scrollY > 500);
    });

    if (backToTop) {
        backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', e => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});