// pps-about.js
document.addEventListener("DOMContentLoaded", function () {
  // Testimonial Slider
  const testimonials = document.querySelectorAll(".pps-about-testimonial");
  const dots = document.querySelectorAll(".pps-about-testimonial-dots .dot");
  const prevBtn = document.querySelector(".pps-about-testimonial-prev");
  const nextBtn = document.querySelector(".pps-about-testimonial-next");
  let currentIndex = 0;

  // Show initial testimonial
  showTestimonial(currentIndex);

  // Dot click event
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index;
      showTestimonial(currentIndex);
      updateDots();
    });
  });

  // Previous button click
  prevBtn.addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentIndex);
    updateDots();
  });

  // Next button click
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
    updateDots();
  });

  // Auto-rotate testimonials every 5 seconds
  let testimonialInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
    updateDots();
  }, 5000);

  // Pause auto-rotation on hover
  const testimonialSlider = document.querySelector(
    ".pps-about-testimonial-slider"
  );
  testimonialSlider.addEventListener("mouseenter", () => {
    clearInterval(testimonialInterval);
  });

  testimonialSlider.addEventListener("mouseleave", () => {
    testimonialInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      showTestimonial(currentIndex);
      updateDots();
    }, 5000);
  });

  // Function to show testimonial
  function showTestimonial(index) {
    testimonials.forEach((testimonial) => {
      testimonial.classList.remove("active");
    });
    testimonials[index].classList.add("active");
  }

  // Function to update dot indicators
  function updateDots() {
    dots.forEach((dot) => {
      dot.classList.remove("active");
    });
    dots[currentIndex].classList.add("active");
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Animation on scroll
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".pps-about-value-card, .pps-about-team-member, .pps-about-diff-feature"
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
    ".pps-about-value-card, .pps-about-team-member, .pps-about-diff-feature"
  );
  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  // Run once on load
  animateOnScroll();

  // Add scroll event listener
  window.addEventListener("scroll", animateOnScroll);
});
