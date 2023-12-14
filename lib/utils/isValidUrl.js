"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isValidUrl;
var _isString = _interopRequireDefault(require("../helpers/isString"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var URL_UNALLOWED_CHARS = /[\s<>\\]/;
var URL_FRAGMENT = /^[a-zA-Z0-9-]+$/;
var URL_PORT = /^([0-9]+)$/;
var URL_TLD = /^(?!-)[A-Za-z0-9-]+(?<!-)$/;
var URL_HOSTNAME = /^[a-zA-Z0-9.-]+$/;
var DEFAULT_OPTIONS = {
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
  var parsedPort = parseInt(port, 10);
  return URL_PORT.test(port) && parsedPort > 0 && parsedPort <= 65535;
}
function isValidUrl(url, customOptions) {
  if (!(0, _isString["default"])(url)) {
    return false;
  }
  var options = customOptions ? _objectSpread(_objectSpread({}, DEFAULT_OPTIONS), customOptions) : DEFAULT_OPTIONS;
  var urlObject;
  try {
    urlObject = new URL(url);
  } catch (error) {
    return false;
  }
  var _urlObject = urlObject,
    protocol = _urlObject.protocol,
    hostname = _urlObject.hostname,
    port = _urlObject.port,
    href = _urlObject.href,
    hash = _urlObject.hash,
    search = _urlObject.search;
  if (options.requireProtocols && !options.protocols.includes(protocol)) {
    return false;
  }
  if (!options.allowUnderscores && href.includes('_')) {
    return false;
  }
  var tld = hostname.split('.').pop();
  var isInvalidTld = options.requireTld && (!tld || !URL_TLD.test(tld) || !isNaN(tld) || tld.match(/^\d/));
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
  var hostnameParts = hostname.split('.');
  if (!URL_HOSTNAME.test(hostname) || hostnameParts.length < 2 || hostnameParts.some(function (part) {
    return part.startsWith('-') || part.endsWith('-');
  })) {
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