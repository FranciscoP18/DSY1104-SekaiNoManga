import { useCart } from "../context/CartContext";
import { CLP } from "../utils/currency.js";

export default function CartTable() {
  const { state, dispatch } = useCart();
  if (!state.items.length) return <p className="text-muted">Tu carrito está vacío.</p>;

  return (
    <div className="table-responsive">
      <table className="table align-middle">
        <thead>
          <tr>
            <th>Producto</th><th>Precio</th><th style={{width:120}}>Cantidad</th><th>Subtotal</th><th></th>
          </tr>
        </thead>
        <tbody>
          {state.items.map(it => (
            <tr key={it.id}>
              <td>
                <div className="d-flex align-items-center gap-2">
                  <img src={it.image} alt={it.title} width="48" height="48" />
                  <span>{it.title}</span>
                </div>
              </td>
              <td>{CLP.format(it.price)}</td>
              <td>
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  value={it.qty}
                  onChange={e => dispatch({ type: "SET_QTY", payload: { id: it.id, qty: e.target.value } })}
                />
              </td>
              <td>{CLP.format(it.price * it.qty)}</td>
              <td className="text-end">
                <button className="btn btn-outline-danger btn-sm"
                  onClick={() => dispatch({ type: "REMOVE_ITEM", payload: { id: it.id } })}>
                  Quitar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
