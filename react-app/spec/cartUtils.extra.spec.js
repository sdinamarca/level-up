const cart = require("../src/utils/cartUtils");

describe("cartUtils - extra", () => {
  it("updates quantity for an existing item", () => {
    const state = [{ id: "a", nombre: "A", precio: 100, qty: 2 }];
    const next = cart.updateQty(state, "a", 5);
    expect(next.length).toBe(1);
    expect(next[0].qty).toBe(5);
  });

  it("clear returns an empty array", () => {
    const state = [{ id: "a", qty: 2 }];
    const next = cart.clear();
    expect(Array.isArray(next)).toBe(true);
    expect(next.length).toBe(0);
  });
});
