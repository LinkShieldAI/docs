const searchInput = document.querySelector("[data-search]");
const sections = Array.from(document.querySelectorAll(".doc-section"));
const noResults = document.querySelector("[data-no-results]");
const sidebar = document.querySelector("[data-sidebar]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navLinks = Array.from(document.querySelectorAll(".nav-link"));

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const open = sidebar.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Search hides sections that don't mention the query.
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

// Highlight the sidebar link for the section in view.
const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries.find((entry) => entry.isIntersecting);
    if (!visible) return;

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  { rootMargin: "-30% 0px -65% 0px" }
);

sections.forEach((section) => observer.observe(section));

// Theme toggle. The choice is stored and wins over the OS setting.
const themeKey = "lsa-theme";

function storedTheme() {
  try {
    return localStorage.getItem(themeKey);
  } catch (error) {
    return null;
  }
}

document.querySelector(".theme-toggle").addEventListener("click", () => {
  const current = storedTheme() || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const next = current === "dark" ? "light" : "dark";
  try {
    localStorage.setItem(themeKey, next);
  } catch (error) {}
  document.documentElement.setAttribute("data-theme", next);
});

// Code blocks: label, copy button and syntax colors.
const languageLabels = {
  bash: "shell",
  python: "python",
  javascript: "javascript",
  php: "php",
  rust: "rust",
  json: "json",
  ini: "toml",
  plaintext: "text",
};

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.opacity = "0";
  document.body.appendChild(field);
  field.select();
  document.execCommand("copy");
  field.remove();
}

document.querySelectorAll("pre > code").forEach((code) => {
  const pre = code.parentElement;
  const language = (code.className.match(/language-(\w+)/) || [])[1] || "";

  const label = document.createElement("span");
  label.className = "code-label";
  label.textContent = pre.dataset.label || languageLabels[language] || language;
  pre.prepend(label);

  const button = document.createElement("button");
  button.type = "button";
  button.className = "copy-button";
  button.textContent = "Copy";
  button.addEventListener("click", async () => {
    try {
      await copyText(code.textContent);
      button.textContent = "Copied";
      button.classList.add("copied");
    } catch (error) {
      button.textContent = "Copy failed";
    }
    window.setTimeout(() => {
      button.textContent = "Copy";
      button.classList.remove("copied");
    }, 1600);
  });
  pre.appendChild(button);

  if (window.hljs && language && language !== "plaintext") {
    hljs.highlightElement(code);
  }
});
