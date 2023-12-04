// =================== //
// ====== REGEX ====== //
// =================== //

// ====== EMAIL REGEX ====== //
// export const EMAIL_REGEXP = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

// ====== URL REGEX ====== //
export const URL_UNALLOWED_CHARS = /[\s<>\\]/;
export const URL_FRAGMENT = /^[a-zA-Z0-9-]+$/;
export const URL_PORT = /^([0-9]+)$/;
export const URL_TLD = /^(?!-)[A-Za-z0-9-]+(?<!-)$/;
export const URL_HOSTNAME = /^[a-zA-Z0-9.-]+$/;

// ====== NAME REGEX ====== //
export const NAME_REGEXP = /^[A-Za-zÀ-ÖØ-öø-ÿ,'.-]+$/i;

// ====== USERNAME REGEX ====== //
// Minimum Length: 5, Maximum Length: 20
export const USERNAME_REGEXP = /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]{5,20}(?<![_.])$/;

// ====== PASSWORD REGEX ====== //
// If anything doesn't match this REGEXP, then it's invalid. 
// Anything with less than eight characters OR anything with no numbers OR anything with no uppercase OR or anything with no lowercase OR anything with no special characters.
export const PASSWORD_REGEXP = /^(.{0,7}|[^\d]*|[^\p{Lu}]*|[^\p{Ll}]*|[^\p{L}\d]*)$/;

// Minimum eight characters, at least one letter and one number:
export const FIRST_PASSWORD_REGEXP = /^(?=.*[A-Za-z\d]).{8,}$/;

// Minimum eight characters, at least one letter, one number and one special character:
export const SECOND_PASSWORD_REGEXP = /^(?=.*[A-Za-z\d@$!%*#?&]).{8,}$/;

// Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
export const THIRD_PASSWORD_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

// Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
export const FOURTH_PASSWORD_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

// Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
export const FIFTH_PASSWORD_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,10}$/;

// ====== PHONE REGEX ====== //
// export const PHONE_REGEXP = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

// ====== NUMBERS REGEX ====== //
// 0 in front of other numbers = invalid;
export const INTEGER_REGEXP = /^([+-]?[1-9]\d*|0)$/;
// export const FLOAT_REGEXP = /^[-+]?[0-9]+[.]?[0-9]*([eE][-+]?[0-9]+)?$/;