/* ================================
   script.js
   Só duas responsabilidades:
   1. Cursor personalizado
   2. Revelar elementos ao rolar a página
   ================================ */


/* ================================
   CURSOR PERSONALIZADO
   "cursor" é o ponto pequeno que fica exato no mouse
   "cursor-follower" é o círculo maior que segue com atraso
   ================================ */
const cursor         = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');

/* Posição atual do mouse */
let mouseX = 0, mouseY = 0;

/* Posição atual do follower (começa no mesmo lugar) */
let followerX = 0, followerY = 0;

/* Atualiza a posição do ponto pequeno imediatamente */
document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
});

/* O follower se move suavemente em direção ao mouse */
function animarFollower() {
    /* Move 12% da distância que falta a cada frame — cria o atraso suave */
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;

    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top  = followerY + 'px';

    requestAnimationFrame(animarFollower); /* repete a cada frame */
}
animarFollower();

/* O follower fica maior ao passar em cima de links e cards */
document.querySelectorAll('a, .card, .stat-card').forEach(function(el) {
    el.addEventListener('mouseenter', function() {
        cursorFollower.style.width   = '60px';
        cursorFollower.style.height  = '60px';
        cursorFollower.style.opacity = '0.15';
    });
    el.addEventListener('mouseleave', function() {
        cursorFollower.style.width   = '36px';
        cursorFollower.style.height  = '36px';
        cursorFollower.style.opacity = '0.5';
    });
});


/* ================================
   REVELAR ELEMENTOS AO ROLAR
   Os cards e textos aparecem com animação
   quando o usuário rola até eles
   ================================ */
const elementosParaRevelar = document.querySelectorAll(
    '.card, .stat-card, .sobre-texto'
);

/* Deixa todos invisíveis e deslocados para baixo no início */
elementosParaRevelar.forEach(function(el) {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

/* Intersection Observer — dispara quando o elemento entra na tela */
const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            /* Elemento entrou na tela — revela */
            entry.target.style.opacity   = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target); /* não precisa mais observar */
        }
    });
}, { threshold: 0.12 }); /* dispara quando 12% do elemento estiver visível */

elementosParaRevelar.forEach(function(el) {
    observer.observe(el);
});
