import React, { useEffect } from "react";
import { render, screen } from "@testing-library/react";
import { CartProvider, useCart } from "./CartContext";

function Scenario() {
  const { dispatch, subtotal, discount, total, state } = useCart();
  useEffect(() => {
    dispatch({ type: "ADD_ITEM", payload: { id: 1, title: "A", price: 1000, qty: 2 } });
    dispatch({ type: "SET_SHIPPING", payload: { region: null, cost: 0 } });
  }, [dispatch]);
  return (
    <>
      <div data-testid="subtotal">{subtotal}</div>
      <div data-testid="discount">{discount}</div>
      <div data-testid="shipping">{state.shipping?.cost ?? 0}</div>
      <div data-testid="total">{total}</div>
    </>
  );
}

describe("CartContext - sin cupón/ni envío", () => {
  it("total = subtotal", async () => {
    render(<CartProvider><Scenario /></CartProvider>);
    await new Promise(r => setTimeout(r, 0));
    expect(+screen.getByTestId("subtotal").textContent).toBe(2000);
    expect(+screen.getByTestId("discount").textContent).toBe(0);
    expect(+screen.getByTestId("shipping").textContent).toBe(0);
    expect(+screen.getByTestId("total").textContent).toBe(2000);
  });
});
