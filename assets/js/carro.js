// ================== Compra simple sin almacenamiento ==================
// - La tabla (#tbody-productos) es la fuente de verdad.
// - Aplica envío, cupones, eliminar y cambios de cantidad.
// - No persiste entre recargas (sin localStorage).
// - Sin “helpers” (sólo agregarFila y calcularTotales).
// =====================================================================

var CLPFormatter = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' });
var CUPON = ''
var cuponAplicado = ''; 
var envioCLP = 0;

// Añadir una fila a la tabla (similar a addElement de tu ejemplo)
function agregarFila(nombre, precio, qty) {
  if (!nombre) { alert('Nombre de producto vacío.'); return; }
  if (isNaN(precio) || precio <= 0) { alert('Precio inválido.'); return; }
  if (isNaN(qty) || qty <= 0) { alert('Cantidad inválida.'); return; }

  var tbody = document.getElementById('tbody-productos');
  var row = tbody.insertRow(-1);

  // c0: Producto
  var c0 = row.insertCell(0);
  c0.innerText = nombre;

  // c1: Cantidad (input)
  var c1 = row.insertCell(1);
  var inp = document.createElement('input');
  inp.type = 'number';
  inp.min = '0';
  inp.value = String(qty);
  inp.className = 'qty';
  c1.appendChild(inp);

  // c2: Precio unitario
  var c2 = row.insertCell(2);
  c2.innerText = CLPFormatter.format(precio);

  // c3: Subtotal
  var c3 = row.insertCell(3);
  c3.className = 'subtotal';
  c3.innerText = CLPFormatter.format(precio * qty);

  // c4: Eliminar
  var c4 = row.insertCell(4);
  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn btn-sm btn-outline-danger';
  btn.innerText = 'Eliminar';
  c4.appendChild(btn);

  // Cambios de cantidad (validación estilo "if + alert")
  inp.oninput = function () {
    if (this.value === '') { alert('Ingrese cantidad'); this.value = '0'; }
    if (isNaN(this.value)) { alert('Cantidad inválida'); this.value = '0'; }
    var v = parseInt(this.value, 10);
    if (v < 0) { alert('Cantidad no puede ser negativa'); this.value = '0'; }

    // Subtotal de la fila (parsear CLP sin helper)
    var precioTxt = row.cells[2].innerText;
    var precioNum = parseInt(String(precioTxt).replace(/[^\d]/g, ''), 10);
    if (isNaN(precioNum)) precioNum = 0;
    row.cells[3].innerText = CLPFormatter.format(precioNum * parseInt(this.value || '0', 10));

    calcularTotales();
  };

  // Eliminar fila
  btn.onclick = function () {
    var r = this.parentNode.parentNode;
    r.parentNode.removeChild(r);
    calcularTotales();
  };

  calcularTotales();
}

// Recalcular totales (recorre la tabla como tu "calculaPromedio")
function calcularTotales() {
  var tbody = document.getElementById('tbody-productos');
  var filas = tbody.rows;
  var subtotal = 0;

  for (var i = 0; i < filas.length; i++) {
    var tr = filas[i];

    // Precio unitario: parsear CLP sin helper
    var precioTxt = tr.cells[2].innerText;
    var precioNum = parseInt(String(precioTxt).replace(/[^\d]/g, ''), 10);
    if (isNaN(precioNum)) precioNum = 0;

    // Cantidad
    var qtyInp = tr.cells[1].getElementsByTagName('input')[0];
    var qty = parseInt(qtyInp && qtyInp.value ? qtyInp.value : '0', 10);
    if (isNaN(qty) || qty < 0) qty = 0;

    // Subtotal por fila y acumulador
    tr.cells[3].innerText = CLPFormatter.format(precioNum * qty);
    subtotal += precioNum * qty;
  }

  // Descuento por cupón
  var pct = cuponAplicado && CUPON[cuponAplicado] ? CUPON[cuponAplicado] : 0;
  var descuento = Math.round(subtotal * pct);

  // Total
  var total = Math.max(0, subtotal + envioCLP - descuento);

  document.getElementById('lblSubtotal').innerText  = CLPFormatter.format(subtotal);
  document.getElementById('lblEnvio').innerText     = CLPFormatter.format(envioCLP);
  document.getElementById('lblDescuento').innerText = '-' + CLPFormatter.format(descuento);
  document.getElementById('lblTotal').innerText     = CLPFormatter.format(total);
}

// ========= Botones (en línea, sin funciones auxiliares) =========
var btnEnvio = document.getElementById('btnEnvio');
if (btnEnvio) {
  btnEnvio.onclick = function () {
    var regionEl = document.getElementById('region');
    var comunaEl = document.getElementById('comuna');
    var region = regionEl ? regionEl.value : '';
    var comuna = comunaEl ? comunaEl.value : '';

    // Lógica de costo de envío aquí mismo (sin helper)
    if (region === 'Aysén') envioCLP = 8000;
    else if (region === 'Valparaíso') envioCLP = 5000;
    else if (region === 'Region_metropolitana') envioCLP = (comuna === 'periferia' ? 4000 : 3000);
    else envioCLP = 6000;

    var box = document.getElementById('envioMensaje');
    if (box) box.innerText = 'Envío estimado calculado: ' + CLPFormatter.format(envioCLP);
    calcularTotales();
  };
}

var btnCupon = document.getElementById('btnCupon');
if (btnCupon) {
  btnCupon.onclick = function () {
    var inp = document.getElementById('cupon');
    var code = inp && inp.value ? inp.value.trim().toUpperCase() : '';
    var box = document.getElementById('cuponMensaje');

    if (!code) {
      cuponAplicado = '';
      if (box) box.innerText = 'Cupón borrado.';
    } else if (!CUPON[code]) {
      cuponAplicado = '';
      if (box) box.innerText = 'Cupón inválido.';
    } else {
      cuponAplicado = code;
      if (box) box.innerText = 'Cupón aplicado: ' + code + ' (' + (CUPON[code] * 100) + '%)';
    }
    calcularTotales();
  };
}

var btnPagar = document.getElementById('btnPagar');
if (btnPagar) {
  btnPagar.onclick = function () {
    var totalTxt = (document.getElementById('lblTotal') || {}).innerText || '$0';
    alert('Pago simulado.\nTotal a pagar: ' + totalTxt);
  };
}
agregarFila('DanDaDan 1', 12000, 1);
agregarFila('One Piece: Las Recetas de Sanji', 20000, 2);
