document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

const cards = document.querySelectorAll(".project-card");
cards.forEach(card => {
  card.addEventListener("mousemove", e => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - .5) * 5;
    const y = ((e.clientY - r.top) / r.height - .5) * -5;
    card.style.transform = `perspective(700px) rotateY(${x}deg) rotateX(${y}deg) translateY(-4px)`;
  });
  card.addEventListener("mouseleave", () => card.style.transform = "");
});
