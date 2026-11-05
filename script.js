

// Mobile navigation
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

// Light / dark theme
const themeButton = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
}

function updateThemeButton() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  themeButton.textContent = currentTheme === "dark" ? "☀" : "☾";
  themeButton.setAttribute(
    "aria-label",
    currentTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"
  );
}

updateThemeButton();

themeButton.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  if (nextTheme === "light") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", nextTheme);
  }

  localStorage.setItem("portfolio-theme", nextTheme);
  updateThemeButton();
});

// Current year
document.getElementById("year").textContent = new Date().getFullYear();

// Scroll reveal animations
const revealElements = document.querySelectorAll(
  ".section-heading, .about-grid, .skill-card, .project-card, " +
  ".timeline-item, .certificate-card, .achievement-card, " +
  ".education-card, .contact-form"
);

revealElements.forEach(element => element.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("visible"));
}

// Back-to-top button
const backToTop = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 500);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Contact form: opens the visitor's email application
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", event => {
  event.preventDefault();

  // Replace this with your actual professional email address.
  const recipient = "YOUR_EMAIL@example.com";

  const name = document.getElementById("visitor-name").value.trim();
  const email = document.getElementById("visitor-email").value.trim();
  const subject = document.getElementById("visitor-subject").value.trim();
  const message = document.getElementById("visitor-message").value.trim();

  const emailSubject = encodeURIComponent(subject);
  const emailBody = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );

  window.location.href =
    `mailto:${recipient}?subject=${emailSubject}&body=${emailBody}`;
});
