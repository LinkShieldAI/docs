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

const languageAliases = {
  js: "javascript",
  node: "javascript",
  ts: "typescript",
  py: "python",
  ps1: "powershell",
  shell: "bash",
  sh: "bash",
};

function normalizeLanguage(language) {
  const normalized = language.toLowerCase().trim();
  return languageAliases[normalized] || normalized;
}

function inferLanguage(code) {
  const trimmed = code.trim();

  if (trimmed.startsWith("<?php")) return "php";
  if (trimmed.startsWith("[dependencies]")) return "toml";
  if (trimmed.startsWith("GET https://")) return "http";
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) return "json";
  if (trimmed.startsWith("# PowerShell") || trimmed.includes("$env:")) return "powershell";
  if (trimmed.startsWith("npm ") || trimmed.startsWith("composer ") || trimmed.startsWith("cargo ") || trimmed.startsWith("python ") || trimmed.startsWith("vendor/bin/") || trimmed.startsWith("linkshieldai ")) return "bash";
  if (trimmed.includes("from linkshieldai import") || trimmed.includes("asyncio.run(") || trimmed.includes("print(")) return "python";
  if (trimmed.includes('import { LinkShieldAI } from "linkshieldai"') || trimmed.includes("console.log(") || trimmed.includes("const ")) return "javascript";
  if (trimmed.includes("use linkshieldai::") || trimmed.includes("#[tokio::main]") || trimmed.includes("async fn main()")) return "rust";

  return "";
}

function prepareCodeBlock(codeElement) {
  const fenced = codeElement.textContent.match(/^```([A-Za-z0-9_+-]+)\s*\n([\s\S]*?)\n```$/);
  let language = "";

  if (fenced) {
    language = normalizeLanguage(fenced[1]);
    codeElement.textContent = fenced[2];
  } else {
    language = inferLanguage(codeElement.textContent);
  }

  if (language) {
    codeElement.classList.add(`language-${language}`);
    codeElement.parentElement?.setAttribute("data-language", language);
  }

  if (window.hljs) {
    hljs.highlightElement(codeElement);
  }
}

document.querySelectorAll("pre code").forEach(prepareCodeBlock);
