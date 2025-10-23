import React from "react";
import { screen, fireEvent, within, waitFor } from "@testing-library/react";
import CartTable from "./CartTable";
import { renderWithCart } from "../helpers/render";
import { SeedCart } from "../helpers/cart";

describe("CartTable - limpiar carrito", () => {
  it("con 1 ítem: al poner cantidad 0 muestra 'Tu carrito está vacío'", async () => {
    renderWithCart(
      <SeedCart items={[{ id: 10, title: "One Piece", price: 3000, qty: 1 }]}>
        <CartTable />
      </SeedCart>
    );
    const tbody = screen.getByRole("rowgroup");
    const row = within(tbody).getAllByRole("row")[0];
    const qtyInput = within(row).getByRole("spinbutton");

    fireEvent.change(qtyInput, { target: { value: "0" } });

    await waitFor(() => {
      expect(screen.getByText(/Tu carrito está vacío/i)).toBeTruthy();
    });
  });
});
