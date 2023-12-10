const URL_UNALLOWED_CHARS = /[\s<>\\]/;
const URL_FRAGMENT = /^[a-zA-Z0-9-]+$/;
const URL_PORT = /^([0-9]+)$/;
const URL_TLD = /^(?!-)[A-Za-z0-9-]+(?<!-)$/;
const URL_HOSTNAME = /^[a-zA-Z0-9.-]+$/;
import isString from "../helpers/isString";
const DEFAULT_OPTIONS = {
  protocols: ['http:', 'https:', 'ftp:'],
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
  validateLength: true
};
function isValidPort(port) {
  const parsedPort = parseInt(port, 10);
  return URL_PORT.test(port) && parsedPort > 0 && parsedPort <= 65535;
}
export default function isValidUrl(url, customOptions) {
  if (!isString(url)) {
    return false;
  }
  const options = customOptions ? {
    ...DEFAULT_OPTIONS,
    ...customOptions
  } : DEFAULT_OPTIONS;
  let urlObject;
  try {
    urlObject = new URL(url);
  } catch (error) {
    return false;
  }
  const {
    protocol,
    hostname,
    port,
    href,
    hash,
    search
  } = urlObject;
  if (options.requireProtocols && !options.protocols.includes(protocol)) {
    return false;
  }
  if (!options.allowUnderscores && href.includes('_')) {
    return false;
  }
  const tld = hostname.split('.').pop();
  const isInvalidTld = options.requireTld && (!tld || !URL_TLD.test(tld) || !isNaN(tld) || tld.match(/^\d/));
  if (isInvalidTld) {
    return false;
  }
  if (protocol === 'mailto:' || !options.allowDataUrls && protocol === 'data:') {
    return false;
  }
  if (!options.protocols.includes(protocol) || URL_UNALLOWED_CHARS.test(href)) {
    return false;
  }
  if (options.requireHost && !hostname) {
    return false;
  }
  const hostnameParts = hostname.split('.');
  if (!URL_HOSTNAME.test(hostname) || hostnameParts.length < 2 || hostnameParts.some(part => part.startsWith('-') || part.endsWith('-'))) {
    return false;
  }
  if (!options.allowTrailingDot && hostname.endsWith('.')) {
    return false;
  }
  if (options.requirePort && (port === null || !isValidPort(port))) {
    return false;
  }
  if (options.validateLength && href.length > 2083) {
    return false;
  }
  if (!options.allowFragments && hash) {
    return false;
  }
  if (!options.allowParameters && search) {
    return false;
  }
  if (protocol === '//:' && !options.allowProtocolRelativeUrls) {
    return false;
  }
  return true;
}