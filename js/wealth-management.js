document.addEventListener("DOMContentLoaded", function () {
  // Animate elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".pps-wealth-stat-card, .pps-wealth-service-card, .pps-wealth-principle-card, .pps-wealth-tool-feature"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "animate__animated",
              "animate__fadeInUp"
            );
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
    });
  };

  // Smooth scrolling for anchor links
  const smoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        });
      });
    });
  };

  // Counter animation for stats
  const animateStats = () => {
    const statCards = document.querySelectorAll(".pps-wealth-stat-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector(
              ".pps-wealth-stat-number"
            );
            const target = parseInt(statNumber.textContent);
            let count = 0;
            const duration = 2000;
            const increment = target / (duration / 16);

            const updateCount = () => {
              count += increment;
              if (count < target) {
                statNumber.textContent =
                  Math.floor(count) +
                  (statNumber.textContent.includes("%") ? "%" : "x");
                requestAnimationFrame(updateCount);
              } else {
                statNumber.textContent =
                  target + (statNumber.textContent.includes("%") ? "%" : "x");
              }
            };

            updateCount();
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    statCards.forEach((card) => {
      observer.observe(card);
    });
  };

  // Initialize all functions
  animateOnScroll();
  smoothScroll();
  animateStats();

  // Add animation class to hero content
  const heroContent = document.querySelector(".pps-wealth-hero-content");
  if (heroContent) {
    heroContent.classList.add("animate__animated", "animate__fadeIn");
  }
});
