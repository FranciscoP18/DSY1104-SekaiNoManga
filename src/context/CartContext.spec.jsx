import React, { useEffect } from "react";
import { render, screen } from "@testing-library/react";
import { CartProvider, useCart } from "./CartContext";

function Scenario() {
  const { dispatch, subtotal, discount, total, state } = useCart();
  useEffect(() => {
    dispatch({ type: "ADD_ITEM", payload: { id: 1, title: "A", price: 1000, qty: 2 } }); // 2000
    dispatch({ type: "ADD_ITEM", payload: { id: 2, title: "B", price: 500, qty: 1 } });   // 500
    dispatch({ type: "APPLY_COUPON", payload: { code: "SEKAI15", pct: 0.15 } });          // 375
    dispatch({ type: "SET_SHIPPING", payload: { region: "Region_metropolitana", cost: 3000 } });
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

describe("CartContext", () => {
  it("calcula subtotal/discount/total correctamente", async () => {
    render(<CartProvider><Scenario /></CartProvider>);
    await new Promise(r => setTimeout(r, 0));
    expect(Number(screen.getByTestId("subtotal").textContent)).toBe(2500);
    expect(Number(screen.getByTestId("discount").textContent)).toBeCloseTo(375);
    expect(Number(screen.getByTestId("shipping").textContent)).toBe(3000);
    expect(Number(screen.getByTestId("total").textContent)).toBe(5125);
  });
});
