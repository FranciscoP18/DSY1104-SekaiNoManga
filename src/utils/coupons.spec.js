import { validateCoupon } from "../utils/coupons";

describe("validateCoupon", () => {
  it("code vacío → null", () => {
    expect(validateCoupon(null)).toBeNull();
    expect(validateCoupon("")).toBeNull();
  });
  it("case-insensitive", () => {
    expect(validateCoupon("sekai15")).toEqual(jasmine.objectContaining({ code: "SEKAI15", pct: 0.15 }));
    expect(validateCoupon("SeKaI15")).toEqual(jasmine.objectContaining({ code: "SEKAI15" }));
  });
  it("inválido → null", () => {
    expect(validateCoupon("NOPE")).toBeNull();
  });
});
