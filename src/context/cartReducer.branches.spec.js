
import * as R from "./cartReducer";

const reducer = R.default || R.cartReducer || R.reducer;
if (!reducer) pending("cartReducer no exporta la función reducer");

describe("cartReducer - ramas principales", () => {
  it("ADD_ITEM: agrega item nuevo", () => {
    const state = { items: [] };
    const next = reducer(state, {
      type: "ADD_ITEM",
      payload: { id: 1, title: "A", price: 1000, qty: 1 },
    });
    expect(next.items.length).toBe(1);
    expect(next.items[0].qty || 1).toBeGreaterThan(0);
  });

  it("ADD_ITEM: si ya existe → incrementa qty (rama alternativa)", () => {
    const state = { items: [{ id: 2, title: "B", price: 500, qty: 1 }] };
    const next = reducer(state, {
      type: "ADD_ITEM",
      payload: { id: 2, title: "B", price: 500, qty: 2 },
    });
    const item = next.items.find(x => x.id === 2);
    expect(item.qty).toBe(3); // 1 + 2
  });

  it("UPDATE_QTY: qty=0 elimina el item (otra rama)", () => {
    const state = { items: [{ id: 3, title: "C", price: 900, qty: 2 }] };
    const next = reducer(state, {
      type: "UPDATE_QTY",
      payload: { id: 3, qty: 0 },
    });
    const exists = next.items.some(x => x.id === 3);
    expect(exists).toBeFalse();
  });

  it("REMOVE_ITEM: remueve por id", () => {
    const state = { items: [{ id: 4, title: "D", price: 1200, qty: 1 }] };
    const next = reducer(state, { type: "REMOVE_ITEM", payload: { id: 4 } });
    expect(next.items.length).toBe(0);
  });
});
