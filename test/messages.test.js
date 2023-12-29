/* eslint-disable header/header */

import isValidMessage from "../src/utils/isValidMessage";

describe("isValidMessage", () => {
  it("should return false if the message is not a string", () => {
    expect(isValidMessage(123)).toBe(false);
    expect(isValidMessage({})).toBe(false);
    expect(isValidMessage(null)).toBe(false);
  });

  it("should return false if the message length is less than the minimum length", () => {
    expect(isValidMessage("short", { minLength: 10 })).toBe(false);
  });

  it("should return false if the message length is more than the maximum length", () => {
    const longMessage = "a".repeat(501);
    expect(isValidMessage(longMessage, { maxLength: 500 })).toBe(false);
  });

  it("should return true if the message length is within the valid range", () => {
    const validMessage = "a".repeat(300);
    expect(
      isValidMessage(validMessage, { minLength: 10, maxLength: 500 }),
    ).toBe(true);
  });

  it("should escape HTML if the escapeHtml option is true", () => {
    const messageWithHtml = "<script>alert('Hello!');</script>";
    expect(isValidMessage(messageWithHtml, { escapeHtml: true })).toBe(true);
  });

  it("should not escape HTML if the escapeHtml option is false", () => {
    const messageWithHtml = "<script>alert('Hello!');</script>";
    expect(isValidMessage(messageWithHtml, { escapeHtml: false })).toBe(true);
  });
});
