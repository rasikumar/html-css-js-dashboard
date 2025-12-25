function loadComponent(id, file) {
  fetch(file)
    .then((res) => {
      if (!res.ok) {
        throw new Error(
          `Failed to load ${file}: ${res.status} ${res.statusText}`
        );
      }
      return res.text();
    })
    .then((html) => {
      console.log(`Successfully loaded ${file} into #${id}`);
      document.getElementById(id).innerHTML = html;

      if (id === "navbar") {
        setActiveLink();
      }
    })
    .catch((err) => {
      console.error(`Error loading component ${file}:`, err);
      // Show a fallback or error message
      document.getElementById(id).innerHTML = `
        <div style="padding: 20px; background: #fee; border: 2px solid red; border-radius: 5px;">
          <strong>Error loading ${file}:</strong> ${err.message}
          <br><small>Check file path and server configuration</small>
        </div>
      `;
    });
}

function setActiveLink() {
  // Get current filename (e.g., 'index.html')
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  // Select all links in both Desktop and Mobile menus
  const navLinks = document.querySelectorAll("header nav a, #mobileMenu a");

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href");

    if (currentPath === linkPath) {
      // Apply active styles
      link.classList.add("text-primary", "bg-gray-100", "dark:bg-gray-800");
      // Optional: Remove hover effects for the active link to keep it solid
      link.classList.remove("hover:bg-gray-100", "dark:hover:bg-gray-800");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("navbar", "partials/navbar.html");
  loadComponent("footer", "partials/footer.html");
});
