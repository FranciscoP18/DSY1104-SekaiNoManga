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
        if (ok) {
          const arr = Array.isArray(list) ? list : [];
          setItems(arr);
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (ok) setLoading(false);
      }
    })();
    return () => { ok = false; };
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    const base = filter ? items.filter(filter) : items;
    if (!term) return base;
    return base.filter(p =>
      (p.titulo || "").toLowerCase().includes(term) ||
      (p.title || "").toLowerCase().includes(term)
    );
  }, [items, q, filter]);

  const handleAdd = (payload) => {
    dispatch({ type: "ADD_ITEM", payload });
  };

  return (
    <section className="py-4">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <h3 className="mb-0">Catálogo</h3>
          <div className="text-muted small">{filtered.length} resultados</div>
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
