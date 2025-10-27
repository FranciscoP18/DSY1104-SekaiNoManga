import React from "react";

export default function Footer() {
  return (
    <footer className="mt-auto py-4">
      <div className="container text-center text-muted small">
        <div className="row g-3">
          <div className="col-12 col-md-4">
            <strong>Sekai no Manga</strong>
            <p className="text-muted mb-0 small">Tienda de manga y novelas ligeras</p>
          </div>
          <div className="col-6 col-md-4">
            <div className="small text-muted">CONTACTO</div>
            <ul className="list-unstyled small mb-0">
              <li><a className="text-reset text-decoration-none" href="https://www.instagram.com/">Instagram</a></li>
              <li><a className="text-reset text-decoration-none" href="https://www.tiktok.com/">tiktok</a></li>
              <li><a className="text-reset text-decoration-none" href="https://www.whatsapp.com/">whatsapp</a></li>
            </ul>
          </div>
          <div className="col-6 col-md-4">
            <div className="small text-muted">SOPORTE</div>
            <ul className="list-unstyled small mb-0">
              <li><a className="text-reset text-decoration-none" href="/terminos">Términos</a></li>
              <li><a className="text-reset text-decoration-none" href="/quienes">Quiénes somos</a></li>
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
