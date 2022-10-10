const { checkAutoScale } = require("../analysis");

describe("Check auto scale", () => {
  it("Should be true if usage its equal to target", () => {
    const currentUsage = 100;
    const allocated = 200;
    const scale = 50; // %

    const result = checkAutoScale(currentUsage, allocated, scale);

    expect(result).toBeTruthy();
  });

  it("Should be true if usage its greater than target", () => {
    const currentUsage = 101;
    const allocated = 200;
    const scale = 50; // %

    const result = checkAutoScale(currentUsage, allocated, scale);

    expect(result).toBeTruthy();
  });

  it("Should be false if usage its less than target", () => {
    const currentUsage = 49;
    const allocated = 200;
    const scale = 50; // %

    const result = checkAutoScale(currentUsage, allocated, scale);

    expect(result).toBeFalsy();
  });

  it("Should be false if scale it's 0", () => {
    const currentUsage = 100;
    const allocated = 200;
    const scale = 0; // %

    const result = checkAutoScale(currentUsage, allocated, scale);

    expect(result).toBeFalsy();
  });

  it("Should be false if allocation it's 0", () => {
    const currentUsage = 100;
    const allocated = 0;
    const scale = 50; // %

    const result = checkAutoScale(currentUsage, allocated, scale);

    expect(result).toBeFalsy();
  });

  it("Should be false if scale it's undefined", () => {
    const currentUsage = 100;
    const allocated = 200;
    const scale = undefined;

    const result = checkAutoScale(currentUsage, allocated, scale);

    expect(result).toBeFalsy();
  });

  it("Should be false if allocation it's undefined", () => {
    const currentUsage = 100;
    const allocated = 0;
    const scale = undefined;

    const result = checkAutoScale(currentUsage, allocated, scale);

    expect(result).toBeFalsy();
  });
});
