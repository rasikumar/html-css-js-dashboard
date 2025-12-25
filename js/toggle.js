// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeMobileMenu();
});

// Initialize mobile menu functionality
function initializeMobileMenu() {
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  // Check if elements exist (they might be included via include.js)
  if (!mobileMenuToggle || !mobileMenu) {
    console.warn("Mobile menu elements not found. Retrying in 100ms...");
    // Retry after a short delay for dynamically loaded content
    setTimeout(initializeMobileMenu, 100);
    return;
  }

  function toggleMobileMenu() {
    mobileMenu.classList.toggle("active");
    const icon = mobileMenuToggle.querySelector("i");

    // Check if icon exists
    if (icon) {
      if (mobileMenu.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    } else {
      console.warn("Icon element not found in mobile menu toggle");
    }
  }

  mobileMenuToggle.addEventListener("click", toggleMobileMenu);

  // Mobile Dropdown Toggle
  const mobileDropdownToggles = document.querySelectorAll(
    ".mobile-dropdown-toggle"
  );

  if (mobileDropdownToggles.length > 0) {
    mobileDropdownToggles.forEach((toggle) => {
      toggle.addEventListener("click", function (e) {
        e.preventDefault();
        this.parentElement.classList.toggle("active");
      });
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    if (!mobileMenu || !mobileMenuToggle) return;

    const isClickInsideMenu = mobileMenu.contains(event.target);
    const isClickOnToggle = mobileMenuToggle.contains(event.target);

    if (
      !isClickInsideMenu &&
      !isClickOnToggle &&
      mobileMenu.classList.contains("active")
    ) {
      toggleMobileMenu();
    }
  });

  // Close mobile menu when clicking a link (excluding dropdown toggles)
  const mobileLinks = document.querySelectorAll(".mobile-menu a");
  mobileLinks.forEach((link) => {
    // Only close menu for non-dropdown-toggle links
    if (!link.classList.contains("mobile-dropdown-toggle")) {
      link.addEventListener("click", function () {
        if (mobileMenu.classList.contains("active")) {
          toggleMobileMenu();
        }
      });
    }
  });

  console.log("Mobile menu initialized successfully");
}
// Mobile Dropdown Toggle
const mobileDropdownToggles = document.querySelectorAll(
  ".mobile-dropdown-toggle"
);
mobileDropdownToggles.forEach((toggle) => {
  toggle.addEventListener("click", function (e) {
    e.preventDefault();
    const parent = this.parentElement;
    parent.classList.toggle("active");

    // Rotate the icon
    const icon = this.querySelector("i.fa-chevron-down");
    if (icon) {
      if (parent.classList.contains("active")) {
        icon.style.transform = "rotate(180deg)";
      } else {
        icon.style.transform = "rotate(0deg)";
      }
    }
  });
});

// Optional: Export function for use in other scripts
if (typeof module !== "undefined" && module.exports) {
  module.exports = { initializeMobileMenu };
}
