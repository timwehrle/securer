// @flow strict

// import isValidUrl from "../src/utils/isValidUrl";
import isValidEmail from "../src/utils/isValidEmail";

// const options = {
//     allowFragments: false,
//     allowParameters: false,
// };

// test('isValidUrl should return true for valid URLs', () => {
//     // Valid URLs
//     expect(isValidUrl('https://www.google.com/search?q=porsche&sca_esv=587781976&tbm=isch&sxsrf=AM9HkKmqDZD5AMnpejwbdYj-7AR52wWRWg%3A1701719827391&source=hp&biw=1920&bih=993&ei=Ey9uZe-6FY2pxc8PireoyAs&iflsig=AO6bgOgAAAAAZW49I1i56kkO_Szb8xrFZ0VOnIN9_-jm&ved=0ahUKEwivkMSuyPaCAxWNVPEDHYobCrkQ4dUDCAc&uact=5&oq=porsche&gs_lp=EgNpbWciB3BvcnNjaGUyBBAjGCcyCBAAGIAEGLEDMggQABiABBixAzIIEAAYgAQYsQMyCBAAGIAEGLEDMggQABiABBixAzIIEAAYgAQYsQMyCBAAGIAEGLEDMggQABiABBixAzIIEAAYgAQYsQNIoh1Q8wtYgx1wBXgAkAECmAH2AaABvgiqAQU3LjIuMbgBA8gBAPgBAYoCC2d3cy13aXotaW1nqAIKwgIHECMY6gIYJ8ICBRAAGIAEwgILEAAYgAQYsQMYgwHCAgQQABgD&sclient=img#imgrc=Zh7e7a9BQGlW2M')).toBe(true);
//     expect(isValidUrl('http://mail.carrers.example.com')).toBe(true);
//     expect(isValidUrl('ftp://ftp.d-d-d.com2')).toBe(true);
// });

// test('isValidUrl should return false for invalid URLs', () => {
//     // Invalid URLs
//     expect(isValidUrl('//exampleuk')).toBe(false);
//     expect(isValidUrl('https://www.google.com/search?q=porsche&sca_esv=587781976&tbm=isch&sxsrf=AM9HkKmqDZD5AMnpejwbdYj-7AR52wWRWg%3A1701719827391&source=hp&biw=1920&bih=993&ei=Ey9uZe-6FY2pxc8PireoyAs&iflsig=AO6bgOgAAAAAZW49I1i56kkO_Szb8xrFZ0VOnIN9_-jm&ved=0ahUKEwivkMSuyPaCAxWNVPEDHYobCrkQ4dUDCAc&uact=5&oq=porsche&gs_lp=EgNpbWciB3BvcnNjaGUyBBAjGCcyCBAAGIAEGLEDMggQABiABBixAzIIEAAYgAQYsQMyCBAAGIAEGLEDMggQABiABBixAzIIEAAYgAQYsQMyCBAAGIAEGLEDMggQABiABBixAzIIEAAYgAQYsQNIoh1Q8wtYgx1wBXgAkAECmAH2AaABvgiqAQU3LjIuMbgBA8gBAPgBAYoCC2d3cy13aXotaW1nqAIKwgIHECMY6gIYJ8ICBRAAGIAEwgILEAAYgAQYsQMYgwHCAgQQABgD&sclient=img#imgrc=Zh7e7a9BQGlW2M', options)).toBe(false);
//     expect(isValidUrl('https://example.555')).toBe(false);
// });

test("isValidEmail should return true for valid email addresses with different domain extensions", () => {
  expect(isValidEmail("john.doe@example.com")).toBe(true);
  expect(isValidEmail("jane_doe@example.co.uk")).toBe(true);
  expect(isValidEmail("user.name@example.io")).toBe(true);
  expect(isValidEmail("user_name@example.net")).toBe(true);
});

test("isValidEmail should return false for email addresses without a domain extension", () => {
  expect(isValidEmail("john.doe@example")).toBe(false);
  expect(isValidEmail("jane_doe@example.")).toBe(false);
});

test("isValidEmail should return false for email addresses with invalid characters", () => {
  expect(isValidEmail("")).toBe(false);
  expect(isValidEmail("jane_doe@exa#mple.co.uk")).toBe(false);
  expect(isValidEmail("user.name@exa%mple.io")).toBe(false);
  expect(isValidEmail("user_name@exa^mple.net")).toBe(false);
});

test("isValidEmail should return false for email addresses without a user name", () => {
  expect(isValidEmail("@example.com")).toBe(false);
  expect(isValidEmail("@example.co.uk")).toBe(false);
});

test("isValidEmail should return false for email addresses without an @ symbol", () => {
  expect(isValidEmail("johndoeexample.com")).toBe(false);
  expect(isValidEmail("janedoeexample.co.uk")).toBe(false);
});
