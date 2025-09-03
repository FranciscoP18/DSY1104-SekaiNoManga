document.getElementById("toggle-generos").addEventListener("click", function (e) {
  e.stopPropagation(); // evita que Bootstrap cierre el dropdown
  document.querySelectorAll(".dropdown-menu .extra").forEach(el => el.classList.toggle("d-none"));
  this.textContent = this.textContent.trim() === "Ver más" ? "Ver menos" : "Ver más";
});