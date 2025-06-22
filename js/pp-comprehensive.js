document.addEventListener("DOMContentLoaded", function () {
  // Testimonial Slider
  const testimonials = document.querySelectorAll(".pps-support-testimonial");
  const dots = document.querySelectorAll(".pps-support-testimonial-dots span");
  const prevBtn = document.querySelector(".pps-support-testimonial-prev");
  const nextBtn = document.querySelector(".pps-support-testimonial-next");

  let currentTestimonial = 0;

  function showTestimonial(index) {
    testimonials.forEach((testimonial) =>
      testimonial.classList.remove("active")
    );
    dots.forEach((dot) => dot.classList.remove("active"));

    testimonials[index].classList.add("active");
    dots[index].classList.add("active");
    currentTestimonial = index;
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showTestimonial(index));
  });

  prevBtn.addEventListener("click", () => {
    let newIndex = currentTestimonial - 1;
    if (newIndex < 0) newIndex = testimonials.length - 1;
    showTestimonial(newIndex);
  });

  nextBtn.addEventListener("click", () => {
    let newIndex = currentTestimonial + 1;
    if (newIndex >= testimonials.length) newIndex = 0;
    showTestimonial(newIndex);
  });

  // Auto-rotate testimonials
  let testimonialInterval = setInterval(() => {
    let newIndex = currentTestimonial + 1;
    if (newIndex >= testimonials.length) newIndex = 0;
    showTestimonial(newIndex);
  }, 8000);

  // Pause on hover
  const slider = document.querySelector(".pps-support-testimonial-slider");
  slider.addEventListener("mouseenter", () => {
    clearInterval(testimonialInterval);
  });

  slider.addEventListener("mouseleave", () => {
    testimonialInterval = setInterval(() => {
      let newIndex = currentTestimonial + 1;
      if (newIndex >= testimonials.length) newIndex = 0;
      showTestimonial(newIndex);
    }, 8000);
  });

  // Animate elements when they come into view
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".pps-support-stat-card, .pps-support-service-card, .pps-support-phase, .pps-support-team-card"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Set initial state for animated elements
  const animatedElements = document.querySelectorAll(
    ".pps-support-stat-card, .pps-support-service-card, .pps-support-phase, .pps-support-team-card"
  );

  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
  });

  // Run once on load
  animateOnScroll();

  // Then run on scroll
  window.addEventListener("scroll", animateOnScroll);

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        });
      }
    });
  });
});
