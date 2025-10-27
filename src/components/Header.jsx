import React from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();


  const hideBanners =
    pathname.startsWith("/carro") ||
    pathname.startsWith("/usuario") ||
    pathname.startsWith("/producto/");

  return (
    <>
      {!hideBanners && (
        <>
          <div className="banner-envio text-center py-2">
            <h1 className="texto-animado m-0">🛻 ¡ENVÍO A TODO CHILE! 🛻</h1>
          </div>
          <div className="banner-logo text-center">
            <img src="/assets/img/logo_tienda.png" alt="Sekai no Manga" height="120" />
          </div>
        </>
      )}

      <nav className="navbar navbar-expand-lg border-bottom bg-white">
        <div className="container">
          <NavLink className="navbar-brand d-lg-none" to="/">
            <img src="/assets/img/logo_tienda.png" alt="logo" height="24" />
            <span className="ms-2">Sekai no Manga</span>
          </NavLink>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div id="mainNav" className="collapse navbar-collapse justify-content-center">
            <ul className="navbar-nav">
              <li className="nav-item"><NavLink end className="nav-link" to="/">Inicio</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/catalogo">Catálogo</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/ofertas">Ofertas</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/vendidos">¡Más vendidos!</NavLink></li>
            </ul>
          </div>

          <div className="d-flex align-items-center gap-3">
            <NavLink to="/usuario" title="Usuarios"><i className="bi bi-person"></i></NavLink>
            <NavLink to="/carro" title="Carro"><i className="bi bi-cart3"></i></NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}
