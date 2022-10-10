const { setupEnvironment } = require("../analysis");
const { mockToken } = require("./__mock__/token");

describe("Setup environment", () => {
  it("Should throw if account token its invalid", () => {
    const exec = () => setupEnvironment({ environment: [{
      key: "account_token",
      value: "invalid",
    }] });

    expect(exec).toThrow();
  });

  it("Should throw if account token its undefined", () => {
    const exec = () => setupEnvironment({ environment: [{
      key: "account_token",
      value: undefined,
    }] });

    expect(exec).toThrow();
  });

  it("Should return environment object", () => {
    const result = setupEnvironment({ environment: [{
      key: "account_token",
      value: mockToken,
    }, {
      key: "input",
      value: 10,
    }] });

    expect(result?.account_token).toBe(mockToken);
    expect(result?.input).toBe(10);
  });
});
