// Interatividade Simples para a Amarelinha das Letras

document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scroll Interno (já tratado pelo CSS, mas garantindo)
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 2. Animação de Entrada ao Rolar (Scroll Reveal Light)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.benefit-item, .step-card, .target-card, .card-solution');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(el);
    });

    // Classe para ativar no CSS
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.append(style);

    // 3. Controle do Carrossel de Feedbacks
    const track = document.getElementById('feedback-track');
    if (track) {
        track.addEventListener('click', () => {
            track.classList.toggle('paused');
        });
        track.addEventListener('touchstart', () => {
            track.classList.toggle('paused');
        });
    }
});
