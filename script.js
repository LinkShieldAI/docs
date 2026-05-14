const searchInput = document.querySelector("[data-search]");
const sections = Array.from(document.querySelectorAll(".doc-section"));
const noResults = document.querySelector("[data-no-results]");
const sidebar = document.querySelector("[data-sidebar]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navLinks = Array.from(document.querySelectorAll(".nav-link"));

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("open");
  });
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  let matches = 0;

  sections.forEach((section) => {
    const text = `${section.dataset.title || ""} ${section.textContent}`.toLowerCase();
    const visible = !query || text.includes(query);
    section.hidden = !visible;
    if (visible) matches += 1;
  });

  noResults.hidden = matches > 0;
});

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  {
    rootMargin: "-25% 0px -65% 0px",
    threshold: [0.1, 0.2, 0.4, 0.7],
  }
);

sections.forEach((section) => observer.observe(section));
