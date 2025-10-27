import React from "react";
import { Link } from "react-router-dom";
import { CLP } from "../utils/currency";



export default function ProductCard({ product, onAdd }) {
  const p = product ?? {};
  const id = p.id;
  const title = p.title || p.titulo || "Manga";
  const price = Number(p.price || p.precio) || 0;
  const image = p.image || p.img || "/assets/img/placeholder_cover.png";
  const to = id ? `/producto/${id}` : "#";

  const add = () => {
    if (!id) return;
    const payload = { id, title, price, image, qty: 1 };
    if (onAdd) onAdd(payload); 
  };

  return (
    <div className="card h-100">
      
      <Link to={to} className="text-decoration-none text-reset">
        <img
          src={image}
          alt={title}
          className="card-img-top"
          style={{ aspectRatio: "3 / 4", objectFit: "cover" }}
          onError={(e)=>{ e.currentTarget.src="/assets/img/placeholder_cover.png"; }}
        />
      </Link>

      <div className="card-body d-flex flex-column">
        <Link to={to} className="text-decoration-none text-reset">
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
