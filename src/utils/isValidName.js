// @flow strict

import isString from "../helpers/isString";

const NOT_ALLOWED_CHARS: RegExp = /[!$%&*()_+|~=\\#{}\[\]:";<>?,\/]/;

type Options = {
  minLength?: number,
  maxLength?: number,
  allowAdditionalChars?: boolean,
  allowNumbers?: boolean,
};

const DEFAULT_OPTIONS: Partial<Options> = {
  minLength: 1,
  maxLength: 50,
  allowAdditionalChars: false,
  allowNumbers: false,
};

export default function isValidName(
  name: string,
  customOptions?: Options,
): boolean {
  if (!isString(name)) {
    return false;
  }

  const options = customOptions
    ? { ...DEFAULT_OPTIONS, ...customOptions }
    : DEFAULT_OPTIONS;

  const containsNumbers = /\d/.test(name);
  if (!options.allowNumbers && containsNumbers) {
    return false;
  }
  
  const trimmedName = name.trim();

  if (
    options.minLength !== undefined &&
    trimmedName.length < options.minLength
  ) {
    return false;
  }

  if (
    options.maxLength !== undefined &&
    trimmedName.length > options.maxLength
  ) {
    return false;
  }

  if (!options.allowAdditionalChars && NOT_ALLOWED_CHARS.test(trimmedName)) {
    return false;
  }

  return true;
}
