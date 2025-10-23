import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CartProvider } from "../context/CartContext";

export function renderWithRouter(ui, { route = "/" } = {}) {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
}

export function renderWithCart(ui, { route = "/" } = {}) {
  return render(
    <CartProvider>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </CartProvider>
  );
}
