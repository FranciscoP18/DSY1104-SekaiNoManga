import React, { useEffect, useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import ProductGrid from "../components/ProductGrid";
import { loadMangas } from "../services/mangas";
import { useCart } from "../context/CartContext";

export default function Catalogo({ filter }) {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const { dispatch } = useCart();

  useEffect(() => {
    let ok = true;
    (async () => {
      try {
        const { list } = await loadMangas();
        if (ok) setItems(list);
      } catch (e) {
        console.error(e);
      } finally {
        if (ok) setLoading(false);
      }
    })();
    return () => { ok = false; };
  }, []);

  const baseList = useMemo(() => {
    if (filter === "onSale")     return items.filter(p => p.onSale || p.oferta);
    if (filter === "topSelling") return items.filter(p => p.topSelling || p.masVendido);
    return items;
  }, [items, filter]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return baseList;
    return baseList.filter(p => (p.title || p.titulo || "").toLowerCase().includes(term));
  }, [baseList, q]);

  const handleAdd = (p) =>
    dispatch({ type: "ADD_ITEM", payload: {
      id: p.id, title: p.title || p.titulo, price: Number(p.price || p.precio) || 0, image: p.image || p.img, qty: 1
    }});

  return (
    <section className="py-4">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h1 className="h4 mb-0">Catálogo</h1>
          <small className="text-muted">{filtered.length} resultados</small>
        </div>

        <SearchBar value={q} onChange={setQ} />

        {loading ? (
          <p className="text-muted mt-3">Cargando…</p>
        ) : filtered.length === 0 ? (
          <p className="text-muted mt-3">Sin resultados para “{q}”.</p>
        ) : (
          <ProductGrid items={filtered} onAdd={handleAdd} />
        )}
      </div>
    </section>
  );
}
