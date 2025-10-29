const lvl = require("../src/utils/levelUtils");

describe("levelUtils", () => {
  it("calculates level from points correctly", () => {
    expect(lvl.nivelDesdePuntos(0)).toBe(1);
    expect(lvl.nivelDesdePuntos(499)).toBe(1);
    expect(lvl.nivelDesdePuntos(500)).toBe(2);
    expect(lvl.nivelDesdePuntos(1500)).toBe(4);
  });
});
