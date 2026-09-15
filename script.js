/* =========================
   SCROLL SUAVE
========================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {

    const href = link.getAttribute("href");

    if (href === "#") return;

    const target = document.querySelector(href);

    if (target) {
      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

  });
});


/* =========================
   PARALLAX DO DESERTO
========================= */

const hero = document.querySelector(".hero");

if (hero) {

  hero.addEventListener("mousemove", e => {

    const rect = hero.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    hero.style.setProperty("--mouse-x", `${x * 18}px`);
    hero.style.setProperty("--mouse-y", `${y * 18}px`);

  });

  hero.addEventListener("mouseleave", () => {

    hero.style.setProperty("--mouse-x", "0px");
    hero.style.setProperty("--mouse-y", "0px");

  });

}


/* =========================
   REVELAÇÃO AO ROLAR
========================= */

const revealElements = document.querySelectorAll(
  ".section, .project-card, .skill, .cta"
);

const revealObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("apareceu");

        revealObserver.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.12
  }
);

revealElements.forEach(element => {
  element.classList.add("reveal");
  revealObserver.observe(element);
});


/* =========================
   CARDS 3D
========================= */

const cards = document.querySelectorAll(".project-card");

cards.forEach(card => {

  card.addEventListener("mousemove", e => {

    const r = card.getBoundingClientRect();

    const x =
      ((e.clientX - r.left) / r.width - 0.5) * 5;

    const y =
      ((e.clientY - r.top) / r.height - 0.5) * -5;

    card.style.transform =
      `perspective(700px)
       rotateY(${x}deg)
       rotateX(${y}deg)
       translateY(-4px)`;

  });


  card.addEventListener("mouseleave", () => {

    card.style.transform = "";

  });

});


/* =========================
   MICROINTERAÇÃO DOS CARDS
========================= */

cards.forEach(card => {

  card.addEventListener("mouseenter", () => {
    card.classList.add("card-hover");
  });

  card.addEventListener("mouseleave", () => {
    card.classList.remove("card-hover");
  });

});


/* =========================
   CONSOLE
========================= */

console.log(
  "🌵 Lucas.Dev — sistema iniciado. Bora codar!"
);
