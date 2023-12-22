// @flow strict

import isString from "../helpers/isString";

const NOT_ALLOWED_CHARS: RegExp = /[!$%&*()_+|~=\\#{}[\]:";<>?,/]/;

type Options = {
  minLength?: number,
  maxLength?: number,
  allowAdditionalChars?: boolean,
  allowNumbers?: boolean,
};

const DEFAULT_OPTIONS: Partial<Options> = {
  minLength: 2,
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

  /**
   * A name doesn't contain numbers (unless explicitly allowed)
   */
  const containsNumbers = /\d/.test(name);
  if (!options.allowNumbers && containsNumbers) {
    return false;
  }

  /**
   * Remove leading and trailing whitespaces
   */
  const trimmedName = name.trim();

  /**
   * If name is undefined or under the minimum lenght
   * return false
   */
  if (
    options.minLength !== undefined &&
    trimmedName.length < options.minLength
  ) {
    return false;
  }

  /**
   * If name is undefined or over the maximum lenght
   * return false
   */
  if (
    options.maxLength !== undefined &&
    trimmedName.length > options.maxLength
  ) {
    return false;
  }

  /**
   * If allowAdditionalChars is false and name contains
   * not allowed characters, return false
   */
  if (!options.allowAdditionalChars && NOT_ALLOWED_CHARS.test(trimmedName)) {
    return false;
  }

  return true;
}
