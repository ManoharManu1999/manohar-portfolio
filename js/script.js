document.addEventListener("DOMContentLoaded", () => {

const navLinks = document.querySelectorAll('.nav-links a');

/* ===============================
   Smooth Scroll Navigation
================================ */

navLinks.forEach(link => {
link.addEventListener('click', e => {

const targetId = link.getAttribute('href');

if(targetId.startsWith("#")){
e.preventDefault();
document.querySelector(targetId).scrollIntoView({
behavior:'smooth'
});
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

/* ===============================
       Radar Chart Initialization
    ================================ */

function loadRadarChart() {
    const ctx = document.getElementById("skillsRadar");
    if (!ctx) return;

    // Check current theme to set colors
    const isLight = document.body.classList.contains('light-mode');
    const gridColor = isLight ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)";
    const labelColor = isLight ? "#1e293b" : "#cfd6ff";

    new Chart(ctx, {
        type: "radar",
        data: {
            labels: ["SQL", "Python", "Power BI", "Data Visualization", "Data Analysis", "Data Warehousing"],
            datasets: [{
                label: "Skill Level",
                data: [90, 80, 75, 85, 85, 70],
                fill: true,
                backgroundColor: "rgba(127, 140, 240, 0.2)",
                borderColor: "#7f8cf0",
                borderWidth: 2,
                pointBackgroundColor: "#7f8cf0",
                pointBorderColor: "#fff",
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Allows the container to control height
            animation: { duration: 1500, easing: "easeOutQuart" },
            plugins: { 
                legend: { display: false },
                tooltip: {
                    backgroundColor: isLight ? "#fff" : "#0f172a",
                    titleColor: isLight ? "#1e293b" : "#fff",
                    bodyColor: isLight ? "#475569" : "#cfd6ff",
                    borderColor: "#7f8cf0",
                    borderWidth: 1
                }
            },
            scales: {
                r: {
                    suggestedMin: 0,
                    suggestedMax: 100,
                    grid: { color: gridColor },
                    angleLines: { color: gridColor },
                    pointLabels: { 
                        color: labelColor, 
                        font: { size: 13, weight: '600' } 
                    },
                    ticks: { display: false }
                }
            }
        }
    });
}

/* ===============================
   Number Counter Animation
================================ */
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
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

// Trigger counters when the page loads
window.addEventListener('load', animateCounters);