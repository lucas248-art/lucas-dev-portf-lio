/* =========================================================
   LUCAS.DEV — JAVASCRIPT
========================================================= */


/* =========================================================
   NAVBAR DINÂMICA
========================================================= */

const nav = document.querySelector(".nav");

function updateNavbar() {
  if (!nav) return;

  if (window.scrollY > 20) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateNavbar, {
  passive: true
});

updateNavbar();


/* =========================================================
   MENU MOBILE
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

function closeMenu() {
  if (!navLinks || !menuToggle) return;

  navLinks.classList.remove("open");

  menuToggle.setAttribute(
    "aria-expanded",
    "false"
  );

  menuToggle.setAttribute(
    "aria-label",
    "Abrir menu"
  );

  menuToggle.textContent = "☰";

  document.body.classList.remove("menu-open");
}

function openMenu() {
  if (!navLinks || !menuToggle) return;

  navLinks.classList.add("open");

  menuToggle.setAttribute(
    "aria-expanded",
    "true"
  );

  menuToggle.setAttribute(
    "aria-label",
    "Fechar menu"
  );

  menuToggle.textContent = "✕";

  document.body.classList.add("menu-open");
}

if (menuToggle && navLinks) {

  menuToggle.addEventListener("click", () => {

    const isOpen =
      navLinks.classList.contains("open");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }

  });


  navLinks.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {
      closeMenu();
    });

  });


  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
      closeMenu();
    }

  });


  window.addEventListener("resize", () => {

    if (window.innerWidth > 900) {
      closeMenu();
    }

  });

}


/* =========================================================
   SCROLL SUAVE
========================================================= */

document
  .querySelectorAll('a[href^="#"]')
  .forEach(link => {

    link.addEventListener("click", event => {

      const href =
        link.getAttribute("href");

      if (!href || href === "#") {
        return;
      }

      const target =
        document.querySelector(href);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


/* =========================================================
   PARALLAX DO DESERTO
========================================================= */

const hero =
  document.querySelector(".hero");

const isTouchDevice =
  window.matchMedia("(hover: none)").matches;

const prefersReducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

if (
  hero &&
  !isTouchDevice &&
  !prefersReducedMotion
) {

 let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;

hero.addEventListener("mousemove", event => {
  const rect = hero.getBoundingClientRect();

  targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
  targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
});

function smoothParallax() {
  currentX += (targetX - currentX) * 0.08;
  currentY += (targetY - currentY) * 0.08;

  hero.style.setProperty("--mouse-x", (currentX * 33) + "px");
  hero.style.setProperty("--mouse-y", (currentY * 33) + "px");

  requestAnimationFrame(smoothParallax);
}

smoothParallax();
  hero.addEventListener("mouseleave", () => {

    hero.style.setProperty(
      "--mouse-x",
      "0px"
    );

    hero.style.setProperty(
      "--mouse-y",
      "0px"
    );

  });

}


/* =========================================================
   REVELAÇÃO AO ROLAR
========================================================= */

const revealElements =
  document.querySelectorAll(".reveal");

if (
  revealElements.length &&
  "IntersectionObserver" in window
) {

  const revealObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(
            "apareceu"
          );

          revealObserver.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: 0.12
      }
    );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

} else {

  revealElements.forEach(element => {
    element.classList.add("apareceu");
  });

}


/* =========================================================
   CARDS 3D DOS PROJETOS
========================================================= */

const cards =
  document.querySelectorAll(
    ".project-card"
  );

cards.forEach(card => {

  card.addEventListener(
    "mousemove",
    event => {

      if (
        window.innerWidth <= 800 ||
        prefersReducedMotion
      ) {
        return;
      }

      const rect =
        card.getBoundingClientRect();

      const x =
        (
          (event.clientX - rect.left)
          / rect.width
          - 0.5
        ) * 5;

      const y =
        (
          (event.clientY - rect.top)
          / rect.height
          - 0.5
        ) * -5;

      card.style.transform =
        `perspective(800px)
         rotateY(${x}deg)
         rotateX(${y}deg)
         translateY(-5px)`;

    }
  );


  card.addEventListener(
    "mouseleave",
    () => {

      card.style.transform = "";

    }
  );

});


/* =========================================================
   ACTIVE LINK DA NAVBAR
========================================================= */

const sections =
  document.querySelectorAll(
    "main section[id]"
  );

const menuLinks =
  document.querySelectorAll(
    ".nav-links a"
  );

if (
  sections.length &&
  menuLinks.length &&
  "IntersectionObserver" in window
) {

  const sectionObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) {
            return;
          }

          const id =
            entry.target.getAttribute("id");

          menuLinks.forEach(link => {

            link.classList.remove(
              "active"
            );

            if (
              link.getAttribute("href")
              === `#${id}`
            ) {

              link.classList.add(
                "active"
              );

            }

          });

        });

      },
      {
        rootMargin:
          "-35% 0px -55% 0px",

        threshold: 0
      }
    );

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

}


/* =========================================================
   HABILIDADES — DADOS
========================================================= */

