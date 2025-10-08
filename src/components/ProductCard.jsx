import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CLP } from "../utils/currency";

export default function ProductCard({ product, onAdd }) {
  const { dispatch } = useCart();
  const p = product ?? {};
  const id = p.id;                          // id debe existir en mangas.json
  const title = p.title || p.titulo || "Manga";
  const price = Number(p.price || p.precio) || 0;
  const image = p.image || p.img || "/assets/img/placeholder_cover.png";
  const to = id ? `/producto/${id}` : "#";

  const add = () => {
    if (!id) return;
    dispatch({ type: "ADD_ITEM", payload: { id, title, price, image, qty: 1 } });
    onAdd?.(p);
  };

  return (
    <div className="card h-100">
      {/* Click a portada → detalle */}
      <Link to={to} className="text-decoration-none">
        <img
          src={image}
          alt={title}
          className="card-img-top"
          onError={(e)=>{ e.currentTarget.src="/assets/img/placeholder_cover.png"; }}
          loading="lazy" decoding="async" referrerPolicy="no-referrer"
        />
      </Link>

      <div className="card-body d-flex flex-column">
        {/* Click al título → detalle */}
        <Link to={to} className="text-decoration-none text-body">
          <h6 className="card-title">{title}</h6>
        </Link>

        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center">
            <span className="price">{CLP.format(price)}</span>
          </div>
          <button className="btn btn-primary w-100 mt-2" onClick={add}>
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}