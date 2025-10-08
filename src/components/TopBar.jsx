import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function TopBar() {
  const { state } = useCart();
  const count = state.items?.reduce((acc, it) => acc + (Number(it.qty) || 0), 0) ?? 0;

  return (
    <nav className="navbar navbar-expand-lg border-bottom bg-white">
      <div className="container">
        {/* Marca (logo chico + link a inicio) */}
        <Link className="navbar-brand d-lg-none" to="/">
          <img src="/assets/img/logo_tienda.png" alt="Sekai no Manga" height="32" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink end className="nav-link" to="/">Inicio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/catalogo">Catálogo</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/ofertas">Ofertas</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/vendidos">¡Más vendidos!</NavLink>
            </li>
          </ul>

          {/* Acciones: usuario + carro */}
          <div className="d-flex align-items-center gap-3">
            <Link to="/usuario" className="position-relative" title="Usuarios">
              <img src="/assets/img/login-user.png" alt="user" height="20" />
            </Link>

            <Link to="/carro" className="position-relative" title="Ver carro">
              <img src="/assets/img/carrito-de-compras.png" alt="carro" height="20" />
              {count > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: ".65rem" }}
                >
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
