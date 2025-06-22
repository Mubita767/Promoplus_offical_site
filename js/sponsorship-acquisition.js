document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Intersection Observer for scroll animations
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".pps-section, .pps-sponsor-card, .pps-benefit-card, .pps-principle-card, .pps-deal-card"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("pps-animate");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
      element.style.opacity = "0"; // Start with elements hidden
    });
  };

  // Initialize animations
  animateOnScroll();

  // Partner logo animation
  const partnerLogos = document.querySelectorAll(".pps-partner-logo");
  partnerLogos.forEach((logo) => {
    logo.addEventListener("mouseenter", () => {
      logo.style.transition = "all 0.3s ease";
    });
  });

  // Mobile menu toggle (if you add a mobile menu later)
  const mobileMenuToggle = document.createElement("button");
  mobileMenuToggle.className = "pps-mobile-menu-toggle";
  mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  document.body.appendChild(mobileMenuToggle);

  mobileMenuToggle.addEventListener("click", function () {
    // Add mobile menu functionality here if needed
    console.log("Mobile menu clicked");
  });

  // Dynamic year in footer (if you add a footer)
  const yearElement = document.createElement("span");
  yearElement.className = "pps-current-year";
  yearElement.textContent = new Date().getFullYear();
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.appendChild(yearElement.cloneNode(true));
  });

  // Lazy loading for images
  if ("loading" in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach((img) => {
      img.src = img.dataset.src;
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
    document.body.appendChild(script);
  }
});
