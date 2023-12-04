import { 
    EMAIL_REGEXP, 
    URL_REGEXP,
    URL_UNALLOWED_CHARS, 
    NAME_REGEXP, 
    USERNAME_REGEXP, 
    PASSWORD_REGEXP,
    FIRST_PASSWORD_REGEXP,
    SECOND_PASSWORD_REGEXP,
    THIRD_PASSWORD_REGEXP,
    FOURTH_PASSWORD_REGEXP,
    FIFTH_PASSWORD_REGEXP,
    PHONE_REGEXP,
    INTEGER_REGEXP,
    FLOAT_REGEXP,
} from "./regex";

import {
    sanitize
} from "./sanitization";

import { isString } from "../helpers/isString";

// ======================== //
// ====== VALIDATORS ====== //
// ======================== //

export const isEmptyOrNullOrUndefined = (value) => {
    return value == null || value === '';
};

export const isValidEmail = (value) => {
    const sanitizedValue = sanitize(value);
    return EMAIL_REGEXP.test(sanitizedValue);
};

export const isValidName = (value) => {
    const sanitizedValue = sanitize(value, { trim: false });
    return NAME_REGEXP.test(sanitizedValue);
};

export const isValidUsername = (value) => {
    const sanitizedValue = sanitize(value, { allFalse: true });
    return USERNAME_REGEXP.test(sanitizedValue);
};

export const isValidPassword = (value, option) => {
    const sanitizedValue = sanitize(value, { allFalse: true });
    let regex;

    switch (option) {
        case 1:
            regex = FIRST_PASSWORD_REGEXP;
            break;
        case 2:
            regex = SECOND_PASSWORD_REGEXP;
            break;
        case 3:
            regex = THIRD_PASSWORD_REGEXP;
            break;
        case 4:
            regex = FOURTH_PASSWORD_REGEXP;
            break;
        case 5:
            regex = FIFTH_PASSWORD_REGEXP;
            break;
        default:
            regex = PASSWORD_REGEXP;
            break;
    }

    return regex.test(sanitizedValue);
};

export const isValidPhone = (value) => {
    const sanitizedValue = sanitize(value);
    return PHONE_REGEXP.test(sanitizedValue);
};

export const isValidPhoneMoreThanMax = (value, max) => {
    if (typeof value !== 'string' || typeof max !== 'number') return false;
    return value.length > max;
};

export const isValidPhoneLessThanMin = (value, min) => {
    if (typeof value !== 'string' || typeof min !== 'number') return false;
    return value.length < min;
};

export const isValidInteger = (value) => {
    const sanitizedValue = sanitize(value);
    if (INTEGER_REGEXP.test(sanitizedValue)) {
        return Number(sanitizedValue);
    }
    return false;
};

export const isValidFloat = (value) => {
    const sanitizedValue = sanitize(value);
    if (FLOAT_REGEXP.test(sanitizedValue)) {
        return Number(sanitizedValue);
    }
    return false;
};

export const isLengthMoreThanMax = (value, max) => {
    if (typeof value !== 'string' || typeof max !== 'number') {
        return false;
    }
    return value.length > max;
};

export const isLengthLessThanMin = (value, min) => {
    if (typeof value !== 'string' && typeof min !== 'number') return false;
    return value.length < min;
};

export const isValidBoolean = (value) => {
    return typeof value === 'boolean';
};