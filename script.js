// Advanced Scroll Animations
class ScrollAnimations {
  constructor() {
    this.elements = [];
    this.init();
  }

  init() {
    this.setupObserver();
    this.animateOnLoad();
    this.setupScrollIndicator();
  }

  setupObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with data-animation
    document.querySelectorAll("[data-animation]").forEach((el) => {
      this.observer.observe(el);
    });

    // Observe sections for general animations
    document
      .querySelectorAll(
        ".section-title, .about-text p, .skill-category, .service-card"
      )
      .forEach((el) => {
        this.observer.observe(el);
      });
  }

  animateElement(element) {
    const animationType = element.getAttribute("data-animation");
    const delay = element.getAttribute("data-delay") || 0;

    setTimeout(() => {
      element.style.opacity = "1";

      switch (animationType) {
        case "slide-up":
          element.style.transform = "translateY(0)";
          break;
        case "slide-left":
          element.style.transform = "translateX(0)";
          break;
        case "fade-in":
          element.style.opacity = "1";
          break;
        case "scale-in":
          element.style.transform = "scale(1)";
          break;
        case "bounce":
          element.style.opacity = "1";
          element.style.animation = "bounce 2s infinite";
          break;
        default:
          // Generic animations for elements without specific data-animation
          if (element.classList.contains("section-title")) {
            element.style.transform = "translateY(0)";
          } else if (element.classList.contains("skill-category")) {
            element.style.transform = "translateY(0)";
          } else if (element.classList.contains("service-card")) {
            element.style.transform = "translateY(0)";
          } else {
            element.style.transform = "translateY(0)";
          }
      }

      element.classList.add("animated");
    }, delay);
  }

  animateOnLoad() {
    // Animate hero section on page load
    setTimeout(() => {
      const heroElements = document.querySelectorAll(
        ".hero-text [data-animation]"
      );
      heroElements.forEach((el, index) => {
        const delay = el.getAttribute("data-delay") || index * 200;
        this.animateElement(el);
      });

      // Animate hero visual
      const heroVisual = document.querySelector(".hero-visual");
      if (heroVisual) {
        setTimeout(() => {
          this.animateElement(heroVisual);
        }, 400);
      }

      // Animate scroll indicator
      const scrollIndicator = document.querySelector(".scroll-indicator");
      if (scrollIndicator) {
        setTimeout(() => {
          scrollIndicator.style.opacity = "1";
        }, 1000);
      }
    }, 300);
  }

  setupScrollIndicator() {
    const scrollArrow = document.querySelector(".scroll-arrow");
    if (scrollArrow) {
      scrollArrow.addEventListener("click", () => {
        document.querySelector("#about").scrollIntoView({
          behavior: "smooth",
        });
      });
    }
  }
}

// Initialize scroll animations
const scrollAnimations = new ScrollAnimations();

// Dark Mode Toggle Functionality
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem("theme") || "dark";
document.documentElement.setAttribute("data-theme", currentTheme);

// Update icon based on current theme
function updateThemeIcon(theme) {
  if (theme === "dark") {
    themeIcon.className = "fas fa-sun";
  } else {
    themeIcon.className = "fas fa-moon";
  }
}

// Initialize icon
updateThemeIcon(currentTheme);

// Theme toggle event listener
themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  // Add rotation animation to the toggle button
  themeToggle.style.transform = "rotate(360deg)";

  // Update theme after a short delay for smooth transition
  setTimeout(() => {
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
    themeToggle.style.transform = "rotate(0deg)";
  }, 150);
});

// Mobile Menu Toggle
const menuToggle = document.querySelector(".menu-toggle");
const navMain = document.querySelector(".main");

menuToggle.addEventListener("click", () => {
  navMain.classList.toggle("active");
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('.nav a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed nav
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }

    // Close mobile menu after clicking
    navMain.classList.remove("active");
  });
});

// Active Navigation Highlighting
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;

    if (
      window.pageYOffset >= sectionTop &&
      window.pageYOffset < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Skill Bar Animation
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -100px 0px",
};

const skillBarObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const skillBars = entry.target.querySelectorAll(".skill-progress");
      skillBars.forEach((bar) => {
        const percent = bar.getAttribute("data-percent");
        bar.style.width = percent + "%";
      });
    }
  });
}, observerOptions);

// Observe skills section
const skillsSection = document.querySelector("#skills");
if (skillsSection) {
  skillBarObserver.observe(skillsSection);
}

// Stats Counter Animation
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const stats = entry.target.querySelectorAll(".stat h3");
      stats.forEach((stat) => {
        const finalNumber = parseInt(stat.textContent);
        animateNumber(stat, finalNumber);
      });
    }
  });
}, observerOptions);

function animateNumber(element, final) {
  let current = 0;
  const increment = final / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= final) {
      element.textContent =
        final + (element.textContent.includes("%") ? "%" : "+");
      clearInterval(timer);
    } else {
      element.textContent =
        Math.floor(current) + (element.textContent.includes("%") ? "%" : "+");
    }
  }, 40);
}

// Observe about section for stats
const aboutSection = document.querySelector("#about");
if (aboutSection) {
  statsObserver.observe(aboutSection);
}

// Contact Form Handling
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    // Simple validation
    if (!name || !email || !message) {
      showNotification("Please fill in all fields", "error");
      return;
    }

    if (!validateEmail(email)) {
      showNotification("Please enter a valid email address", "error");
      return;
    }

    // Simulate form submission
    const submitBtn = this.querySelector(".submit-btn");
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
      showNotification(
        "Thank you! Your message has been sent successfully.",
        "success"
      );
      this.reset();
      submitBtn.textContent = "Send Message";
      submitBtn.disabled = false;
    }, 2000);
  });
}

// Email validation
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === "success" ? "var(--accent-primary)" : "#e74c3c"};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px var(--shadow-medium);
        z-index: 1001;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 5000);
}

// Hero Button Actions
const hireBtn = document.querySelector(".hire-btn");
const portfolioBtn = document.querySelector(".portfolio-btn");

if (hireBtn) {
  hireBtn.addEventListener("click", () => {
    document.querySelector("#contact").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

if (portfolioBtn) {
  portfolioBtn.addEventListener("click", () => {
    document.querySelector("#services").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

// Service Card Hover Effects
const serviceCards = document.querySelectorAll(".service-card");
serviceCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".nav");
  if (window.scrollY > 100) {
    nav.style.background = "var(--nav-bg-scroll)";
    nav.style.boxShadow = "0 2px 20px var(--shadow-medium)";
  } else {
    nav.style.background = "var(--nav-bg)";
    nav.style.boxShadow = "0 2px 10px var(--shadow-light)";
  }
});

// Loading animation for the page
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".nav") && navMain.classList.contains("active")) {
    navMain.classList.remove("active");
  }
});

// Prevent default behavior for placeholder links
document.querySelectorAll('a[href="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

// Add smooth reveal animations for sections
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
);

// Apply reveal animation to all sections
document.querySelectorAll(".section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  revealObserver.observe(section);
});

// Add typing effect to the main heading
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = "";

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Apply typing effect when the hero section is visible
const heroObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const heroTitle = entry.target.querySelector(".hero-name");
        if (heroTitle && !heroTitle.classList.contains("typed")) {
          heroTitle.classList.add("typed");
          typeWriter(heroTitle, "Prannav R", 150);
        }
      }
    });
  },
  { threshold: 0.3 }
);

const homeSection = document.querySelector("#home");
if (homeSection) {
  heroObserver.observe(homeSection);
}
