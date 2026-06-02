/* ================================================
   PORTFOLIO — script.js
   Só duas funções simples:
   1. Cabeçalho muda de cor ao rolar a página
   2. Links do menu ficam ativos conforme a seção
   ================================================ */


/* ------------------------------------------------
   EFEITO NO CABEÇALHO AO ROLAR
   Quando o usuário rolar para baixo, o cabeçalho
   fica com um fundo mais escuro / menos transparente.
------------------------------------------------ */
const cabecalho = document.querySelector('.cabecalho');

window.addEventListener('scroll', function() {

    /* Se rolou mais de 50px, adiciona a classe "rolado" */
    if (window.scrollY > 50) {
        cabecalho.style.background = 'rgba(13, 17, 23, 0.98)';
    } else {
        cabecalho.style.background = 'rgba(13, 17, 23, 0.9)';
    }

});


/* ------------------------------------------------
   LINK ATIVO NO MENU
   Conforme o usuário rola, o link da seção atual
   fica na cor azul no menu.
------------------------------------------------ */
const linksMenu = document.querySelectorAll('.menu a');
const secoes    = document.querySelectorAll('section[id]');

window.addEventListener('scroll', function() {

    let secaoAtual = '';

    /* Verifica qual seção está visível na tela */
    secoes.forEach(function(secao) {
        if (window.scrollY >= secao.offsetTop - 100) {
            secaoAtual = secao.id;
        }
    });

    /* Coloca a cor azul no link correspondente à seção atual */
    linksMenu.forEach(function(link) {
        link.style.color = '';   /* reseta a cor */

        if (link.getAttribute('href') === '#' + secaoAtual) {
            link.style.color = '#4fc3f7';   /* azul */
        }
    });

});
