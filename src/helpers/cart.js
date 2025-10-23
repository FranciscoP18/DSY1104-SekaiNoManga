import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";

export function SeedCart({ items = [], children }) {
  const { dispatch } = useCart();
  useEffect(() => {
    items.forEach(it => dispatch({ type: "ADD_ITEM", payload: it }));
  }, [dispatch, items]);
  return children || null;
}

export function waitMicrotasks() {
  return new Promise(r => setTimeout(r, 0));
}
