// @flow strict

import isString from "../helpers/isString";

const EMAIL_ALLOWED_CHARS: RegExp = /^[!#$%&'*+\-/=?^_`{|}~\w.]+$/;
const EMAIL_ALLOWED_DOMAIN_CHARS: RegExp = /^[a-zA-Z0-9.-]+$/;

type Options = {
  requireTld?: boolean,
  allowUnderscores?: boolean,
  allowPlusSign?: boolean,
  allowComments?: boolean,
  allowQuotations?: boolean,
  validateLength?: boolean,
};

const DEFAULT_OPTIONS: Partial<Options> = {
  requireTld: true,
  allowUnderscores: true,
  allowPlusSign: true,
  allowComments: true,
  allowQuotations: true,
  validateLength: true,
};

export default function isValidEmail(
  email: string,
  customOptions?: Options,
): boolean {
  /**
   * Check if email is a string and contains '@'
   */
  if (!isString(email) || !email.includes("@")) {
    return false;
  }

  const options = customOptions
    ? { ...DEFAULT_OPTIONS, ...customOptions }
    : DEFAULT_OPTIONS;

  /**
   * Remove all whitespaces from email
   */
  let sanitizedEmail = email.replace(/\s/g, "") && email.trim();

  /**
   * If comments are allowed and present, remove them since
   * they are not important for emails
   */
  if (
    options.allowComments &&
    sanitizedEmail.includes("(") &&
    sanitizedEmail.includes(")")
  ) {
    sanitizedEmail = sanitizedEmail.replace(/\(.*?\)/g, "");
  }

  /**
   * Split the email into local part and domain part.
   * Domain can contain more than one '@'. The domain
   * is always behind the last '@' in the email
   */
  const emailParts = sanitizedEmail.split("@");
  const domain = emailParts.pop();
  const localPart = emailParts.join("@");

  /**
   * If validateLength is true, check if the email is longer
   * than the maximum characters allowed for an email
   * https://datatracker.ietf.org/doc/html/rfc3696#section-3
   */
  if (
    options.validateLength &&
    (localPart.length > 64 ||
      domain.length > 254 ||
      sanitizedEmail.length > 320)
  ) {
    return false;
  }

  /**
   * If domain doesn't include a dot or starts or
   * ends with a dot, return false
   */
  if (!domain.includes(".") || domain.startsWith(".") || domain.endsWith(".")) {
    return false;
  }

  /**
   * Disallow brackets in email since they lack of security
   */
  if (domain.includes("[") && domain.includes("]")) {
    return false;
  }

  /**
   * If domain starts or ends with a hyphen and doesn't
   * contain only allowed characters, return false
   */
  if (
    domain.startsWith("-") ||
    domain.endsWith("-") ||
    !EMAIL_ALLOWED_DOMAIN_CHARS.test(domain)
  ) {
    return false;
  }

  /**
   * If requireTld is true and domain doesn't contain at least
   * 2 characters behind the last dot, return false
   */
  if (options.requireTld && !/\.+[a-zA-Z]{2,}/.test(domain)) {
    return false;
  }

  /**
   * It's a quoted string if the local part starts and ends with a quote
   */
  const isQuotedString = localPart.startsWith('"') && localPart.endsWith('"');
  // If it's not a quoted string, check if it contains unallowed characters
  if (!isQuotedString) {
    if (
      localPart.startsWith(".") ||
      localPart.endsWith(".") ||
      /\.{2,}/.test(localPart)
    ) {
      return false;
    }
    if (!EMAIL_ALLOWED_CHARS.test(localPart)) {
      return false;
    }
  }

  /**
   * If local part only contains one ( or ) return false
   */
  if (localPart.includes("(") !== localPart.includes(")")) {
    return false;
  }

  return true;
}