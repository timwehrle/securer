import isValidUrl from "../src/utils/isValidUrl";

const options = {
    allowFragments: false,
};

test('isValidUrl should return true for valid URLs', () => {
    // Valid URLs
    expect(isValidUrl('https://example.example')).toBe(true);
    expect(isValidUrl('http://mail.carrers.example.com')).toBe(true);
    expect(isValidUrl('ftp://ftp.d-d-d.com2')).toBe(true);
});

test('isValidUrl should return false for invalid URLs', () => {
    // Invalid URLs
    expect(isValidUrl('//exampleuk')).toBe(false);
    expect(isValidUrl('https://mail.example.com/#hallo', options)).toBe(false);
    expect(isValidUrl('https://example.555')).toBe(false);
});
