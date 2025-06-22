document.addEventListener("DOMContentLoaded", function () {
  // Tab functionality
  const tabButtons = document.querySelectorAll(".pp-tab-btn");
  const tabContents = document.querySelectorAll(".pp-tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked button and corresponding content
      button.classList.add("active");
      const tabId = button.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });

  // FAQ accordion
  const faqQuestions = document.querySelectorAll(".pp-faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      question.classList.toggle("active");
    });
  });

  // Testimonial slider
  const testimonialSlides = document.querySelectorAll(".pp-testimonial-slide");
  const prevBtn = document.querySelector(".pp-testimonial-prev");
  const nextBtn = document.querySelector(".pp-testimonial-next");
  const dotsContainer = document.querySelector(".pp-testimonial-dots");
  let currentSlide = 0;

  // Create dots
  testimonialSlides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("pp-testimonial-dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".pp-testimonial-dot");

  function showSlide(index) {
    testimonialSlides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    testimonialSlides[index].classList.add("active");
    dots[index].classList.add("active");
    currentSlide = index;
  }

  function goToSlide(index) {
    showSlide(index);
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide =
      (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
    showSlide(currentSlide);
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Auto-advance testimonials
  setInterval(nextSlide, 8000);

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
      ".pp-approach-card, .pp-pipeline-step, .pp-story-card, .pp-team-member"
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
    ".pp-approach-card, .pp-pipeline-step, .pp-story-card, .pp-team-member"
  );
  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Run once on load
});
