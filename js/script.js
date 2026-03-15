document.addEventListener("DOMContentLoaded", () => {

/* ===============================
   Smooth Scroll Navigation
================================ */

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {

    const href = link.getAttribute("href");

    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      target.scrollIntoView({ behavior: "smooth" });
    }

  });
});

/* ===============================
   Header Scroll Effect
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
   Theme Toggle
================================ */

const themeToggle = document.getElementById('theme-toggle');

function applyTheme(isLight){

    if(isLight){
        document.body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        localStorage.setItem('theme','light');
    }
    else{
        document.body.classList.remove('light-mode');
        themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        localStorage.setItem('theme','dark');
    }

    // Update skill bars after theme change
    setTimeout(() => {
        const sql = document.querySelector(".sql");
        const python = document.querySelector(".python");
        const powerbi = document.querySelector(".powerbi");
        const viz = document.querySelector(".viz");

        if(sql) sql.style.width = "90%";
        if(python) python.style.width = "80%";
        if(powerbi) powerbi.style.width = "75%";
        if(viz) viz.style.width = "85%";
    }, 100); // Small delay to ensure CSS transition

}

const savedTheme = localStorage.getItem('theme');

if(savedTheme === 'light'){
    applyTheme(true);
}
else if(savedTheme === 'dark'){
    applyTheme(false);
}
else{
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    applyTheme(prefersLight);
}

themeToggle.addEventListener('click', () => {

    const isLight = document.body.classList.contains('light-mode');
    applyTheme(!isLight);

});

/* ===============================
   Scroll Reveal Animation
================================ */

const reveals = document.querySelectorAll('.reveal');

function revealSections(){

    reveals.forEach(section => {

        const top = section.getBoundingClientRect().top;

        if(top < window.innerHeight - 100){
            section.classList.add('active');
        }

    });

}

window.addEventListener('scroll', revealSections);

/* ===============================
   Skill Bar Animation
================================ */

window.addEventListener("load", () => {

const sql = document.querySelector(".sql");
const python = document.querySelector(".python");
const powerbi = document.querySelector(".powerbi");
const viz = document.querySelector(".viz");

if(sql) sql.style.width = "90%";
if(python) python.style.width = "80%";
if(powerbi) powerbi.style.width = "75%";
if(viz) viz.style.width = "85%";

});

});