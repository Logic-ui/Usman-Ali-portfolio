// script.js

// Smooth scrolling for nav links
document.querySelectorAll('a.nav-link').forEach(link => {
  link.addEventListener('click', function (e) {
    if (this.hash !== '') {
      e.preventDefault();
      const target = document.querySelector(this.hash);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Sticky Navbar on Scroll
window.addEventListener('scroll', function () {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
});

// Highlight Active Section in Navbar
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100;
    const sectionId = current.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
});

// Contact Form Validation
const form = document.querySelector("form");
form.addEventListener("submit", function (e) {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name === "" || email === "" || message === "") {
    e.preventDefault();
    alert("Please fill in all fields before submitting.");
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    e.preventDefault();
    alert("Please enter a valid email address.");
  }
});

// Back-to-Top Button
const backToTop = document.createElement("button");
backToTop.innerText = "↑";
backToTop.classList.add("back-to-top");
document.body.appendChild(backToTop);

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// =======================
// Dark Mode Toggle
// =======================
const darkModeToggle = document.createElement("button");
darkModeToggle.innerText = "🌙 Dark Mode";
darkModeToggle.classList.add("dark-mode-toggle");
document.body.appendChild(darkModeToggle);

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-theme");
  darkModeToggle.innerText = "☀️ Light Mode";
}

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  if (document.body.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "dark");
    darkModeToggle.innerText = "☀️ Light Mode";
  } else {
    localStorage.setItem("theme", "light");
    darkModeToggle.innerText = "🌙 Dark Mode";
  }
});
