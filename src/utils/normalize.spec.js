import normalize from "./normalize";

describe("normalize (fallbacks)", () => {
  it("usa titulo/precio si existen", () => {
    const p = normalize({ id: 1, titulo: "A", precio: 1000 });
    expect(p.title).toBe("A");
    expect(p.price).toBe(1000);
  });
  it("usa title/price si no hay titulo/precio", () => {
    const p = normalize({ id: 2, title: "B", price: 2000 });
    expect(p.title).toBe("B");
    expect(p.price).toBe(2000);
  });
  it("defaults cuando faltan campos", () => {
    const p = normalize({ id: 3 });
    expect(p.title).toBe("Producto");
    expect(p.price).toBe(0);
  });
});
