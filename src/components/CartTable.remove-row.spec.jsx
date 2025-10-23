import React from "react";
import { screen, fireEvent, within, waitFor } from "@testing-library/react";
import CartTable from "./CartTable";
import { renderWithCart } from "../helpers/render";
import { SeedCart } from "../helpers/cart";

describe("CartTable - quitar filas", () => {
  it("con varios ítems: 'Quitar' remueve una fila", async () => {
    renderWithCart(
      <SeedCart items={[
        { id: 1, title: "A", price: 1000, qty: 5 },
        { id: 2, title: "B", price: 500,  qty: 3 },
        { id: 3, title: "One Piece", price: 3000, qty: 1 },
      ]}>
        <CartTable />
      </SeedCart>
    );

    const tbody = screen.getByRole("rowgroup");
    const rowsBefore = within(tbody).getAllByRole("row").length;

    const removeBtns = screen.getAllByRole("button", { name: /Quitar/i });
    fireEvent.click(removeBtns[0]);

    await waitFor(() => {
      const rowsAfter = within(tbody).getAllByRole("row").length;
      expect(rowsAfter).toBe(rowsBefore - 1);
    });
  });
});
