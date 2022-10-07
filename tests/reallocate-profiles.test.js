const { reallocateProfiles } = require("../analysis");

const profileSummary = require("./__mock__/profile-summary.json");
const subscription = require("./__mock__/subscription.json");

describe("Reallocate profiles", () => {
  it("Should return new profile allocation", () => {
    const oldValue = 500000;
    const newValue = 3000000;

    const accountLimit = {
      ...subscription.services,
      input: { limit: 1000000 },
    };

    const autoScale = {
      input: { limit: newValue },
    };

    const limit = {
      ...profileSummary.limit,
      input: oldValue,
    };

    const result = reallocateProfiles(accountLimit, autoScale, limit);

    expect(result?.input).toBe(2500000);
  });

  it("Should ignore if auto scale its empty", () => {
    const oldValue = 500000;

    const accountLimit = {
      ...subscription.services,
      input: { limit: 1000000 },
    };

    const autoScale = {
    };

    const limit = {
      ...profileSummary.limit,
      input: oldValue,
    };

    const result = reallocateProfiles(accountLimit, autoScale, limit);

    expect(result).toBe(null);
  });

  it("Should ignore if generate nan", () => {
    const oldValue = 500000;
    const newValue = "nan";

    const accountLimit = {
      ...subscription.services,
      input: { limit: 1000000 },
    };

    const autoScale = {
      input: { limit: newValue },
    };

    const limit = {
      ...profileSummary.limit,
      input: oldValue,
    };

    const result = reallocateProfiles(accountLimit, autoScale, limit);

    expect(result).toBe(null);
  });

  it("Should ignore if generate negative number", () => {
    const oldValue = 500000;
    const newValue = 3000000;

    const accountLimit = {
      ...subscription.services,
      input: { limit: 10000000000000 },
    };

    const autoScale = {
      input: { limit: newValue },
    };

    const limit = {
      ...profileSummary.limit,
      input: oldValue,
    };

    const result = reallocateProfiles(accountLimit, autoScale, limit);

    expect(result).toBe(null);
  });

  it("Should ignore if undefined", () => {
    const oldValue = 500000;

    const limit = {
      ...profileSummary.limit,
      input: oldValue,
    };

    const result = reallocateProfiles({}, {}, limit);

    expect(result).toBe(null);
  });
});