const skillData = {

  html: {
    number: "01",
    title: "HTML5",
    description:
      "Estruturação de páginas web com HTML semântico, organizado e pensado para acessibilidade.",
    icon:
      '<i class="devicon-html5-plain colored"></i>',
    meta: [
      "HTML5",
      "Semântica",
      "Acessibilidade"
    ]
  },

  css: {
    number: "02",
    title: "CSS3",
    description:
      "Criação de interfaces responsivas, modernas e visualmente consistentes usando CSS.",
    icon:
      '<i class="devicon-css3-plain colored"></i>',
    meta: [
      "CSS3",
      "Responsividade",
      "Animações"
    ]
  },

  javascript: {
    number: "03",
    title: "JavaScript",
    description:
      "Programação para tornar páginas interativas, trabalhando com DOM, eventos e lógica.",
    icon:
      '<i class="devicon-javascript-plain colored"></i>',
    meta: [
      "JavaScript",
      "DOM",
      "Eventos"
    ]
  },

  git: {
    number: "04",
    title: "Git",
    description:
      "Controle de versões para acompanhar mudanças e organizar o desenvolvimento dos projetos.",
    icon:
      '<i class="devicon-git-plain colored"></i>',
    meta: [
      "Git",
      "Versionamento",
      "Commits"
    ]
  },

  github: {
    number: "05",
    title: "GitHub",
    description:
      "Uso do GitHub para armazenar projetos, acompanhar código e publicar aplicações.",
    icon:
      '<i class="devicon-github-original"></i>',
    meta: [
      "GitHub",
      "Repositórios",
      "Deploy"
    ]
  },

  python: {
    number: "06",
    title: "Python",
    description:
      "Linguagem que estou estudando para evoluir na programação e futuramente trabalhar com projetos mais completos.",
    icon:
      '<i class="devicon-python-plain colored"></i>',
    meta: [
      "Python",
      "Lógica",
      "Em aprendizado"
    ]
  }

};


/* =========================================================
   MODAL DAS HABILIDADES
========================================================= */

const skillModal =
  document.querySelector(
    "#skillModal"
  );

const skillModalIcon =
  document.querySelector(
    "#skillModalIcon"
  );

const skillModalNumber =
  document.querySelector(
    "#skillModalNumber"
  );

const skillModalTitle =
  document.querySelector(
    "#skillModalTitle"
  );

const skillModalDescription =
  document.querySelector(
    "#skillModalDescription"
  );

const skillModalMeta =
  document.querySelector(
    "#skillModalMeta"
  );

const skillModalCloseButtons =
  document.querySelectorAll(
    "[data-close-skill]"
  );

let lastFocusedSkill = null;


function openSkillModal(skillName) {

  if (!skillModal) return;

  const skill =
    skillData[skillName];

  if (!skill) return;

  lastFocusedSkill =
    document.activeElement;

  if (skillModalIcon) {
    skillModalIcon.innerHTML =
      skill.icon;
  }

  if (skillModalNumber) {
    skillModalNumber.textContent =
      `${skill.number} — HABILIDADE`;
  }

  if (skillModalTitle) {
    skillModalTitle.textContent =
      skill.title;
  }

  if (skillModalDescription) {
    skillModalDescription.textContent =
      skill.description;
  }

  if (skillModalMeta) {

    skillModalMeta.innerHTML =
      skill.meta
        .map(item => `<span>${item}</span>`)
        .join("");

  }

  skillModal.classList.add("open");

  skillModal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "modal-open"
  );

  const closeButton =
    skillModal.querySelector(
      ".skill-modal-close"
    );

  if (closeButton) {
    setTimeout(() => {
      closeButton.focus();
    }, 50);
  }

}


function closeSkillModal() {

  if (!skillModal) return;

  skillModal.classList.remove("open");

  skillModal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "modal-open"
  );

  if (
    lastFocusedSkill &&
    typeof lastFocusedSkill.focus === "function"
  ) {

    lastFocusedSkill.focus();

  }

  lastFocusedSkill = null;

}


/* =========================================================
   CLIQUE NAS HABILIDADES
========================================================= */

const skillCards =
  document.querySelectorAll(
    ".skill[data-skill]"
  );

skillCards.forEach(card => {

  const skillName =
    card.dataset.skill;

  card.setAttribute(
    "tabindex",
    "0"
  );

  card.setAttribute(
    "role",
    "button"
  );


  card.addEventListener(
    "click",
    () => {
      openSkillModal(skillName);
    }
  );


  card.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {

        event.preventDefault();

        openSkillModal(skillName);

      }

    }
  );

});


/* =========================================================
   FECHAR MODAL
========================================================= */

skillModalCloseButtons.forEach(
  button => {

    button.addEventListener(
      "click",
      closeSkillModal
    );

  }
);


document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape" &&
      skillModal &&
      skillModal.classList.contains("open")
    ) {

      closeSkillModal();

    }

  }
);


/* =========================================================
   EASTER EGG — KONAMI
========================================================= */

const secretCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight"
];

let secretIndex = 0;

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key ===
      secretCode[secretIndex]
    ) {

      secretIndex++;

      if (
        secretIndex ===
        secretCode.length
      ) {

        document.body.classList.toggle(
          "secret-mode"
        );

        secretIndex = 0;

        console.log(
          "🌵 Modo secreto ativado."
        );

      }

    } else {

      secretIndex = 0;

    }

  }
);


/* =========================================================
   PERFORMANCE — TOUCH
========================================================= */

if (
  isTouchDevice &&
  hero
) {

  hero.style.setProperty(
    "--mouse-x",
    "0px"
  );

  hero.style.setProperty(
    "--mouse-y",
    "0px"
  );

}


/* =========================================================
   ACESSIBILIDADE — REDUZIR MOVIMENTO
========================================================= */

if (prefersReducedMotion) {

  document.documentElement.classList.add(
    "reduce-motion"
  );

}


/* =========================================================
   CONSOLE
========================================================= */

console.log(
  "%c🌵 LUCAS.DEV",
  "font-size:22px;font-weight:bold;"
);

console.log(
  "%cSistema iniciado. Bora codar.",
  "font-size:13px;"
);

console.log(
  "🚀 Lucas.Dev carregado com sucesso."
);
