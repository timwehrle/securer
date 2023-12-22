import secure from "../src/index.js";

describe("secure.isValidName", () => {
  it("should return true for a valid name without special characters", () => {
    expect(secure.isValidName("John Doe")).toBe(true);
    expect(secure.isValidName("Alice")).toBe(true);
    expect(secure.isValidName("Bob Smith Jr.")).toBe(true);
  });

  it("should return false for a name with special characters", () => {
    expect(secure.isValidName("John!")).toBe(false);
    expect(secure.isValidName("Alice#")).toBe(false);
    expect(secure.isValidName("Bob Smith Jr.~")).toBe(false);
  });

  it("should return false for an empty name", () => {
    expect(secure.isValidName("")).toBe(false);
  });

  it("should return false for a name with only special characters", () => {
    expect(secure.isValidName("!@#$%^&*()")).toBe(false);
  });
});
