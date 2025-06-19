// Set current year in footer
document.getElementById("current-year").textContent = new Date().getFullYear();

// Mobile Navigation Toggle
const mobileToggle = document.querySelector(".mobile-toggle");
const navMenu = document.querySelector("nav ul");

mobileToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  mobileToggle.innerHTML = navMenu.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    !navMenu.contains(e.target) &&
    !mobileToggle.contains(e.target) &&
    navMenu.classList.contains("active")
  ) {
    navMenu.classList.remove("active");
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
  }
});

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
let touchStartX = 0;
let touchEndX = 0;

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

// Touch swipe support for mobile
slider.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

slider.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;

  if (touchStartX - touchEndX > swipeThreshold) {
    // Swipe left
    showSlide(currentSlide + 1);
  } else if (touchEndX - touchStartX > swipeThreshold) {
    // Swipe right
    showSlide(currentSlide - 1);
  }
}

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  const backToTop = document.getElementById("back-to-top");

  if (window.scrollY > 100) {
    header.style.background = "rgba(28, 38, 74, 0.95)";
    header.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.2)";
    backToTop.classList.add("visible");
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    backToTop.classList.remove("visible");
  }
});

// Close mobile menu when a link is clicked
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Back to top functionality
document.getElementById("back-to-top").addEventListener("click", () => {
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
      // Here you would normally send the data to a server
      alert("Thank you for subscribing to our newsletter!");
      emailInput.value = "";
    }
  });
}
