import isValidName from "../src/utils/isValidName";

describe("isValidName", () => {
  it("should return true for a valid name without special characters", () => {
    expect(isValidName("John Doe")).toBe(true);
    expect(isValidName("Alice")).toBe(true);
    expect(isValidName("Bob Smith Jr.")).toBe(true);
  });

  it("should return false for a name with special characters", () => {
    expect(isValidName("John!")).toBe(false);
    expect(isValidName("Alice#")).toBe(false);
    expect(isValidName("Bob Smith Jr.~")).toBe(false);
  });

  it("should return false for an empty name", () => {
    expect(isValidName("")).toBe(false);
  });

  it("should return false for a name with only special characters", () => {
    expect(isValidName("!@#$%^&*()")).toBe(false);
  });
});
