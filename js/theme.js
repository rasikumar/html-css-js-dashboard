const html = document.documentElement;
const savedTheme = localStorage.getItem("theme");

if (savedTheme) html.classList.add(savedTheme);

document.addEventListener("click", (e) => {
  if (e.target.id === "themeToggle") {
    html.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      html.classList.contains("dark") ? "dark" : ""
    );
  }
});
