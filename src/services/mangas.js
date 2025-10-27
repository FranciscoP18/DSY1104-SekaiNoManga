let cache = null;

export function __clearMangasCacheForTests() { cache = null; }

export async function loadMangas() {
  if (cache) return cache;

  const res = await fetch("/mangas.json");
  if (!res.ok) throw new Error("No se pudo cargar mangas.json");

  const list = await res.json();
  const byId = Object.fromEntries(list.map(p => [p.id, p]));
  const bySerie = list.reduce((acc, p) => {
    (acc[p.serie] ??= []).push(p);
    return acc;
  }, {});
  Object.values(bySerie).forEach(arr =>
    arr.sort((a,b) => (a.volumen || 0) - (b.volumen || 0))
  );

  cache = { list, byId, bySerie };
  return cache;
}
