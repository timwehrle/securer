import isString from "../helpers/isString";
import isOption from "../helpers/isOption";

const DEFAULT_OPTIONS = {
    requireTld: true,
    allowUnderscores: true,
    allowPlusSign: true,
    allowComments: true,
    allowQuotations: true,
    validateLength: true
}

export default function isValidEmail(email, customOptions) {
    if (!isString(email) || !email.includes('@')) {
        return false;
    }

    isOption(customOptions, DEFAULT_OPTIONS);
    const options = { ...DEFAULT_OPTIONS, ...customOptions};

    email = email.replace(/\s/g, '');

    if (options.allowComments && email.includes('(') && email.includes(')')) {
        email = email.replace(/\(.*?\)/g, '');
    }

    let emailParts = email.split('@');
    const domain = emailParts.pop();
    const localPart = emailParts.join('@');

    if (options.validateLength && (localPart.length > 64 || domain.length > 254 || email.length > 320)) {
        return false;
    }

    if (!domain.includes('.') || domain.startsWith('.') || domain.endsWith('.')) {
        return false;
    }

    if (domain.includes("[") && domain.includes("]")) {
        return false;
    }

    if (domain.startsWith('-') || domain.endsWith('-')) {
        return false;
    }

    if (options.requireTld && !/\.+[a-zA-Z]/.test(domain)) {
        return false;
    }

    let isQuotedString = localPart.startsWith('"') && localPart.endsWith('"');
    if (!isQuotedString) {
        if (localPart.startsWith('.') || localPart.endsWith('.') || /\.{2,}/.test(localPart)) {
            return false;
        }
    }

    if (localPart.includes('(') !== localPart.includes(')')) {
        return false;
    }

    return true;

}