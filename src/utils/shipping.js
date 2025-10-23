export function shippingByRegion(region) {
  if (!region) return 0;
  if (region === "Aysén") return 8000;
  if (region === "Valparaíso") return 5000;
  if (region === "Region_metropolitana") return 3000;
  return 6000; // otras
}
