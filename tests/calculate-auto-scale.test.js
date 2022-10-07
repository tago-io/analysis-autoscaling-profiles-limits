const { calculateAutoScale } = require("../analysis");

const billing = require("./__mock__/billing.json");
const profileSummary = require("./__mock__/profile-summary.json");
const subscription = require("./__mock__/subscription.json");

describe("Calculate auto scale", () => {
  it("Should add item to auto scale", () => {
    const limit = {
      ...profileSummary.limit,
      input: 100,
    };
    const limitUsed = {
      ...profileSummary.limit_used,
      input: 51,
    };
    const accountLimit = {
      ...subscription.services,
      input: { limit: 1000000 },
    };

    const environment = {
      input: 50, // %
    };

    const result = calculateAutoScale(
      billing,
      limit,
      limitUsed,
      accountLimit,
      environment
    );

    expect(result?.input?.limit).toBe(3000000);
  });

  it("Should ignore if key its not in environment", () => {
    const limit = {
      ...profileSummary.limit,
      input: 100,
    };
    const limitUsed = {
      ...profileSummary.limit_used,
      input: 51,
    };
    const accountLimit = {
      ...subscription.services,
      input: { limit: 1000000 },
    };

    const environment = {};

    const result = calculateAutoScale(
      billing,
      limit,
      limitUsed,
      accountLimit,
      environment
    );

    expect(result).toBe(null);
  });

  it("Should ignore if scale its 0", () => {
    const limit = {
      ...profileSummary.limit,
      input: 100,
    };
    const limitUsed = {
      ...profileSummary.limit_used,
      input: 51,
    };
    const accountLimit = {
      ...subscription.services,
      input: { limit: 1000000 },
    };

    const environment = {
      input: 0, // %
    };

    const result = calculateAutoScale(
      billing,
      limit,
      limitUsed,
      accountLimit,
      environment
    );

    expect(result).toBe(null);
  });

  it("Should ignore if scale less than 0", () => {
    const limit = {
      ...profileSummary.limit,
      input: 100,
    };
    const limitUsed = {
      ...profileSummary.limit_used,
      input: 51,
    };
    const accountLimit = {
      ...subscription.services,
      input: { limit: 1000000 },
    };

    const environment = {
      input: -1, // %
    };

    const result = calculateAutoScale(
      billing,
      limit,
      limitUsed,
      accountLimit,
      environment
    );

    expect(result).toBe(null);
  });

  it("Should ignore if scale is NaN", () => {
    console.error = jest.fn();
    const limit = {
      ...profileSummary.limit,
      input: 100,
    };
    const limitUsed = {
      ...profileSummary.limit_used,
      input: 51,
    };
    const accountLimit = {
      ...subscription.services,
      input: { limit: 1000000 },
    };

    const environment = {
      input: "nan", // %
    };

    const result = calculateAutoScale(
      billing,
      limit,
      limitUsed,
      accountLimit,
      environment
    );

    expect(result).toBe(null);
    expect(console.error).toBeCalled();
  });

  it("Should ignore if not need auto scale", () => {
    const limit = {
      ...profileSummary.limit,
      input: 100,
    };
    const limitUsed = {
      ...profileSummary.limit_used,
      input: 49,
    };
    const accountLimit = {
      ...subscription.services,
      input: { limit: 1000000 },
    };

    const environment = {
      input: 50, // %
    };

    const result = calculateAutoScale(
      billing,
      limit,
      limitUsed,
      accountLimit,
      environment
    );

    expect(result).toBe(null);
  });

  it("Should ignore if already in max tier", () => {
    const limit = {
      ...profileSummary.limit,
      input: 100,
    };
    const limitUsed = {
      ...profileSummary.limit_used,
      input: 51,
    };
    const accountLimit = {
      ...subscription.services,
      input: { limit: 4000000000 },
    };

    const environment = {
      input: 50, // %
    };

    const result = calculateAutoScale(
      billing,
      limit,
      limitUsed,
      accountLimit,
      environment
    );

    expect(result).toBe(null);
  });
});
