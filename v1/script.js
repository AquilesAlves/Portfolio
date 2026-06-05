/* ================================================
   AQUILES ALVES — Portfolio Script
   ================================================ */

// ─── Cursor personalizado ───
const cursor       = document.getElementById('cursor');
const cursorFollow = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followX = 0, followY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
});

(function animateCursor() {
    followX += (mouseX - followX) * 0.12;
    followY += (mouseY - followY) * 0.12;
    cursorFollow.style.left = followX + 'px';
    cursorFollow.style.top  = followY + 'px';
    requestAnimationFrame(animateCursor);
})();

// Expandir cursor em links/botões
document.querySelectorAll('a, button, .projeto-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorFollow.style.width  = '60px';
        cursorFollow.style.height = '60px';
        cursorFollow.style.opacity = '0.2';
    });
    el.addEventListener('mouseleave', () => {
        cursorFollow.style.width  = '36px';
        cursorFollow.style.height = '36px';
        cursorFollow.style.opacity = '0.5';
    });
});

// ─── Menu mobile ───
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = menuToggle.querySelectorAll('span');
    if (mobileMenu.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
});

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        const spans = menuToggle.querySelectorAll('span');
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
});

// ─── Header scroll ───
const header = document.querySelector('.cabecalho');
window.addEventListener('scroll', () => {
    header.style.background = window.scrollY > 40
        ? 'rgba(8,12,16,0.97)'
        : 'rgba(8,12,16,0.85)';
});

// ─── Reveal on scroll (Intersection Observer) ───
const revealEls = document.querySelectorAll(
    '.projeto-card, .stat-card, .sobre-texto, .contato-inner'
);

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ─── Active nav link ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.aqui');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + current
            ? 'var(--accent)'
            : '';
    });
});
