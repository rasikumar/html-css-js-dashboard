// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeMobileMenu();
});

// Initialize mobile menu functionality
function initializeMobileMenu() {
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  // Check if elements exist
  if (!mobileMenuToggle || !mobileMenu) {
    console.warn("Mobile menu elements not found. Retrying in 100ms...");
    setTimeout(initializeMobileMenu, 100);
    return;
  }

  // Toggle mobile menu
  function toggleMobileMenu() {
    mobileMenu.classList.toggle("active");
    mobileMenu.classList.toggle("hidden");

    const icon = mobileMenuToggle.querySelector("svg");
    if (icon) {
      if (mobileMenu.classList.contains("active")) {
        // Change from hamburger to X icon
        icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />`;
      } else {
        // Change back to hamburger icon
        icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />`;
      }
    }
  }

  // Mobile dropdown toggle
  function setupMobileDropdowns() {
    const mobileDropdownToggles = document.querySelectorAll(
      ".mobile-dropdown-toggle"
    );

    mobileDropdownToggles.forEach((toggle) => {
      // Remove any existing listeners to prevent duplicates
      const newToggle = toggle.cloneNode(true);
      toggle.parentNode.replaceChild(newToggle, toggle);

      newToggle.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        const dropdownItem = this.closest(".mobile-dropdown-item");
        const dropdownContent = dropdownItem.querySelector(
          ".mobile-dropdown-content"
        );
        const icon = this.querySelector("i.fa-chevron-down");

        // Toggle active class
        dropdownItem.classList.toggle("active");

        // Toggle dropdown content
        if (dropdownContent.classList.contains("hidden")) {
          dropdownContent.classList.remove("hidden");
          dropdownContent.style.maxHeight = dropdownContent.scrollHeight + "px";
        } else {
          dropdownContent.classList.add("hidden");
          dropdownContent.style.maxHeight = "0px";
        }

        // Rotate icon
        if (icon) {
          if (dropdownItem.classList.contains("active")) {
            icon.style.transform = "rotate(180deg)";
          } else {
            icon.style.transform = "rotate(0deg)";
          }
        }
      });
    });
  }

  // Event listeners
  mobileMenuToggle.addEventListener("click", toggleMobileMenu);

  // Initialize dropdowns
  setupMobileDropdowns();

  // Re-initialize dropdowns when mobile menu opens (in case content was loaded dynamically)
  mobileMenuToggle.addEventListener("click", function () {
    setTimeout(setupMobileDropdowns, 50);
  });

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
  const mobileLinks = document.querySelectorAll(
    "#mobileMenu a:not(.mobile-dropdown-toggle)"
  );
  mobileLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (mobileMenu.classList.contains("active")) {
        toggleMobileMenu();
      }
    });
  });

  console.log("Mobile menu initialized successfully");
}

// Optional CSS styles to add to your stylesheet
const mobileMenuStyles = `
.mobile-dropdown-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.mobile-dropdown-item.active .mobile-dropdown-content {
  display: block;
}
`;

// Add styles to document
if (document.head) {
  const styleElement = document.createElement("style");
  styleElement.textContent = mobileMenuStyles;
  document.head.appendChild(styleElement);
}

// Optional: Export function for use in other scripts
if (typeof module !== "undefined" && module.exports) {
  module.exports = { initializeMobileMenu };
}
