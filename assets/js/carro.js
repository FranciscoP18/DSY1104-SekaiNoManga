let productos = [];

const cupones = { 'LANZAMIENTO10': 0.10, 'SEKAI15': 0.15 };

let envioCLP = 0;
let descuentoCLP = 0;
let cuponAplicado = '';

const CLPFormatter = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' });

// --- NUEVO: storage simple ---
const CART_KEY = 'carrito_sekai';
function loadCartFromStorage() {
  try {
    const arr = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    for (const it of arr) {
      upsertProducto(it.id, it.nombre || 'Producto', Number(it.precio) || 0, Number(it.qty) || 0);
    }
  } catch { /* noop */ }
}
function saveCartToStorage() {
  const arr = productos
    .filter(p => (p.qty || 0) > 0)
    .map(p => ({ id: p.id, nombre: p.nombre, precio: p.precio, qty: p.qty }));
  localStorage.setItem(CART_KEY, JSON.stringify(arr));
}
// -----------------------------

function upsertProducto(id, nombre, precio, qty) {
  const i = productos.findIndex(p => p.id === id);
  if (i >= 0) {
    productos[i].nombre = nombre || productos[i].nombre;
    productos[i].precio = precio || productos[i].precio;
    productos[i].qty = (productos[i].qty || 0) + qty;
  } else {
    productos.push({ id, nombre, precio, qty });
  }
}

// Compatibilidad con tu querystring (por si aún llegas con ?id=...):
(function initFromQuery() {
  const qs = new URLSearchParams(window.location.search);
  const id = qs.get('id');
  const nombre = qs.get('nombre');
  const precio = parseInt(qs.get('precio') || '0', 10);
  const qty = parseInt(qs.get('qty') || '0', 10);

  if (id && qty > 0) {
    upsertProducto(id, nombre || 'Producto', precio > 0 ? precio : 0, qty);
    saveCartToStorage(); // <-- NUEVO: si vino por query, lo persistimos también
    // history.replaceState({}, '', location.pathname); // opcional
  }
})();

function costoEnvio(region, comuna) {
  if (region === 'Aysén') return 8000;
  if (region === 'Valparaíso') return 5000;
  if (region === 'Region_metropolitana') return (comuna === 'periferia' ? 4000 : 3000);
  return 6000;
}

function renderTabla() {
  const tbody = document.getElementById('tbody-productos');
  tbody.innerHTML = productos.map(p => `
    <tr data-id="${p.id}">
      <td>${p.nombre}</td>
      <td><input type="number" min="0" value="${p.qty}" data-id="${p.id}" class="qty"></td>
      <td>${CLPFormatter.format(p.precio)}</td>
      <td class="subtotal" data-id="${p.id}">${CLPFormatter.format(p.precio * p.qty)}</td>
      <td><button class="btn-remove" data-id="${p.id}">Eliminar</button></td>
    </tr>
  `).join('');

  document.querySelectorAll('.qty').forEach(function(inp){
    inp.addEventListener('input', function(){
      const id  = this.getAttribute('data-id');
      const prod = productos.find(function(x){ return x.id === id; });
      const val  = parseInt(this.value || '0', 10);
      prod.qty   = Math.max(0, val);
      const celda = document.querySelector('.subtotal[data-id="'+id+'"]');
      celda.textContent = CLPFormatter.format(prod.precio * prod.qty);
      saveCartToStorage(); // <-- NUEVO
      recalc();
    });
  });

  document.querySelectorAll('.btn-remove').forEach(function(btn){
    btn.addEventListener('click', function(){
      const id = this.getAttribute('data-id');
      productos = productos.filter(function(p){ return p.id !== id; });
      saveCartToStorage(); // <-- NUEVO
      renderTabla();
      recalc();
    });
  });
}

function subtotalCarrito() {
  return productos.reduce(function(acc, p){ return acc + (p.precio * p.qty); }, 0);
}

function recalc() {
  const subtotal = subtotalCarrito();
  const pct = (cuponAplicado && cupones[cuponAplicado]) ? cupones[cuponAplicado] : 0;
  descuentoCLP = Math.round(subtotal * pct);
  const total = subtotal + envioCLP - descuentoCLP;

  document.getElementById('lblSubtotal').textContent  = CLPFormatter.format(subtotal);
  document.getElementById('lblEnvio').textContent     = CLPFormatter.format(envioCLP);
  document.getElementById('lblDescuento').textContent = '-' + CLPFormatter.format(descuentoCLP);
  document.getElementById('lblTotal').textContent     = CLPFormatter.format(Math.max(0, total));
}

document.getElementById('btnEnvio').addEventListener('click', function(){
  const region = document.getElementById('region').value;
  const comuna = document.getElementById('comuna').value;
  envioCLP = costoEnvio(region, comuna);
  document.getElementById('envioMensaje').textContent = 'Envío estimado calculado: ' + CLPFormatter.format(envioCLP);
  recalc();
});

document.getElementById('btnCupon').addEventListener('click', function(){
  const code = document.getElementById('cupon').value.trim().toUpperCase();
  if (!code) {
    cuponAplicado = '';
    document.getElementById('cuponMensaje').textContent = 'Cupón borrado.';
  } else if (!cupones[code]) {
    cuponAplicado = '';
    document.getElementById('cuponMensaje').textContent = 'Cupón inválido.';
  } else {
    cuponAplicado = code;
    document.getElementById('cuponMensaje').textContent =
      'Cupón aplicado: ' + code + ' (' + (cupones[code] * 100) + '%)';
  }
  recalc();
});

document.getElementById('btnPagar').addEventListener('click', function(){
  alert('Pago simulado.\nTotal a pagar: ' + document.getElementById('lblTotal').textContent);
});

// --- Inicialización ---
// 1) Cargar todo lo que haya en localStorage (NUEVO)
loadCartFromStorage();

// 2) Pintar y calcular
renderTabla();
recalc();
