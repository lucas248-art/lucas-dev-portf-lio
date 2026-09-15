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

if (hero) {

  hero.addEventListener("mousemove", event => {

    const rect =
      hero.getBoundingClientRect();

    const x =
      (event.clientX - rect.left)
      / rect.width
      - 0.5;

    const y =
      (event.clientY - rect.top)
      / rect.height
      - 0.5;

    hero.style.setProperty(
      "--mouse-x",
      `${x * 18}px`
    );

    hero.style.setProperty(
      "--mouse-y",
      `${y * 18}px`
    );

  });


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
  document.querySelectorAll(
    ".reveal"
  );

const revealObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "apareceu"
          );

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold: 0.12
    }
  );

revealElements.forEach(
  element => {

    revealObserver.observe(
      element
    );

  }
);


/* =========================================================
   CARDS 3D
========================================================= */

const cards =
  document.querySelectorAll(
    ".project-card"
  );

cards.forEach(card => {

  card.addEventListener(
    "mousemove",
    event => {

      if (window.innerWidth <= 800) {
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
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0
    }
  );

sections.forEach(section => {

  sectionObserver.observe(section);

});


/* =========================================================
   EFEITO DE DIGITAÇÃO NO CONSOLE
========================================================= */

console.log(
  "%c🌵 LUCAS.DEV",
  "font-size:22px;font-weight:bold;"
);

console.log(
  "%cSistema iniciado. Bora codar.",
  "font-size:13px;"
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
   PERFORMANCE — DESATIVA PARALLAX EM TOUCH
========================================================= */

const isTouchDevice =
  window.matchMedia(
    "(hover: none)"
  ).matches;

if (isTouchDevice && hero) {

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
   INÍCIO
========================================================= */

console.log(
  "🚀 Lucas.Dev carregado com sucesso."
);
