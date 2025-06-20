document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("pp-toggle");
  const nav = document.getElementById("pp-nav");
  const header = document.getElementById("pp-header");
  const dropdowns = document.querySelectorAll(".pp-dropdown");

  // Initialize mobile menu as hidden
  if (window.innerWidth <= 768) {
    nav.style.display = "none";
  }

  // Mobile menu toggle
  toggleButton.addEventListener("click", (e) => {
    e.stopPropagation();
    nav.classList.toggle("open");
    toggleButton.classList.toggle("active");

    if (nav.classList.contains("open")) {
      nav.style.display = "block";
      setTimeout(() => {
        nav.style.right = "0";
      }, 10);
    } else {
      nav.style.right = "-100%";
      setTimeout(() => {
        nav.style.display = "none";
      }, 500);
    }

    document.body.style.overflow = nav.classList.contains("open")
      ? "hidden"
      : "";
  });

  // Header scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      nav.classList.contains("open") &&
      !e.target.closest("#pp-nav") &&
      !e.target.closest("#pp-toggle")
    ) {
      nav.classList.remove("open");
      toggleButton.classList.remove("active");
      nav.style.right = "-100%";
      setTimeout(() => {
        nav.style.display = "none";
      }, 500);
      document.body.style.overflow = "";
    }
  });

  // Professional dropdown functionality
  dropdowns.forEach((dropdown) => {
    const link = dropdown.querySelector(".pp-link");
    const menu = dropdown.querySelector(".pp-dropdown-menu");

    // Desktop hover
    dropdown.addEventListener("mouseenter", () => {
      if (window.innerWidth > 768) {
        menu.style.display = "block";
        setTimeout(() => {
          menu.style.opacity = "1";
          menu.style.visibility = "visible";
          menu.style.transform = "translateX(-50%) translateY(10px)";
        }, 10);
      }
    });

    dropdown.addEventListener("mouseleave", () => {
      if (window.innerWidth > 768) {
        menu.style.opacity = "0";
        menu.style.visibility = "hidden";
        menu.style.transform = "translateX(-50%)";
        setTimeout(() => {
          menu.style.display = "none";
        }, 300);
      }
    });

    // Mobile click
    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        menu.classList.toggle("show");

        // Close other dropdowns
        document.querySelectorAll(".pp-dropdown-menu").forEach((otherMenu) => {
          if (otherMenu !== menu) otherMenu.classList.remove("show");
        });
      }
    });
  });

  // Close dropdowns when clicking outside on mobile
  document.addEventListener("click", (e) => {
    if (
      window.innerWidth <= 768 &&
      !e.target.closest(".pp-dropdown") &&
      nav.classList.contains("open")
    ) {
      document.querySelectorAll(".pp-dropdown-menu").forEach((menu) => {
        menu.classList.remove("show");
      });
    }
  });

  // Close menu when clicking links
  document.querySelectorAll(".pp-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (
        window.innerWidth <= 768 &&
        !link.parentElement.classList.contains("pp-dropdown")
      ) {
        nav.classList.remove("open");
        toggleButton.classList.remove("active");
        nav.style.right = "-100%";
        setTimeout(() => {
          nav.style.display = "none";
        }, 500);
        document.body.style.overflow = "";
      }
    });
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      nav.style.display = "";
      nav.style.right = "";
      nav.classList.remove("open");
      toggleButton.classList.remove("active");
      document.body.style.overflow = "";
    } else if (!nav.classList.contains("open")) {
      nav.style.display = "none";
    }
  });
});
