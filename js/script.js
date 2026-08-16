// ===== Shortcuts =====
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

// ===== Dark/Light Mode Toggle =====
const initThemeToggle = () => {
  const toggle = $("#themeToggle");
  const html = document.documentElement;
  const THEME_KEY = "portfolio-theme";
  
  const setTheme = (theme) => {
    html.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  };
  
  const getPreferredTheme = () => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };
  
  const currentTheme = getPreferredTheme();
  setTheme(currentTheme);
  
  if (toggle) {
    toggle.addEventListener("click", () => {
      const newTheme = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
      setTheme(newTheme);
    });
  }
};

initThemeToggle();

// ===== Smooth scrolling for nav links =====
$$(".navbar .nav-link").forEach((link) => {
  if (!link.hash) return;
  link.addEventListener("click", (e) => {
    const target = $(link.hash);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ===== Close mobile navbar after clicking a link =====
document.addEventListener("click", (e) => {
  if (!e.target.closest(".navbar .nav-link")) return;
  const nav = $(".navbar-collapse");
  if (nav?.classList.contains("show")) new bootstrap.Collapse(nav).hide();
});

// ===== Initialize carousels =====
$$(".carousel").forEach(
  (c) =>
    new bootstrap.Carousel(c, {
      interval: 3500,
      ride: false,
      pause: "hover",
      touch: true,
      wrap: true,
    })
);

// ===== Active nav link on scroll =====
const sections = $$("section[id]");
const navLinks = $$(".navbar .nav-link");
const idToLink = new Map(
  navLinks.filter((a) => a.hash?.startsWith("#")).map((a) => [a.hash.slice(1), a])
);
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const link = idToLink.get(entry.target.id);
      if (!link) return;
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  },
  { rootMargin: "-60% 0px -30% 0px", threshold: 0.01 }
);
sections.forEach((s) => spy.observe(s));

// ===== Contact form validation =====
const form = $("#contactForm") || $("form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#name")?.value.trim() || "";
    const email = $("#email")?.value.trim() || "";
    const message = $("#message")?.value.trim() || "";
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!name || !email || !message)
      return alert("Please fill in all fields before submitting.");
    if (!validEmail) return alert("Please enter a valid email address.");
    alert("✅ Your message has been submitted successfully!");
    form.reset();
  });
}

// ===== Back-to-Top Button =====
const toTop = document.createElement("button");
toTop.textContent = "↑";
toTop.className = "back-to-top";
toTop.setAttribute("aria-label", "Back to top");
document.body.appendChild(toTop);
const toggleTop = () => (toTop.style.display = window.scrollY > 300 ? "flex" : "none");
window.addEventListener("scroll", toggleTop);
toggleTop();
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// ===== Skills scroller (duplicate once for seamless loop) =====
const wrap = $(".scroll-wrapper");
if (wrap) {
  const clones = Array.from(wrap.children);
  clones.forEach((node) => wrap.appendChild(node.cloneNode(true)));
}