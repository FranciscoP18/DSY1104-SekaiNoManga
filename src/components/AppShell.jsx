import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "./TopBar.jsx";
import Footer from "./Footer.jsx";

export default function AppShell() {
  return (
    <div className="d-flex flex-column min-vh-100"> 
      
      {/* 1. BANNERS */}
      <div className="banner-envio">
        <h1 className="texto-animado">🛻 ¡ENVÍO A TODO CHILE! 🛻</h1>
      </div>

      <div className="banner-logo py-2">
        <img src="/assets/img/logo_tienda.png" alt="Sekai no Manga" height="100" />
      </div>

      {/* 2. HEADER/NAV */}
      <TopBar />

      {/* 3. CONTENIDO PRINCIPAL (Ocupa el espacio restante) */}
      <main className="flex-fill"> 
        <Outlet />
      </main>

      {/* 4. FOOTER (Pegado al final) */}
      <Footer />
    </div>
  );
}