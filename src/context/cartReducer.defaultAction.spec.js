import * as R from "./cartReducer";
const reducer = R.default || R.cartReducer || R.reducer;

if (typeof reducer === "function") {
  it("acción desconocida devuelve el mismo estado (default)", () => {
    const state = { items: [{ id: 9, qty: 1 }] };
    const next  = reducer(state, { type: "@@UNKNOWN" });
    expect(next).toEqual(state);
  });
}
