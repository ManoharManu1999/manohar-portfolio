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

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');

function applyTheme(isLight) {
    if (isLight) {
        document.body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('light-mode');
        themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        localStorage.setItem('theme', 'dark');
    }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    applyTheme(true);
} else if (savedTheme === 'dark') {
    applyTheme(false);
} else {
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    applyTheme(prefersLight);
}

themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.contains('light-mode');
    applyTheme(!isLight);
});

const reveals = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
  reveals.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      section.classList.add('active');
    }
  });
});

window.addEventListener("load", () => {
document.querySelector(".sql").style.width="90%";
document.querySelector(".python").style.width="80%";
document.querySelector(".powerbi").style.width="75%";
document.querySelector(".viz").style.width="85%";
});