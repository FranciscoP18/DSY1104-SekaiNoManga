import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import CartTable from "./CartTable";
import { renderWithCart } from "../helpers/render";
import { SeedCart, waitMicrotasks } from "../helpers/cart";
import { anyMoneyTextPresent } from "../helpers/dom";

describe("CartTable", () => {
  it("vacío", () => {
    renderWithCart(<CartTable />);
    expect(screen.getByText(/Tu carrito está vacío/i)).toBeTruthy();
  });

  it("con ítems y subtotales", async () => {
    renderWithCart(
      <SeedCart items={[
        { id: 1, title: "A", price: 1000, qty: 1 },
        { id: 2, title: "B", price: 2000, qty: 2 },
      ]}>
        <CartTable />
      </SeedCart>
    );
    await waitMicrotasks();
    expect(screen.getByText("A")).toBeTruthy();
    expect(screen.getByText("B")).toBeTruthy();
    expect(anyMoneyTextPresent()).toBeTrue();
  });

  it("cambiar cantidad y quitar", async () => {
    renderWithCart(
      <SeedCart items={[{ id: 10, title: "One Piece", price: 3000, qty: 1 }]}>
        <CartTable />
      </SeedCart>
    );
    await waitMicrotasks();
    const input = screen.getByDisplayValue("1");
    fireEvent.change(input, { target: { value: "3" } });
    expect(anyMoneyTextPresent()).toBeTrue();
    fireEvent.change(input, { target: { value: "0" } });
    expect(screen.getByText(/Tu carrito está vacío/i)).toBeTruthy();
  });
});
