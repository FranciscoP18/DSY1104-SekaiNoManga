import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Home() {
  return (
    <section className="py-4">
      <div className="container">
        <div className="p-4 p-md-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-2">
            <h1 className="display-6 fw-bold">Sekai no Manga</h1>
            <p className="col-md-8 fs-6">
              Bienvenido/a a la tienda. Explora el catálogo, descubre ofertas y los más vendidos.
            </p>
            <NavLink className="btn btn-primary btn-lg" to="/catalogo">
              Ver catálogo
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}
