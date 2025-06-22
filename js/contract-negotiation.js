document.addEventListener("DOMContentLoaded", function () {
  // FAQ accordion functionality
  const faqQuestions = document.querySelectorAll(".pp-cn-faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      question.classList.toggle("active");
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.getElementById("pp-header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Animation on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".pp-cn-process-step, .pp-cn-component-card, .pp-cn-league-profile"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;

      if (elementPosition < screenPosition) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Set initial state for animated elements
  const animatedElements = document.querySelectorAll(
    ".pp-cn-process-step, .pp-cn-component-card, .pp-cn-league-profile"
  );
  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Run once on load
});
