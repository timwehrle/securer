// @flow strict

const URL_UNALLOWED_CHARS: RegExp = /[\s<>\\]/;
const URL_PORT: RegExp = /^([0-9]+)$/;
const URL_TLD: RegExp = /^(?!-)[A-Za-z0-9-]+(?<!-)$/;
const URL_HOSTNAME: RegExp = /^[a-zA-Z0-9.-]+$/;

import isString from "../helpers/isString";

type Options = {
  protocols?: Array<string>,
  requireTld?: boolean,
  requireProtocols?: boolean,
  requireHost?: boolean,
  requirePort?: boolean,
  allowParameters?: boolean,
  allowFragments?: boolean,
  allowProtocolRelativeUrls?: boolean,
  allowDataUrls?: boolean,
  allowUnderscores?: boolean,
  allowTrailingDot?: boolean,
  validateLength?: boolean,
};

const DEFAULT_OPTIONS: Partial<Options> = {
  protocols: ["http:", "https:", "ftp:"],
  requireTld: true,
  requireProtocols: true,
  requireHost: true,
  requirePort: false,
  allowParameters: true,
  allowFragments: true,
  allowProtocolRelativeUrls: true,
  allowDataUrls: false,
  allowUnderscores: true,
  allowTrailingDot: false,
  validateLength: true,
};

/**
 * Check if port is valid
 */

function isValidPort(port: string): boolean {
  const parsedPort = parseInt(port, 10);
  return URL_PORT.test(port) && parsedPort > 0 && parsedPort <= 65535;
}

export default function isValidUrl(
  url: string,
  customOptions?: Options,
): boolean {
  /**
   * Check if url is a string
   */
  if (!isString(url)) {
    return false;
  }

  const options = customOptions
    ? { ...DEFAULT_OPTIONS, ...customOptions }
    : DEFAULT_OPTIONS;

  /**
   * Global instance of URL
   */
  let urlObject: URL;

  try {
    urlObject = new URL(url);
  } catch (error) {
    return false;
  }

  /**
   * Extract properties from the URL object
   */
  const { protocol, hostname, port, href, hash, search } = urlObject;

  /**
   * If protocols are required and protocol is not in
   * the list of allowed protocols, return false
   */
  if (options.requireProtocols && !options.protocols?.includes(protocol)) {
    return false;
  }

  /**
   * If allowUnderscores is not allowed and url contains
   * underscores, return false
   */
  if (!options.allowUnderscores && href.includes("_")) {
    return false;
  }

  /**
   * Extract the top-level domain (TLD) from the hostname
   */
  const tld = hostname.split(".").pop();

  /**
   * If a TLD is required and either not provided, not valid, or numeric, return false
   */
  const isInvalidTld =
    options.requireTld &&
    (!tld || !URL_TLD.test(tld) || !isNaN(tld) || tld.match(/^\d/));
  if (isInvalidTld) {
    return false;
  }

  /**
   * Special handling for certain protocols that are not allowed
   */
  if (
    protocol === "mailto:" ||
    (!options.allowDataUrls && protocol === "data:")
  ) {
    return false;
  }

  /**
   * If the protocol is not in the list of allowed protocols or
   * unallowed characters are present, return false
   */
  if (
    !options.protocols?.includes(protocol) ||
    URL_UNALLOWED_CHARS.test(href)
  ) {
    return false;
  }

  /**
   * If a hostname is required and not provided, return false
   */
  if (options.requireHost && !hostname) {
    return false;
  }

  /**
   * Split the hostname into parts for additional validation
   * If the hostname is not valid or contains parts with leading
   * or trailing hyphens, return false
   */
  const hostnameParts = hostname.split(".");
  if (
    !URL_HOSTNAME.test(hostname) ||
    hostnameParts.length < 2 ||
    hostnameParts.some((part) => part.startsWith("-") || part.endsWith("-"))
  ) {
    return false;
  }

  /**
   * If trailing dots are not allowed and the hostname ends with a dot, return false
   */
  if (!options.allowTrailingDot && hostname.endsWith(".")) {
    return false;
  }

  /**
   * If a port is required and either not provided or not valid, return false
   */
  if (options.requirePort && (port === null || !isValidPort(port))) {
    return false;
  }

  /**
   * If length validation is enabled and the URL length exceeds the limit, return false
   */
  if (options.validateLength && href.length > 2083) {
    return false;
  }

  /**
   * If fragments are not allowed and a hash is present, return false
   */
  if (!options.allowFragments && hash) {
    return false;
  }

  /**
   * If parameters are not allowed and a search string is present, return false
   */
  if (!options.allowParameters && search) {
    return false;
  }

  /**
   * If the protocol is "//:" and protocol-relative URLs are not allowed, return false
   */
  if (protocol === "//:" && !options.allowProtocolRelativeUrls) {
    return false;
  }

  return true;
}
