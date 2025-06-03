import { getOptionValue } from ".";

describe("getOptionValue", () => {
  it("returns correct string for 1 instalment", () => {
    const result = getOptionValue(1, "10,00 €");
    expect(result).toBe("1 cuota de 10,00 €/mes");
  });

  it("returns correct string for multiple instalments", () => {
    const result = getOptionValue(3, "25,00 €");
    expect(result).toBe("3 cuotas de 25,00 €/mes");
  });

  it("works with different currency formats", () => {
    const result = getOptionValue(2, "55,00 €");
    expect(result).toBe("2 cuotas de 55,00 €/mes");
  });
});
