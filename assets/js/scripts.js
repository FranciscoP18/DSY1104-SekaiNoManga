// Captura clicks en "Añadir al carrito"
document.addEventListener('click', function (e) {
  const btn = e.target.closest('.btn-add-cart');
  if (!btn) return;

  e.preventDefault(); // no navegamos aún
  e.stopPropagation();

  // Evitar que se repita si ya se marcó "Agregado"
  if (btn.classList.contains('btn-success')) return;

  const id = btn.getAttribute('data-id');
  const nombre = btn.getAttribute('data-nombre') || 'Producto';
  const precio = parseInt(btn.getAttribute('data-precio') || '0', 10);

  // Pide cantidad (misma UX; si cancelan o es inválida, usamos 1)
  let qty = 1;
  try {
    const ans = prompt(`¿Cuántas unidades de "${nombre}" quieres agregar?`, "1");
    if (ans !== null) qty = parseInt(ans, 10);
  } catch(_) {}
  if (Number.isNaN(qty) || qty <= 0) qty = 1;

  // --- NUEVO: acumular en localStorage para que se guarden varios ---
  const key = 'carrito_sekai';
  const raw = localStorage.getItem(key);
  const cart = raw ? JSON.parse(raw) : [];
  const i = cart.findIndex(x => x.id === id);
  if (i === -1) cart.push({ id, nombre, precio, qty });
  else cart[i].qty += qty;
  localStorage.setItem(key, JSON.stringify(cart));
  // -----------------------------------------------------------------

  // 1) Cambiar aspecto del botón (sin mover clases)
  btn.classList.remove('btn-primary');
  btn.classList.add('btn-success', 'disabled');
  btn.setAttribute('aria-disabled', 'true');
  btn.textContent = 'Agregado ✔';

  // 2) Mostrar cuadrito con link (ahora puede ir sin querystring)
  const contenedor = btn.closest('.card-body') || btn.parentElement;
  if (contenedor && !contenedor.querySelector('.added-alert')) {
    const box = document.createElement('div');
    box.className = 'added-alert alert alert-success mt-2 py-2 px-3';
    box.innerHTML = `
      <div class="d-flex align-items-center justify-content-between">
        <span class="me-3">Agregado al carrito</span>
        <a href="carro.html" class="btn btn-sm btn-outline-success">Ir al carrito</a>
      </div>`;
    contenedor.appendChild(box);
  }
});
