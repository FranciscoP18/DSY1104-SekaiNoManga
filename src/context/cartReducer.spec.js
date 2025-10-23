import { cartReducer, initialCart } from "./cartReducer";

function stateWith(items = [], extra = {}) {
  return { ...initialCart, ...extra, items: [...items] };
}

describe("cartReducer", () => {
  it("ADD_ITEM: agrega producto nuevo", () => {
    const start = stateWith([]);
    const action = {
      type: "ADD_ITEM",
      payload: { id: 1, title: "A", price: 5000, image: "a.png", qty: 1 }
    };
    const next = cartReducer(start, action);
    expect(next.items.length).toBe(1);
    expect(next.items[0]).toEqual(jasmine.objectContaining({ id: 1, qty: 1 }));
  });

  it("ADD_ITEM: si ya existe, incrementa qty", () => {
    const start = stateWith([{ id: 1, title: "A", price: 1000, qty: 2 }]);
    const action = {
      type: "ADD_ITEM",
      payload: { id: 1, title: "A", price: 1000, image: "a.png", qty: 3 }
    };
    const next = cartReducer(start, action);
    expect(next.items.find(i => i.id === 1).qty).toBe(5);
  });

  it("REMOVE_ITEM: elimina por id existente", () => {
    const start = stateWith([{ id: 1, title: "A", price: 1000, qty: 1 }, { id: 2, title: "B", price: 2000, qty: 1 }]);
    const next = cartReducer(start, { type: "REMOVE_ITEM", payload: { id: 2 } });
    expect(next.items.map(i => i.id)).toEqual([1]);
  });

  it("REMOVE_ITEM: id inexistente mantiene estado", () => {
    const start = stateWith([{ id: 1, title: "A", price: 1000, qty: 1 }]);
    const next = cartReducer(start, { type: "REMOVE_ITEM", payload: { id: 999 } });
    expect(next.items.length).toBe(1);
  });

  it("SET_QTY: cambia cantidad válida", () => {
    const start = stateWith([{ id: 1, title: "A", price: 1000, qty: 1 }]);
    const next = cartReducer(start, { type: "SET_QTY", payload: { id: 1, qty: 3 } });
    expect(next.items.find(i => i.id === 1).qty).toBe(3);
  });

  it("SET_QTY: qty=0 elimina ítem", () => {
    const start = stateWith([{ id: 1, title: "A", price: 1000, qty: 1 }]);
    const next = cartReducer(start, { type: "SET_QTY", payload: { id: 1, qty: 0 } });
    expect(next.items.length).toBe(0);
  });

  it("SET_QTY: qty negativa o NaN → elimina", () => {
    const start = stateWith([{ id: 1, title: "A", price: 1000, qty: 2 }]);
    const invalids = [-5, NaN, undefined, null, "abc"];
    invalids.forEach(qty => {
      const mid = cartReducer(start, { type: "SET_QTY", payload: { id: 1, qty } });
      expect(mid.items.find(i => i.id === 1)).toBeUndefined();
    });
  });

  it("APPLY_COUPON", () => {
    const start = stateWith([], { coupon: null });
    const next = cartReducer(start, { type: "APPLY_COUPON", payload: { code: "SEKAI15", pct: 0.15 }});
    expect(next.coupon).toEqual({ code: "SEKAI15", pct: 0.15 });
  });

  it("SET_SHIPPING", () => {
    const start = stateWith([], { shipping: { region: null, cost: 0 } });
    const next = cartReducer(start, { type: "SET_SHIPPING", payload: { region: "Aysén", cost: 8000 }});
    expect(next.shipping).toEqual({ region: "Aysén", cost: 8000 });
  });

  it("CLEAR", () => {
    const start = stateWith([{ id: 1, title: "A", price: 1000, qty: 1 }], {
      coupon: { code: "X", pct: 0.1 },
      shipping: { region: "Valparaíso", cost: 5000 }
    });
    const next = cartReducer(start, { type: "CLEAR" });
    expect(next).toEqual(initialCart);
  });

  it("default: acción desconocida → retorna el mismo state", () => {
    const start = stateWith([{ id: 1, title: "A", price: 1000, qty: 1 }]);
    const next = cartReducer(start, { type: "???" });
    expect(next).toBe(start);
  });
});
