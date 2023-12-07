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

        
       

    } catch (error) {
        return false;
    }

}