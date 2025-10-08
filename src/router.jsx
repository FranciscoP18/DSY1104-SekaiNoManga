import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AppShell from "./components/AppShell.jsx";
import Home from "./pages/Home.jsx";
import Catalogo from "./pages/Catalogo.jsx";
import Ofertas from "./pages/Ofertas.jsx";
import Vendidos from "./pages/Vendidos.jsx";
import Producto from "./pages/Producto.jsx";
import Quienes from "./pages/Quienes.jsx";
import Terminos from "./pages/Terminos.jsx";
import Carro from "./pages/Carro.jsx";
import Usuario from "./pages/Usuario.jsx";

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/catalogo", element: <Catalogo /> },
      { path: "/ofertas", element: <Ofertas /> },
      { path: "/vendidos", element: <Vendidos /> },
      { path: "/producto/:id", element: <Producto /> },
      { path: "/quienes", element: <Quienes /> },
      { path: "/terminos", element: <Terminos /> },
      { path: "/carro", element: <Carro /> },
      { path: "/usuario", element: <Usuario /> },
    ],
  },
]);
