const { getNextTier } = require("../analysis");

const tiers = [
  { amount: 30 },
  { amount: 10 },
  { amount: 40 },
  { amount: -10 },
  { amount: 70 },
  { amount: 100 },
];

describe("Get next tier", () => {
  it("Should return undefined if limit its undefined", () => {
    const result = getNextTier([], undefined);

    expect(result).toBeUndefined();
  });

  it("Should return next tier", () => {
    const current = 80;

    const result = getNextTier(tiers, current);

    expect(result).toBe(100);
  });

  it("Should return undefined if already max tier", () => {
    const current = 100;
    const result = getNextTier(tiers, current);

    expect(result).toBeUndefined();
  });
});
