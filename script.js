// --- INICIALIZAÇÃO DO CARROSSEL (ADICIONADO) ---
// Certifique-se de que o script do Swiper via CDN esteja no seu HTML antes do script.js
document.addEventListener('DOMContentLoaded', function() {
    if (typeof Swiper !== 'undefined') {
        const swiper = new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            grabCursor: true,
            
            // PARÂMETROS CRÍTICOS:
            observer: true, 
            observeParents: true,
            watchOverflow: true,

            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                768: { 
                    slidesPerView: 2,
                    spaceBetween: 20 
                },
                1024: { 
                    slidesPerView: 3,
                    spaceBetween: 30 
                },
            },
        });
    }
});

// --- SEU CÓDIGO ORIGINAL COM REFINAMENTOS ---

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll reveal animation
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}
window.addEventListener('scroll', reveal);
reveal();

// Typing effect (Mantido conforme seu original)
const typingText = document.querySelector('.typing-text');
const words = ['Felicio Cavalcante', 'Desenvolvedor Full Stack', 'Criador de Experiências', 'Solucionador de Problemas'];
let wordIndex = 0;
let timer;

function typingEffect() {
    let word = words[wordIndex].split("");
    var loopTyping = function() {
        if (word.length > 0) {
            typingText.innerHTML += word.shift();
        } else {
            setTimeout(deletingEffect, 2000); // Pausa antes de deletar
            return false;
        };
        timer = setTimeout(loopTyping, 100);
    };
    loopTyping();
};

function deletingEffect() {
    let word = typingText.innerHTML.split("");
    var loopDeleting = function() {
        if (word.length > 0) {
            word.pop();
            typingText.innerHTML = word.join("");
        } else {
            wordIndex = (wordIndex + 1) % words.length;
            typingEffect();
            return false;
        };
        timer = setTimeout(loopDeleting, 50);
    };
    loopDeleting();
};
typingEffect();

// Form submission (Melhorado com seu efeito de feedback)
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const button = this.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> Enviado!';
        button.style.background = '#28a745';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            button.style.background = '';
            this.reset();
        }, 2000);
    }, 1500);
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active'); // Recomendo usar classe CSS em vez de style.display
});

// Skills animation observer
const aboutSection = document.querySelector('#about');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.skill-tag').forEach((skill, index) => {
                setTimeout(() => {
                    skill.style.opacity = '1';
                    skill.style.transform = 'translateY(0)';
                }, index * 100);
            });
            skillObserver.unobserve(aboutSection);
        }
    });
}, { threshold: 0.5 });
skillObserver.observe(aboutSection);

// Console message
console.log("%c🚀 Portfólio do Felicio carregado!", "color: #00d4ff; font-size: 20px; font-weight: bold;");