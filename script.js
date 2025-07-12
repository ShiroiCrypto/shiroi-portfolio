// ===== CONFIGURAÇÕES DE SEGURANÇA =====
const SECURITY_CONFIG = {
    maxInputLength: 1000,
    allowedDomains: ['github.com', 'linkedin.com', 'instagram.com', 'discord.gg', 'gmail.com'],
    rateLimit: {
        maxRequests: 10,
        timeWindow: 60000 // 1 minuto
    }
};

// ===== FUNÇÃO PARA SANITIZAR ENTRADA =====
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    
    // Remove scripts e tags perigosas
    return input
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
        .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
        .trim()
        .substring(0, SECURITY_CONFIG.maxInputLength);
}

// ===== FUNÇÃO PARA VALIDAR URL =====
function isValidUrl(url) {
    try {
        const urlObj = new URL(url);
        return SECURITY_CONFIG.allowedDomains.some(domain => 
            urlObj.hostname.endsWith(domain)
        );
    } catch {
        return false;
    }
}

// ===== FUNÇÃO PARA PROTEGER CONTRA XSS =====
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== RATE LIMITING SIMPLES =====
const requestCount = new Map();
function checkRateLimit(identifier) {
    const now = Date.now();
    const userRequests = requestCount.get(identifier) || [];
    
    // Remove requests antigas
    const recentRequests = userRequests.filter(time => 
        now - time < SECURITY_CONFIG.rateLimit.timeWindow
    );
    
    if (recentRequests.length >= SECURITY_CONFIG.rateLimit.maxRequests) {
        return false;
    }
    
    recentRequests.push(now);
    requestCount.set(identifier, recentRequests);
    return true;
}

// ===== VARIÁVEIS GLOBAIS =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navbar = document.querySelector('.navbar');
const footerQuote = document.getElementById('footer-quote');

// ===== CITAÇÕES INSPIRADORAS =====
const quotes = [
    '"A tecnologia é melhor quando une as pessoas." - Matt Mullenweg',
    '"O código é poesia em movimento." - Linus Torvalds',
    '"A inovação distingue um líder de um seguidor." - Steve Jobs',
    '"Programar é a arte de criar algo do nada." - Anonymous',
    '"A simplicidade é a sofisticação máxima." - Leonardo da Vinci',
    '"O futuro pertence àqueles que acreditam na beleza de seus sonhos." - Eleanor Roosevelt',
    '"A tecnologia deve melhorar a vida das pessoas." - Satya Nadella',
    '"Cada linha de código é uma oportunidade de fazer a diferença." - Anonymous',
    '"A criatividade é a inteligência se divertindo." - Albert Einstein',
    '"O sucesso não é final, o fracasso não é fatal: é a coragem de continuar que conta." - Winston Churchill'
];

