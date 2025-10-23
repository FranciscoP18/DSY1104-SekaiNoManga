import { createContext, useContext, useEffect, useReducer } from "react";
import { cartReducer, initialCart } from "./cartReducer";

const CartCtx = createContext();

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(
    cartReducer,
    undefined,
    () => {
      try {
        const raw = localStorage.getItem("sekai_cart_v1");
        return raw ? JSON.parse(raw) : initialCart;
      } catch {
        return initialCart;
      }
    }
  );

  useEffect(() => {
    localStorage.setItem("sekai_cart_v1", JSON.stringify(state));
  }, [state]);

  const subtotal = state.items.reduce((acc, it) => acc + it.price * it.qty, 0);
  const discount = state.coupon?.pct ? Math.round(subtotal * state.coupon.pct) : 0;
  const total = Math.max(0, subtotal + (state.shipping?.cost || 0) - discount);

  return (
    <CartCtx.Provider value={{ state, dispatch, subtotal, discount, total }}>
      {children}
    </CartCtx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
