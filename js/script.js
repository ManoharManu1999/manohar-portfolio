// Smooth scroll for internal links
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});

// Header background change on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Dark mode toggle
const toggle = document.getElementById('dark-mode-toggle');
const root = document.documentElement;

function setDarkMode(on) {
    if (on) {
        document.body.classList.add('dark');
        localStorage.setItem('darkMode', 'enabled');
        toggle.textContent = '☀️';
    } else {
        document.body.classList.remove('dark');
        localStorage.setItem('darkMode', 'disabled');
        toggle.textContent = '🌙';
    }
}

// initialize from preference or system
const saved = localStorage.getItem('darkMode');
if (saved === 'enabled') {
    setDarkMode(true);
} else if (saved === 'disabled') {
    setDarkMode(false);
} else {
    // follow system
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
}

toggle.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark');
    setDarkMode(!isDark);
});