// ===== FUNÇÃO PARA MENU MOBILE =====
function toggleMobileMenu() {
    if (!checkRateLimit('menu-toggle')) {
        console.warn('Rate limit exceeded for menu toggle');
        return;
    }
    
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

// ===== FUNÇÃO PARA NAVEGAÇÃO SUAVE =====
function smoothScroll(e) {
    e.preventDefault();
    
    if (!checkRateLimit('smooth-scroll')) {
        console.warn('Rate limit exceeded for smooth scroll');
        return;
    }
    
    const targetId = sanitizeInput(this.getAttribute('href'));
    const targetSection = document.querySelector(targetId);
    
    if (targetSection && targetId.startsWith('#')) {
        const offsetTop = targetSection.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
    
    // Fecha o menu mobile se estiver aberto
    if (navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
}

// ===== FUNÇÃO PARA MUDAR CITAÇÃO ALEATORIAMENTE =====
function changeQuote() {
    if (!checkRateLimit('quote-change')) {
        return;
    }
    
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const newQuote = sanitizeInput(quotes[randomIndex]);
    
    if (footerQuote && newQuote) {
        footerQuote.style.opacity = '0';
        setTimeout(() => {
            footerQuote.textContent = newQuote;
            footerQuote.style.opacity = '1';
        }, 300);
    }
}

// ===== FUNÇÃO PARA NAVBAR SCROLL =====
function handleNavbarScroll() {
    if (!navbar) return;
    
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(30, 27, 46, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(138, 43, 226, 0.1)';
    } else {
        navbar.style.background = 'rgba(30, 27, 46, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

// ===== FUNÇÃO PARA ANIMAÇÃO DE ELEMENTOS NO SCROLL =====
function animateOnScroll() {
    const elements = document.querySelectorAll('.tech-card, .project-card, .social-link');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// ===== FUNÇÃO PARA ATIVAR LINK ATIVO NO MENU =====
function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id') || '';
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}` && current) {
            link.classList.add('active');
        }
    });
}

// ===== FUNÇÃO PARA COPIAR EMAIL COM SEGURANÇA =====
function copyEmail() {
    if (!checkRateLimit('copy-email')) {
        showNotification('Muitas tentativas. Tente novamente em alguns segundos.');
        return;
    }
    
    const email = 'shiroicrypto@gmail.com';
    
    // Verificar se a API Clipboard está disponível
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(() => {
            showNotification('Email copiado para a área de transferência!');
        }).catch((err) => {
            console.error('Erro ao copiar email:', err);
            fallbackCopyEmail(email);
        });
    } else {
        fallbackCopyEmail(email);
    }
}

// ===== FALLBACK PARA COPIAR EMAIL =====
function fallbackCopyEmail(email) {
    try {
        const textArea = document.createElement('textarea');
        textArea.value = email;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
            showNotification('Email copiado para a área de transferência!');
        } else {
            showNotification('Não foi possível copiar o email automaticamente.');
        }
    } catch (err) {
        console.error('Erro no fallback copy:', err);
        showNotification('Erro ao copiar email. Tente copiar manualmente: ' + email);
    }
}

// ===== FUNÇÃO PARA MOSTRAR NOTIFICAÇÕES SEGURAS =====
function showNotification(message) {
    if (!checkRateLimit('notification')) {
        return;
    }
    
    const sanitizedMessage = sanitizeInput(message);
    if (!sanitizedMessage) return;
    
    const notification = document.createElement('div');
    notification.textContent = sanitizedMessage;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 15px var(--shadow-purple);
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ===== FUNÇÃO PARA VOLTAR AO TOPO =====
function scrollToTop() {
    if (!checkRateLimit('scroll-to-top')) {
        return;
    }
    
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== FUNÇÃO PARA DETECTAR TECLA ESC =====
function handleEscapeKey(e) {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
}

// ===== FUNÇÃO PARA DETECTAR REDUÇÃO DE MOTION =====
function prefersReducedMotion() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (mediaQuery.matches) {
        document.documentElement.style.setProperty('--animation-duration', '0s');
    }
}

// ===== FUNÇÃO PARA LAZY LOADING SEGURO =====
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (!('IntersectionObserver' in window)) {
        // Fallback para navegadores antigos
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
            }
        });
        return;
    }
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.dataset.src;
                
                if (src && isValidUrl(src)) {
                    img.src = src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== FUNÇÃO PARA DETECTAR CONEXÃO LENTA =====
function detectSlowConnection() {
    if ('connection' in navigator) {
        const connection = navigator.connection;
        
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            document.documentElement.style.setProperty('--animation-duration', '0.1s');
        }
    }
}

// ===== EVENT LISTENERS SEGUROS =====
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se os elementos existem antes de adicionar listeners
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Navegação suave
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // Scroll events com throttling
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) return;
        
        scrollTimeout = setTimeout(() => {
            handleNavbarScroll();
            animateOnScroll();
            setActiveNavLink();
            scrollTimeout = null;
        }, 16); // ~60fps
    });
    
    // Tecla ESC
    document.addEventListener('keydown', handleEscapeKey);
    
    // Mudar citação a cada 10 segundos
    setInterval(changeQuote, 10000);
    
    // Inicializar animações
    animateOnScroll();
    
    // Adicionar classe active ao primeiro link do menu
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }
    
    // Esconder preloader após carregamento
    window.addEventListener('load', hidePreloader);
    
    // Adicionar botão "Voltar ao topo" dinamicamente
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Voltar ao topo');
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px var(--shadow-purple);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Mostrar/ocultar botão "Voltar ao topo"
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    backToTopBtn.addEventListener('click', scrollToTop);
    
    // Adicionar hover effect ao botão
    backToTopBtn.addEventListener('mouseenter', () => {
        backToTopBtn.style.transform = 'translateY(-3px)';
        backToTopBtn.style.boxShadow = '0 8px 25px var(--shadow-purple)';
    });
    
    backToTopBtn.addEventListener('mouseleave', () => {
        backToTopBtn.style.transform = 'translateY(0)';
        backToTopBtn.style.boxShadow = '0 4px 15px var(--shadow-purple)';
    });
    
    // Inicializar funções de segurança
    prefersReducedMotion();
    lazyLoadImages();
    detectSlowConnection();
    
    // Adicionar evento de clique para copiar email
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            copyEmail();
        });
    }
});

// ===== INICIALIZAR DETECÇÃO DE CONEXÃO =====
if ('connection' in navigator) {
    navigator.connection.addEventListener('change', detectSlowConnection);
    detectSlowConnection();
}

// ===== ADICIONAR CSS PARA ANIMAÇÕES DE NOTIFICAÇÃO =====
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// ===== FUNÇÃO PARA PRELOADER =====
function hidePreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
}

// ===== FUNÇÃO PARA TYPING EFFECT NO TÍTULO =====
function typeWriter(element, text, speed = 100) {
    if (!element || typeof text !== 'string') return;
    
    const sanitizedText = sanitizeInput(text);
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < sanitizedText.length) {
            element.innerHTML += sanitizedText.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
} 