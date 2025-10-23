import { shippingByRegion } from "../utils/shipping";

describe("shippingByRegion", () => {
  it("sin región → 0", () => {
    expect(shippingByRegion(null)).toBe(0);
    expect(shippingByRegion("")).toBe(0);
  });
  it("Aysén → 8000", () => {
    expect(shippingByRegion("Aysén")).toBe(8000);
  });
  it("Valparaíso → 5000", () => {
    expect(shippingByRegion("Valparaíso")).toBe(5000);
  });
  it("Region_metropolitana → 3000", () => {
    expect(shippingByRegion("Region_metropolitana")).toBe(3000);
  });
  it("otra región → 6000", () => {
    expect(shippingByRegion("Biobío")).toBe(6000);
  });
});
