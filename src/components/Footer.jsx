import React from "react";

export default function Footer() {
  return (
    <footer className="mt-auto py-4">
      <div className="container text-center text-muted small">
        <div className="row g-3">
          <div className="col-12 col-md-4">
            <strong>Sekai no Manga</strong>
            <p className="text-muted mb-0 small">Tienda de manga y novelas ligeras. Proyecto migrado a React.</p>
          </div>
          <div className="col-6 col-md-4">
            <div className="small text-muted">LINKS</div>
            <ul className="list-unstyled small mb-0">
              <li><a className="text-reset text-decoration-none" href="/catalogo">Catálogo</a></li>
              <li><a className="text-reset text-decoration-none" href="/ofertas">Ofertas</a></li>
              <li><a className="text-reset text-decoration-none" href="/quienes">Quiénes somos</a></li>
            </ul>
          </div>
          <div className="col-6 col-md-4">
            <div className="small text-muted">SOPORTE</div>
            <ul className="list-unstyled small mb-0">
              <li><a className="text-reset text-decoration-none" href="/terminos">Términos</a></li>
              <li><a className="text-reset text-decoration-none" href="/envios">Envíos</a></li>
              <li><a className="text-reset text-decoration-none" href="/cambios">Cambios y devoluciones</a></li>
            </ul>
          </div>
        </div>

        <div className="text-center small text-muted mt-3">
          © {new Date().getFullYear()} Sekai no Manga — Todos los derechos reservados
        </div>
      </div>
    </footer>
  );
}
