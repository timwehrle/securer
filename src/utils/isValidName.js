// @flow strict

import isString from "../helpers/isString";

const NOT_ALLOWED_CHARS: RegExp = /[!$%&*()_+|~=\\#{}\[\]:";<>?,.\/]/;

type Options = {
  minLength?: number,
  maxLength?: number,
  allowAdditionalChars?: boolean,
};

const DEFAULT_OPTIONS: Partial<Options> = {
  minLength: 1,
  maxLength: 50,
  allowAdditionalChars: false,
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

  if (options.minLength !== undefined && name.length < options.minLength) {
    return false;
  }

  if (options.maxLength !== undefined && name.length > options.maxLength) {
    return false;
  }

  if (!options.allowAdditionalChars && NOT_ALLOWED_CHARS.test(name)) {
    return false;
  }

  return true;
}
