import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "./TopBar.jsx";
import Footer from "./Footer.jsx";

export default function AppShell() {
  return (
    <>
      {/* Banners */}
      <div className="banner-envio">
        <h1 className="texto-animado">🛻 ¡ENVÍO A TODO CHILE! 🛻</h1>
      </div>
      <div className="banner-logo py-2">
        <img src="/assets/img/logo_tienda.png" alt="Sekai no Manga" height="100" />
      </div>

      {/* Nav/Header */}
      <TopBar />

      {/* Contenido de cada página */}
      <main>
        <Outlet />
      </main>

      {/* Footer único */}
      <Footer />
    </>
  );
}
