// src/services/mangas.spec.js
import { loadMangas, __clearMangasCacheForTests as clearCache } from "./mangas";

const MOCK = [
  { id: 3, titulo: "C", serie: "X", volumen: 2 },
  { id: 1, titulo: "A", serie: "Y" }, // volumen -> 0
  { id: 2, titulo: "B", serie: "X", volumen: 1 },
];

function mockFetchOk(data = MOCK) {
  global.fetch = jasmine.createSpy("fetch").and.returnValue(
    Promise.resolve({ ok: true, json: () => Promise.resolve(data) })
  );
}
function mockFetchError() {
  global.fetch = jasmine.createSpy("fetch").and.returnValue(
    Promise.resolve({ ok: false, json: () => Promise.resolve({}) })
  );
}

describe("services/mangas", () => {
  afterEach(() => { delete global.fetch; clearCache && clearCache(); });

  it("carga, agrupa por serie y ordena por volumen", async () => {
    mockFetchOk();
    const data = await loadMangas();
    expect(global.fetch).toHaveBeenCalled();
    expect(String(global.fetch.calls.mostRecent().args[0])).toMatch(/mangas\.json/i);
    expect(data.byId[1].titulo).toBe("A");
    expect(data.bySerie["X"].map(p => p.volumen)).toEqual([1, 2]);
  });

  it("usa caché en la segunda llamada (no refetch)", async () => {
    mockFetchOk();
    const first = await loadMangas();
    const n = global.fetch.calls.count();
    const second = await loadMangas();
    expect(second).toBe(first);
    expect(global.fetch.calls.count()).toBe(n);
  });

  it("lanza error si la respuesta HTTP no es ok", async () => {
    mockFetchError();
    await expectAsync(loadMangas()).toBeRejectedWithError(/mangas\.json/i);
  });
});
