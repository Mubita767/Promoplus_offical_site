document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("pp-toggle-m6n5v");
  const navMenu = document.getElementById("pp-nav-q7w2e");
  const bars = document.querySelectorAll(".pp-bar-a1s9d");

  toggleButton.addEventListener("click", function () {
    navMenu.classList.toggle("active");

    bars.forEach((bar) => {
      bar.classList.toggle("active");
    });
  });

  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll(".pp-link-u6j4h");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        navMenu.classList.remove("active");
        bars.forEach((bar) => {
          bar.classList.remove("active");
        });
      }
    });
  });
});
