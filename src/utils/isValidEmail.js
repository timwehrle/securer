import isString from "../helpers/isString";
import isOption from "../helpers/isOption";

const DEFAULT_OPTIONS = {
    requireTld: true,
    allowUnderscores: true,
    allowPlusSign: true,
    validateLength: true
}

export default function isValidEmail(email, customOptions) {
    if (!isString(email)) {
        return false;
    };

    isOption(customOptions, DEFAULT_OPTIONS);
    const options = { ...DEFAULT_OPTIONS, ...customOptions};

    try {
        if(!email.contains('@')) {
            return false;
        }
       
        const [localePart, domain] = email.split('@');

        if (options.validateLength && localePart.length > 64 || domain.length > 254) {
            return false;
        }

        if (localePart.startsWith('.') || localePart.endsWith('.') || localePart.includes('..')) {
            return false;
        }

        
        


    } catch (error) {
        return false;
    }

}