// @flow strict

import isString from "../helpers/isString";

const EMAIL_ALLOWED_CHARS: RegExp = /^[!#$%&'*+\-/=?^_`{|}~\w]+$/;
const EMAIL_ALLOWED_DOMAIN_CHARS: RegExp = /^[a-zA-Z0-9.-]+$/;

type Options = {
    requireTld: boolean,
    allowUnderscores: boolean,
    allowPlusSign: boolean,
    allowComments: boolean,
    allowQuotations: boolean,
    validateLength: boolean,
}

const DEFAULT_OPTIONS: Options = {
    requireTld: true,
    allowUnderscores: true,
    allowPlusSign: true,
    allowComments: true,
    allowQuotations: true,
    validateLength: true
}

export default function isValidEmail(email: string, customOptions?: Options): boolean {
    if (!isString(email) || !email.includes('@')) {
        return false;
    }

    const options = customOptions ? { ...DEFAULT_OPTIONS, ...customOptions} : DEFAULT_OPTIONS;

    let sanitizedEmail = email.replace(/\s/g, '');

    if (options.allowComments && sanitizedEmail.includes('(') && sanitizedEmail.includes(')')) {
        sanitizedEmail = sanitizedEmail.replace(/\(.*?\)/g, '');
    }

    let emailParts = sanitizedEmail.split('@');
    const domain = emailParts.pop();
    const localPart = emailParts.join('@');

    if (options.validateLength && (localPart.length > 64 || domain.length > 254 || sanitizedEmail.length > 320)) {
        return false;
    }

    if (!domain.includes('.') || domain.startsWith('.') || domain.endsWith('.')) {
        return false;
    }

    if (domain.includes("[") && domain.includes("]")) {
        return false;
    }

    if (domain.startsWith('-') || domain.endsWith('-') && !EMAIL_ALLOWED_DOMAIN_CHARS.test(domain)) {
        return false;
    }

    if (options.requireTld && !/\.+[a-zA-Z]{2,}/.test(domain)) {
        return false;
    }

    let isQuotedString = localPart.startsWith('"') && localPart.endsWith('"');
    if (!isQuotedString) {
        if (localPart.startsWith('.') || localPart.endsWith('.') || /\.{2,}/.test(localPart)) {
            return false;
        } 
        if (!EMAIL_ALLOWED_CHARS.test(localPart)) {
            return false;
        }
    }

    if (localPart.includes('(') !== localPart.includes(')')) {
        return false;
    }

    return true;

}