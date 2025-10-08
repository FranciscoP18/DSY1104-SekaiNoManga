import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { loadMangas } from "../services/mangas";
import { useCart } from "../context/CartContext";
import { CLP } from "../utils/currency";

export default function Producto() {
  const { id } = useParams();
  const nav = useNavigate();
  const { dispatch } = useCart();
  const [data, setData] = useState({ list: [], byId: {}, bySerie: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ok = true;
    (async () => {
      const res = await loadMangas();
      if (ok) setData(res);
      setLoading(false);
    })();
    return () => { ok = false; };
  }, []);

  const p = data.byId[id];
  const sameSerie = useMemo(() => {
    if (!p?.serie) return [];
    return (data.bySerie[p.serie] || []).filter(x => x.id !== p.id).slice(0, 6);
  }, [p, data]);

  const add = () => {
    if (!p) return;
    dispatch({ type: "ADD_ITEM", payload: {
      id: p.id, title: p.titulo, price: Number(p.precio) || 0, image: p.img, qty: 1
    }});
  };

  if (loading) return <div className="container py-4">Cargando…</div>;
  if (!p) return <div className="container py-4 alert alert-danger">Producto no encontrado.</div>;

  return (
    <section className="py-4">
      <div className="container product-detail">
        <div className="row g-4">
          <div className="col-12 col-md-5">
            <div className="cover">
              <img
                src={p.img || "/assets/img/placeholder_cover.png"}
                alt={p.titulo}
                onError={(e)=>{ e.currentTarget.src="/assets/img/placeholder_cover.png"; }}
                loading="lazy" decoding="async" referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="col-12 col-md-7">
            <h1 className="h5">{p.titulo}</h1>
            <ul className="list-unstyled small text-muted">
              <li><strong>Serie:</strong> {p.serie ?? "-"}</li>
              <li><strong>Volumen:</strong> {p.volumen ?? "-"}</li>
              <li><strong>Editorial:</strong> {p.editorial ?? "-"}</li>
            </ul>

            <div className="fs-5 fw-semibold mb-3">{CLP.format(Number(p.precio) || 0)}</div>
            <p className="text-muted">{p.desc ?? ""}</p>

            <div className="d-flex gap-2">
              <button className="btn btn-primary" onClick={add}>Agregar al carro</button>
              <Link className="btn btn-outline-secondary" to="/catalogo">Volver al catálogo</Link>
            </div>
          </div>
        </div>

        {sameSerie.length > 0 && (
          <>
            <hr className="my-4" />
            <h2 className="h6 mb-3">También de la serie “{p.serie}”</h2>
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
              {sameSerie.map(s => (
                <div className="col" key={s.id}>
                  <Link to={`/producto/${s.id}`} className="text-decoration-none">
                    <img
                      src={s.img || "/assets/img/placeholder_cover.png"}
                      alt={s.titulo}
                      className="img-fluid"
                      style={{ width: "100%", aspectRatio: "3 / 4", objectFit: "cover", background: "#f3f4f6" }}
                      onError={(e)=>{ e.currentTarget.src="/assets/img/placeholder_cover.png"; }}
                    />
                    <div className="small text-body mt-1">{s.titulo}</div>
                    <div className="small text-muted">{CLP.format(Number(s.precio) || 0)}</div>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
