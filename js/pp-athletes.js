document.addEventListener("DOMContentLoaded", function () {
  // Set the launch date (2 months from now)
  const launchDate = new Date();
  launchDate.setMonth(launchDate.getMonth() + 2);

  // Update countdown every second
  const countdown = setInterval(function () {
    const now = new Date().getTime();
    const distance = launchDate - now;

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display results
    document.getElementById("pps-cs-days").textContent = days
      .toString()
      .padStart(2, "0");
    document.getElementById("pps-cs-hours").textContent = Math.floor(hours)
      .toString()
      .padStart(2, "0");
    document.getElementById("pps-cs-minutes").textContent = Math.floor(minutes)
      .toString()
      .padStart(2, "0");
    document.getElementById("pps-cs-seconds").textContent = Math.floor(seconds)
      .toString()
      .padStart(2, "0");

    // If countdown is finished
    if (distance < 0) {
      clearInterval(countdown);
      document.querySelector(".pps-cs-countdown").innerHTML =
        '<div class="pps-cs-launched">We\'re Live!</div>';
    }
  }, 1000);

  // Form submission
  const notifyForm = document.querySelector(".pps-cs-notify-form");
  if (notifyForm) {
    notifyForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = this.querySelector(".pps-cs-notify-input");
      const email = emailInput.value;

      // Simple validation
      if (email && email.includes("@")) {
        // In a real implementation, you would send this to your server
        console.log("Email submitted:", email);

        // Show success message
        const successMsg = document.createElement("div");
        successMsg.className = "pps-cs-success-msg";
        successMsg.textContent = "Thanks! We'll notify you when we launch.";
        successMsg.style.color = "white";
        successMsg.style.marginTop = "1rem";
        successMsg.style.animation = "fadeIn 0.5s ease-in-out";

        // Insert after form
        this.parentNode.insertBefore(successMsg, this.nextSibling);

        // Clear input
        emailInput.value = "";

        // Remove message after 5 seconds
        setTimeout(() => {
          successMsg.style.animation = "fadeOut 0.5s ease-in-out";
          setTimeout(() => successMsg.remove(), 500);
        }, 5000);
      } else {
        // Show error
        emailInput.style.boxShadow = "0 0 0 2px #e11d48";
        setTimeout(() => {
          emailInput.style.boxShadow = "none";
        }, 2000);
      }
    });
  }

  // Add animation for elements when they come into view
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".pps-cs-countdown-item, .pps-cs-notify-form, .pps-cs-social-link"
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
    ".pps-cs-countdown-item, .pps-cs-notify-form, .pps-cs-social-link"
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
});
