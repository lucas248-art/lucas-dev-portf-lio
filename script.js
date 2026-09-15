// ========================================
// LUCAS.DEV — INTERAÇÕES
// ========================================

// ----------------------------------------
// NAVBAR
// ----------------------------------------
const nav = document.querySelector('.nav');

function updateNavbar() {
    nav?.classList.toggle('scrolled', scrollY > 20);
}

addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar();


// ----------------------------------------
// MENU MOBILE
// ----------------------------------------
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

function closeMenu() {
    if (!navLinks || !menuToggle) return;

    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
    menuToggle.textContent = '☰';
    document.body.classList.remove('menu-open');
}

function openMenu() {
    if (!navLinks || !menuToggle) return;

    navLinks.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Fechar menu');
    menuToggle.textContent = '✕';
    document.body.classList.add('menu-open');
}

menuToggle?.addEventListener('click', () => {
    if (navLinks?.classList.contains('open')) {
        closeMenu();
    } else {
        openMenu();
    }
});

navLinks?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
});

addEventListener('resize', () => {
    if (innerWidth > 900) closeMenu();
});


// ----------------------------------------
// SCROLL SUAVE
// ----------------------------------------
document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
        const target = document.querySelector(link.getAttribute('href'));

        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});


// ----------------------------------------
// PARALLAX DO HERO
// ----------------------------------------
const hero = document.querySelector('.hero');

hero?.addEventListener('mousemove', (event) => {
    if (matchMedia('(hover:none)').matches) return;

    const rect = hero.getBoundingClientRect();
    const mouseX = ((event.clientX - rect.left) / rect.width - 0.5) * 18;
    const mouseY = ((event.clientY - rect.top) / rect.height - 0.5) * 18;

    hero.style.setProperty('--mouse-x', `${mouseX}px`);
    hero.style.setProperty('--mouse-y', `${mouseY}px`);
});

hero?.addEventListener('mouseleave', () => {
    hero.style.setProperty('--mouse-x', '0px');
    hero.style.setProperty('--mouse-y', '0px');
});


// ----------------------------------------
// ANIMAÇÕES DE ENTRADA
// ----------------------------------------
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add('apareceu');
            revealObserver.unobserve(entry.target);
        });
    },
    { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => {
    revealObserver.observe(element);
});


// ----------------------------------------
// EFEITO 3D NOS PROJETOS
// ----------------------------------------
document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('mousemove', (event) => {
        if (innerWidth <= 800) return;

        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 5;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * -5;

        card.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});


// ----------------------------------------
// LINK ATIVO DA NAVBAR
// ----------------------------------------
const sections = document.querySelectorAll('main section[id]');
const links = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            links.forEach((link) => {
                link.classList.toggle(
                    'active',
                    link.getAttribute('href') === `#${entry.target.id}`
                );
            });
        });
    },
    { rootMargin: '-35% 0px -55% 0px' }
);

sections.forEach((section) => {
    sectionObserver.observe(section);
});


// ----------------------------------------
// DADOS DAS HABILIDADES
// ----------------------------------------
const skillData = {
    HTML5: [
        '01',
        'devicon-html5-plain colored',
        'Estrutura e semântica para páginas web.',
        ['Estrutura web', 'Semântica', 'Em estudo']
    ],
    CSS3: [
        '02',
        'devicon-css3-plain colored',
        'Layouts, responsividade, animações e interfaces.',
        ['Layout', 'Responsividade', 'Em estudo']
    ],
    JavaScript: [
        '03',
        'devicon-javascript-plain colored',
        'Interações, lógica, DOM e comportamento dinâmico nas páginas.',
        ['DOM', 'Interações', 'Em estudo']
    ],
    Git: [
        '04',
        'devicon-git-plain colored',
        'Controle de versão para registrar mudanças e organizar a evolução dos projetos.',
        ['Versionamento', 'Commits', 'Em estudo']
    ],
    GitHub: [
        '05',
        'devicon-github-original',
        'Repositórios, publicação e acompanhamento dos projetos.',
        ['Repositórios', 'Deploy', 'Em estudo']
    ],
    Python: [
        '06',
        'devicon-python-plain colored',
        'Base de programação, lógica e automação em Python.',
        ['Lógica', 'Automação', 'Em estudo']
    ]
};


// ----------------------------------------
// MODAL DAS HABILIDADES
// ----------------------------------------
const modal = document.querySelector('#skillModal');
const modalIcon = document.querySelector('#skillModalIcon');
const modalNumber = document.querySelector('#skillModalNumber');
const modalTitle = document.querySelector('#skillModalTitle');
const modalDescription = document.querySelector('#skillModalDescription');
const modalMeta = document.querySelector('#skillModalMeta');

let lastFocus = null;

function openSkill(name) {
    const data = skillData[name];

    if (!data || !modal) return;

    lastFocus = document.activeElement;

    modalIcon.innerHTML = `<i class="${data[1]}" aria-hidden="true"></i>`;
    modalNumber.textContent = `${data[0]} — HABILIDADE`;
    modalTitle.textContent = name;
    modalDescription.textContent = data[2];
    modalMeta.innerHTML = data[3]
        .map((item) => `<span>${item}</span>`)
        .join('');

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    modal.querySelector('.skill-modal-close')?.focus();
}

function closeSkill() {
    if (!modal) return;

    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');

    lastFocus?.focus();
}


document.querySelectorAll('.skill').forEach((card) => {
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute(
        'aria-label',
        `Ver detalhes de ${card.dataset.skill}`
    );

    card.addEventListener('click', () => {
        openSkill(card.dataset.skill);
    });

    card.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;

        event.preventDefault();
        openSkill(card.dataset.skill);
    });
});

document.querySelectorAll('[data-close-skill]').forEach((element) => {
    element.addEventListener('click', closeSkill);
});


// ----------------------------------------
// ESC — FECHAR MENU / MODAL
// ----------------------------------------
addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;

    closeMenu();

    if (modal?.classList.contains('open')) {
        closeSkill();
    }
});


// ----------------------------------------
// EASTER EGG — KONAMI CODE
// ----------------------------------------
const code = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight'
];

let codeIndex = 0;

addEventListener('keydown', (event) => {
    if (event.key === code[codeIndex]) {
        codeIndex++;

        if (codeIndex === code.length) {
            document.body.classList.toggle('secret-mode');
            codeIndex = 0;
            console.log('🌵 Modo secreto ativado.');
        }
    } else {
        codeIndex = 0;
    }
});


// ----------------------------------------
// CONSOLE
// ----------------------------------------
console.log('%c🌵 LUCAS.DEV', 'font-size:22px;font-weight:bold;');
console.log('%cSistema iniciado. Bora codar.', 'font-size:13px;');
