document.addEventListener('DOMContentLoaded', () => {
  const $ = (id) => document.getElementById(id);
  const fmt = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' });

  // === 1) Catálogo 
  const PRODUCTS = [
    {
      id: 'dandadan1',
      serie: 'DanDaDan',
      volumen: 1,
      titulo: 'DanDaDan Volumen 1 ',
      editorial: 'IVREA',
      precio: 12000,
      img: 'https://images.cdn3.buscalibre.com/fit-in/360x360/24/67/2467b765276184f142d032247eefd135.jpg',
      desc: 'Ken Takakura es un fanático de la ufología; pero no cree en fantasmas. Por su parte; Momo Ayase; su compañera de clases; no cree en alienígenas; pero sí en fantasmas. Para decidir quién tiene razón; hacen una apuesta: cada uno tiene que visitar por su cuenta un lugar asociado con fantasmas o aliens. Sin embargo; resulta que ¡Ambos estaban en lo correcto! ¡Los aliens y los fantasmas existen! ¿Cómo pueden volver a sus vidas normales después de esto?'
    },
    {
      id: 'dandadan2',
      serie: 'DanDaDan',
      volumen: 2,
      titulo: 'Volumen 2',
      editorial: 'IVREA',
      precio: 12000,
      img: 'https://images.cdn1.buscalibre.com/fit-in/360x360/53/fe/53fe290ddec10360ae17dacf1d341a14.jpg',
      desc: 'Ken Takakura es un fanático de la ufología; pero no cree en fantasmas. Por su parte; Momo Ayase; su compañera de clases; no cree en alienígenas; pero sí en fantasmas. Para decidir quién tiene razón; hacen una apuesta: cada uno tiene que visitar por su cuenta un lugar asociado con fantasmas o aliens. Sin embargo; resulta que ¡Ambos estaban en lo correcto! ¡Los aliens y los fantasmas existen! ¿Cómo pueden volver a sus vidas normales después de esto?'
    },
    {
      id: 'dandadan3',
      serie: 'DanDaDan',
      volumen: 3,
      titulo: 'Volumen 3',
      editorial: 'IVREA',
      precio: 12000,
      img: 'https://images.cdn3.buscalibre.com/fit-in/360x360/50/5a/505afa5847c3ad9837b0e7a33d57b908.jpg',
      desc: 'Ken Takakura es un fanático de la ufología; pero no cree en fantasmas. Por su parte; Momo Ayase; su compañera de clases; no cree en alienígenas; pero sí en fantasmas. Para decidir quién tiene razón; hacen una apuesta: cada uno tiene que visitar por su cuenta un lugar asociado con fantasmas o aliens. Sin embargo; resulta que ¡Ambos estaban en lo correcto! ¡Los aliens y los fantasmas existen! ¿Cómo pueden volver a sus vidas normales después de esto?'
    },
    {
      id: 'onepiece1',
      serie: 'One Piece',
      volumen: 1,
      titulo: 'One Piece 01',
      editorial: 'IVREA',
      precio: 14500,
      img: 'https://images.cdn1.buscalibre.com/fit-in/360x360/71/55/71553b3c259caf6cbb510b7eb001e632.jpg',
      desc: 'Luffy inicia su aventura para convertirse en el Rey de los Piratas.'
    },
    {
      id: 'onepiece2',
      serie: 'One Piece',
      volumen: 2,
      titulo: 'One Piece 02',
      editorial: 'IVREA',
      precio: 14500,
      img: 'https://images.cdn3.buscalibre.com/fit-in/360x360/5f/45/5f4562241b6e81aaf5dc0419c22e1058.jpg',
      desc: 'La tripulación se enfrenta a nuevos retos y enemigos.'
    },
    {
      id: 'onepiecesanji',
      serie: 'One Piece',
      volumen: 0,
      titulo: 'One Piece: Las Recetas de Sanji',
      editorial: 'IVREA',
      precio: 30000,
      img: 'https://images.cdn2.buscalibre.com/fit-in/360x360/7a/a7/7aa787eee3737e39b6de4a6eee0ffe29.jpg',
      desc: 'Recetario oficial inspirado en One Piece, por el chef de los Sombrero de Paja.'
    }
  ];

  // Índices útiles
  const BY_ID = Object.fromEntries(PRODUCTS.map(p => [p.id, p]));
  const BY_SERIE = PRODUCTS.reduce((acc, p) => {
    (acc[p.serie] ??= []).push(p);
    return acc;
  }, {});

  // === 2) Leer ?id=... y buscar producto ===
  const id = new URLSearchParams(location.search).get('id');
  if (!id) {
    document.body.insertAdjacentHTML('beforeend',
      '<div class="alert alert-danger mt-3">Producto no especificado.</div>');
    return;
  }
  const p = BY_ID[id];
  if (!p) {
    document.body.insertAdjacentHTML('beforeend',
      '<div class="alert alert-warning mt-3">Producto no encontrado.</div>');
    return;
  }

  // === 3) Pintar detalle ===
  $('p-img').src = p.img;
  $('p-img').alt = p.titulo;
  $('p-titulo').textContent = p.titulo;
  $('p-editorial').textContent = p.editorial || '';
  $('p-precio').textContent = fmt.format(p.precio);
  $('p-desc').textContent = p.desc || '';
  $('serieName').textContent = p.serie;

  // === 4) Recomendados (misma serie, otros volúmenes) ===
  const recs = (BY_SERIE[p.serie] || [])
    .filter(x => x.id !== p.id)
    .sort((a, b) => (a.volumen || 0) - (b.volumen || 0))
    .slice(0, 10);

  const recsHTML = recs.map(r => `
    <div class="col">
      <div class="card h-100 position-relative">
        <img src="${r.img}" class="card-img-top" alt="${r.titulo}">
        <div class="card-body">
          <p class="text-muted small mb-1">${r.editorial || ''}</p>
          <h6 class="card-title mb-1">${r.titulo}</h6>
          <div class="small mb-2">${fmt.format(r.precio)}</div>
          <a href="producto.html?id=${encodeURIComponent(r.id)}"
             class="btn btn-outline-dark btn-sm w-100" role="button">VER</a>
        </div>
        <a href="producto.html?id=${encodeURIComponent(r.id)}"
           class="stretched-link" aria-label="Ver ${r.titulo}"></a>
      </div>
    </div>
  `).join('');
  $('recs').innerHTML = recsHTML;

  // === 5) Añadir al carrito (manteniendo tu flujo actual por querystring) ===
  // Tip: si luego migras a localStorage/API, solo cambias este bloque.
  $('btnAdd').addEventListener('click', () => {
    const params = new URLSearchParams({
      id: p.id,
      nombre: p.titulo,
      precio: String(p.precio),
      qty: '1'
    });
    location.href = `carro.html?${params.toString()}`;
  });
});
