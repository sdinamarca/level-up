const reg = require("../src/utils/registroUtils");

describe("registroUtils", () => {
  it("generarCodigo returns a 3-letter prefix plus numbers", () => {
    const code = reg.generarCodigo("Seba");
    expect(typeof code).toBe("string");
    expect(code.length).toBeGreaterThan(3);
    expect(code.substring(0, 3)).toBe("SEB");
  });
});
