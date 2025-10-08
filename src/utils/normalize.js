export function normalizeProduct(p) {
  return {
    id: p?.id ?? "",
    title: p?.titulo || p?.title || "Producto",
    price: Number(p?.precio ?? p?.price ?? 0) || 0,
    image: p?.img || p?.image || "/assets/img/placeholder_cover.png",
    serie: p?.serie || "",
    volumen: p?.volumen ?? p?.volume ?? null,
    editorial: p?.editorial || "",
    desc: p?.desc || p?.description || "",
    onSale: !!p?.onSale,
    topSelling: !!p?.topSelling,
  };
}
