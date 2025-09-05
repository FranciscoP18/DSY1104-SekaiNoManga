document.getElementById("toggle-generos").addEventListener("click", function (e) {
  e.stopPropagation(); // evita que Bootstrap cierre el dropdown
  document.querySelectorAll(".dropdown-menu .extra").forEach(el => el.classList.toggle("d-none"));
  this.textContent = this.textContent.trim() === "Ver más" ? "Ver menos" : "Ver más";
});

// Captura clicks en "Añadir al carrito"
document.addEventListener('click', function (e) {
  const btn = e.target.closest('.btn-add-cart');
  if (!btn) return;

  e.preventDefault();
  const id = btn.getAttribute('data-id');
  const nombre = btn.getAttribute('data-nombre') || 'Producto';
  const precio = parseInt(btn.getAttribute('data-precio') || '0', 10);

  // Pide cantidad
  let qty = prompt(`¿Cuántas unidades de "${nombre}" quieres agregar?`, "1");
  if (qty === null) return; // cancelado
  qty = parseInt(qty, 10);

  if (Number.isNaN(qty) || qty <= 0) {
    alert('Cantidad inválida');
    return;
  }

  // Redirige al carrito pasando la info por querystring
  const params = new URLSearchParams({
    id, nombre, precio: String(precio), qty: String(qty)
  });
  window.location.href = `carro.html?${params.toString()}`;
});