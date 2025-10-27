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
       <div className="col-6 col-md-4 text-center">
          <div className="small text-muted">CONTACTO</div>
          <ul className="list-unstyled small mb-0 d-inline-flex gap-3 align-items-center">
            <li>
              <a className="text-reset text-decoration-none" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="bi bi-instagram fs-5" />
                <span className="visually-hidden">Instagram</span>
              </a>
            </li>
            <li>
              <a className="text-reset text-decoration-none" href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <i className="bi bi-tiktok fs-5" />
                <span className="visually-hidden">TikTok</span>
              </a>
            </li>
            <li>
              <a className="text-reset text-decoration-none" href="https://www.whatsapp.com/" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <i className="bi bi-whatsapp fs-5" />
                <span className="visually-hidden">WhatsApp</span>
              </a>
            </li>
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
