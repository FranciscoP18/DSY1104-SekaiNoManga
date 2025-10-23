export const initialCart = {
  items: [], // {id, title, price, qty, image}
  coupon: null, // { code, pct }
  shipping: { region: null, cost: 0 },
};

export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const { id, title, price, image, qty = 1 } = action.payload;
      const exists = state.items.find(i => i.id === id);
      const items = exists
        ? state.items.map(i => i.id === id ? { ...i, qty: i.qty + qty } : i)
        : [...state.items, { id, title, price, image, qty }];
      return { ...state, items };
    }
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter(i => i.id !== action.payload.id) };
    case "SET_QTY": {
      const { id, qty } = action.payload;
      const q = Math.max(0, Number(qty) || 0);
      const items = state.items
        .map(i => i.id === id ? { ...i, qty: q } : i)
        .filter(i => i.qty > 0);
      return { ...state, items };
    }
    case "APPLY_COUPON":
      return { ...state, coupon: action.payload }; // {code, pct}
    case "SET_SHIPPING":
      return { ...state, shipping: action.payload }; // {region, cost}
    case "CLEAR":
      return { ...initialCart };
    default:
      return state;
  }
}
