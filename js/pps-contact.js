document.addEventListener("DOMContentLoaded", function () {
  // Animate elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".pps-contact-card, .pps-contact-form, .pps-contact-team-card"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Add delay based on index for staggered animation
            entry.target.style.animationDelay = `${index * 0.1}s`;
            entry.target.classList.add("animate__fadeInUp");
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

  // Form submission handling
  const handleFormSubmit = () => {
    const form = document.getElementById("pps-contact-form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get form values
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Show loading state
        const submitBtn = form.querySelector(".pps-contact-submit");
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual AJAX call)
        setTimeout(() => {
          console.log("Form submitted:", data);

          // Show success message
          submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';

          // Reset form after 2 seconds
          setTimeout(() => {
            form.reset();
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;

            // Reset labels for all fields
            document.querySelectorAll(".pps-form-group").forEach((group) => {
              const input = group.querySelector("input, select, textarea");
              const label = group.querySelector("label");
              if (input.value === "") {
                label.style.top = "1rem";
                label.style.fontSize = "1rem";
                label.style.color = "var(--pps-gray)";
              }
            });
          }, 2000);
        }, 1500);
      });
    }
  };

  // Initialize floating animation for contact cards
  const initFloatingAnimation = () => {
    const cards = document.querySelectorAll(".pps-contact-card");
    cards.forEach((card, index) => {
      // Add delay based on index for staggered animation
      card.style.animationDelay = `${index * 0.2}s`;
      card.classList.add("pps-floating");
    });
  };

  // Smooth scrolling for anchor links
  const smoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  };

  // Initialize all functions
  animateOnScroll();
  handleFormSubmit();
  initFloatingAnimation();
  smoothScroll();

  // Add animation to hero content
  const heroContent = document.querySelector(".pps-contact-hero-content");
  if (heroContent) {
    heroContent.classList.add("animate__animated", "animate__fadeIn");
  }
});
