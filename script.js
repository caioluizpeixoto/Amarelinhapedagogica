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

    // 3. Fake Social Proof (Opcional - Notificações de Venda)
    const showNotification = () => {
        const names = ['Ana', 'Pedro', 'Carla', 'José', 'Maria', 'Soraia'];
        const locations = ['São Paulo', 'Rio', 'Curitiba', 'Lisboa', 'Belo Horizonte'];
        
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomLoc = locations[Math.floor(Math.random() * locations.length)];

        const toast = document.createElement('div');
        toast.className = 'sale-toast';
        toast.innerHTML = `<div class="toast-content">🎉 <strong>${randomName}</strong> de ${randomLoc} acabou de adquirir a Amarelinha!</div>`;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    };

    // Estilo para o Toast
    const toastStyle = document.createElement('style');
    toastStyle.textContent = `
        .sale-toast {
            position: fixed; bottom: 20px; left: 20px; right: 20px;
            background: white; padding: 15px; border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1); border-left: 5px solid #FF4D4D;
            z-index: 10000; transform: translateY(150%); transition: transform 0.5s ease;
            font-size: 0.85rem; pointer-events: none;
        }
        .sale-toast.show { transform: translateY(0); }
        .toast-content strong { color: #FF4D4D; }
    `;
    document.head.append(toastStyle);

    // Inicia notificações a cada 15-30 segundos
    setTimeout(showNotification, 5000);
    setInterval(showNotification, 20000);
    // 4. Controle do Carrossel de Feedbacks
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
