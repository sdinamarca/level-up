// Small set of pure functions to operate on cart state for unit testing
// Implemented in CommonJS so tests can require() them easily.

function add(state, item) {
  const idx = state.findIndex((i) => i.id === item.id);
  if (idx >= 0) {
    const next = state.slice();
    next[idx] = { ...next[idx], qty: next[idx].qty + (item.qty || 1) };
    return next;
  }
  return [...state, { ...item, qty: item.qty || 1 }];
}

function remove(state, id) {
  return state.filter((i) => i.id !== id);
}

function updateQty(state, id, qty) {
  return state.map((i) => (i.id === id ? { ...i, qty } : i));
}

function clear() {
  return [];
}

module.exports = { add, remove, updateQty, clear };
