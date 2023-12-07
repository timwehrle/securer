import isValidUrl from "../src/utils/isValidUrl";

const options = {
    allowFragments: false,
    allowParameters: false,
};

test('isValidUrl should return true for valid URLs', () => {
    // Valid URLs
    expect(isValidUrl('https://www.google.com/search?q=porsche&sca_esv=587781976&tbm=isch&sxsrf=AM9HkKmqDZD5AMnpejwbdYj-7AR52wWRWg%3A1701719827391&source=hp&biw=1920&bih=993&ei=Ey9uZe-6FY2pxc8PireoyAs&iflsig=AO6bgOgAAAAAZW49I1i56kkO_Szb8xrFZ0VOnIN9_-jm&ved=0ahUKEwivkMSuyPaCAxWNVPEDHYobCrkQ4dUDCAc&uact=5&oq=porsche&gs_lp=EgNpbWciB3BvcnNjaGUyBBAjGCcyCBAAGIAEGLEDMggQABiABBixAzIIEAAYgAQYsQMyCBAAGIAEGLEDMggQABiABBixAzIIEAAYgAQYsQMyCBAAGIAEGLEDMggQABiABBixAzIIEAAYgAQYsQNIoh1Q8wtYgx1wBXgAkAECmAH2AaABvgiqAQU3LjIuMbgBA8gBAPgBAYoCC2d3cy13aXotaW1nqAIKwgIHECMY6gIYJ8ICBRAAGIAEwgILEAAYgAQYsQMYgwHCAgQQABgD&sclient=img#imgrc=Zh7e7a9BQGlW2M')).toBe(true);
    expect(isValidUrl('http://mail.carrers.example.com')).toBe(true);
    expect(isValidUrl('ftp://ftp.d-d-d.com2')).toBe(true);
});

test('isValidUrl should return false for invalid URLs', () => {
    // Invalid URLs
    expect(isValidUrl('//exampleuk')).toBe(false);
    expect(isValidUrl('https://www.google.com/search?q=porsche&sca_esv=587781976&tbm=isch&sxsrf=AM9HkKmqDZD5AMnpejwbdYj-7AR52wWRWg%3A1701719827391&source=hp&biw=1920&bih=993&ei=Ey9uZe-6FY2pxc8PireoyAs&iflsig=AO6bgOgAAAAAZW49I1i56kkO_Szb8xrFZ0VOnIN9_-jm&ved=0ahUKEwivkMSuyPaCAxWNVPEDHYobCrkQ4dUDCAc&uact=5&oq=porsche&gs_lp=EgNpbWciB3BvcnNjaGUyBBAjGCcyCBAAGIAEGLEDMggQABiABBixAzIIEAAYgAQYsQMyCBAAGIAEGLEDMggQABiABBixAzIIEAAYgAQYsQMyCBAAGIAEGLEDMggQABiABBixAzIIEAAYgAQYsQNIoh1Q8wtYgx1wBXgAkAECmAH2AaABvgiqAQU3LjIuMbgBA8gBAPgBAYoCC2d3cy13aXotaW1nqAIKwgIHECMY6gIYJ8ICBRAAGIAEwgILEAAYgAQYsQMYgwHCAgQQABgD&sclient=img#imgrc=Zh7e7a9BQGlW2M', options)).toBe(false);
    expect(isValidUrl('https://example.555')).toBe(false);
});
