// Set current year in footer
document.getElementById("current-year").textContent = new Date().getFullYear();

// Scroll animation for elements
function animateOnScroll() {
  const elements = document.querySelectorAll(".animate-on-scroll");
  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (elementTop < windowHeight * 0.85) {
      element.classList.add("visible");
    }
  });
}

// Initialize animation on scroll
window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);

// Counter animation for stats
function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Initialize counters when in view
const statCards = document.querySelectorAll(".stat-card");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const number = entry.target.querySelector(".stat-number");
        const finalValue = parseInt(number.getAttribute("data-count"));
        animateValue(number, 0, finalValue, 2000);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

statCards.forEach((card) => {
  observer.observe(card);
});

// Testimonial slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll(".testimonial-slide");
const dots = document.querySelectorAll(".slider-dot");

function showSlide(n) {
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  currentSlide = (n + slides.length) % slides.length;

  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}

// Dot click event
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
  });
});

// Auto slide change
let slideInterval = setInterval(() => {
  showSlide(currentSlide + 1);
}, 5000);

// Pause auto slide on hover
const slider = document.querySelector(".testimonial-slider");
slider.addEventListener("mouseenter", () => clearInterval(slideInterval));
slider.addEventListener("mouseleave", () => {
  slideInterval = setInterval(() => {
    showSlide(currentSlide + 1);
  }, 5000);
});

// Back to top functionality
document.getElementById("back-to-top")?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Newsletter form submission
const newsletterForm = document.querySelector(".newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    if (emailInput.value) {
      alert("Thank you for subscribing to our newsletter!");
      emailInput.value = "";
    }
  });
}
