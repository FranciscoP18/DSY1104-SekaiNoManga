import React from "react";
import ProductCard from "./ProductCard.jsx";

export default function ProductGrid({ items = [], onAdd }) {
  return (
    <div className="catalog-grid">
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xxl-5 g-3">
        {items.map((p) => (
          <div className="col" key={p.id}>
            <ProductCard product={p} onAdd={onAdd} />
          </div>
        ))}
      </div>
    </div>
  );
}
