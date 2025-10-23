import { useState } from "react";
import { useCart } from "../context/CartContext";
import { CLP } from "../utils/currency.js";
import { shippingByRegion } from "../utils/shipping";
import { validateCoupon } from "../utils/coupons";
import { useNavigate } from "react-router-dom";

export default function CartSummary() {
  const { state, dispatch, subtotal, discount, total } = useCart();
  const [region, setRegion] = useState(state.shipping.region || "");
  const [code, setCode] = useState(state.coupon?.code || "");
  const navigate = useNavigate();

  const applyRegion = () => {
    const cost = shippingByRegion(region);
    dispatch({ type: "SET_SHIPPING", payload: { region, cost } });
  };

  const applyCoupon = () => {
    const c = validateCoupon(code);
    if (!c) { alert("Cupón inválido"); return; }
    dispatch({ type: "APPLY_COUPON", payload: c });
  };

  const pay = () => {
    if (!state.items.length) return;
    alert("Pago simulado. ¡Gracias por tu compra!");
    dispatch({ type: "CLEAR" });
    navigate("/");
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between mb-1">
          <span>Subtotal</span><strong>{CLP.format(subtotal)}</strong>
        </div>
        <div className="d-flex justify-content-between mb-1">
          <span>Envío</span><strong>{CLP.format(state.shipping.cost || 0)}</strong>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>Descuento</span><strong>-{CLP.format(discount)}</strong>
        </div>
        <hr />
        <div className="d-flex justify-content-between fs-5 mb-3">
          <span>Total</span><strong>{CLP.format(total)}</strong>
        </div>

        <div className="mb-3">
          <label className="form-label">Región</label>
          <div className="input-group">
            <select className="form-select" value={region} onChange={e => setRegion(e.target.value)}>
              <option value="">Selecciona…</option>
              <option>Aysén</option>
              <option>Valparaíso</option>
              <option>Region_metropolitana</option>
              <option>Otra</option>
            </select>
            <button className="btn btn-outline-secondary" onClick={applyRegion}>Aplicar envío</button>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Cupón</label>
          <div className="input-group">
            <input className="form-control" value={code} onChange={e => setCode(e.target.value)} placeholder="SEKAI15" />
            <button className="btn btn-outline-secondary" onClick={applyCoupon}>Aplicar cupón</button>
          </div>
        </div>

        <button className="btn btn-primary w-100" disabled={!state.items.length} onClick={pay}>
          Pagar
        </button>
      </div>
    </div>
  );
}
