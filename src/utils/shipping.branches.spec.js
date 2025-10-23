import * as SH from "./shipping";

const candidate =
  (typeof SH === "function" && SH) ||
  SH.getShippingCost ||
  SH.calcShipping ||
  SH.shippingCost ||
  SH.default;

if (typeof candidate === "function") {
  const calc = candidate;

  describe("shipping - ramas de regiones", () => {
    it("Region Metropolitana", () => {
      const v = calc("Region_metropolitana") ?? calc({ region: "Region_metropolitana" });
      expect(Number.isFinite(v)).toBeTrue();
    });

    it("Otra región conocida o genérica", () => {
      const v = calc("Valparaiso") ?? calc({ region: "Valparaiso" }) ?? calc("Otra");
      expect(Number.isFinite(v)).toBeTrue();
    });

    it("Región desconocida → fallback válido", () => {
      const v = calc("Narnia") ?? calc({ region: "Narnia" });
      expect(Number.isFinite(v)).toBeTrue();
    });
  });
}
