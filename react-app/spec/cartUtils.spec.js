const cart = require("../src/utils/cartUtils");

describe("cartUtils", () => {
  it("adds a new item when id is new", () => {
    const state = [];
    const next = cart.add(state, { id: "a", nombre: "A", precio: 100 });
    expect(next.length).toBe(1);
    expect(next[0].qty).toBe(1);
    expect(next[0].id).toBe("a");
  });

  it("increments qty when adding same id", () => {
    const state = [{ id: "a", nombre: "A", precio: 100, qty: 2 }];
    const next = cart.add(state, { id: "a", nombre: "A", precio: 100 });
    expect(next.length).toBe(1);
    expect(next[0].qty).toBe(3);
  });

  it("removes an item by id", () => {
    const state = [
      { id: "a", qty: 1 },
      { id: "b", qty: 2 },
    ];
    const next = cart.remove(state, "a");
    expect(next.length).toBe(1);
    expect(next[0].id).toBe("b");
  });
});
