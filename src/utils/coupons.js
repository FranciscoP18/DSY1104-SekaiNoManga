export const coupons = { "SEKAI15": { code: "SEKAI15", pct: 0.15 } };

export function validateCoupon(code) {
  if (!code) return null;
  const key = String(code).trim().toUpperCase();
  return coupons[key] || null;
}
