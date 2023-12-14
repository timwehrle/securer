"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isValidEmail;
var _isString = _interopRequireDefault(require("../helpers/isString"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var EMAIL_ALLOWED_CHARS = /^[!#$%&'*+\-/=?^_`{|}~\w]+$/;
var EMAIL_ALLOWED_DOMAIN_CHARS = /^[a-zA-Z0-9.-]+$/;
var DEFAULT_OPTIONS = {
  requireTld: true,
  allowUnderscores: true,
  allowPlusSign: true,
  allowComments: true,
  allowQuotations: true,
  validateLength: true
};
function isValidEmail(email, customOptions) {
  /**
   * Check if email is a string and contains '@'
   */
  if (!(0, _isString["default"])(email) || !email.includes('@')) {
    return false;
  }
  var options = customOptions ? _objectSpread(_objectSpread({}, DEFAULT_OPTIONS), customOptions) : DEFAULT_OPTIONS;

  /**
   * Remove all whitespaces from email
   */
  var sanitizedEmail = email.replace(/\s/g, '');

  /**
   * If comments are allowed and present, remove them since
   * they are not important for emails
   */
  if (options.allowComments && sanitizedEmail.includes('(') && sanitizedEmail.includes(')')) {
    sanitizedEmail = sanitizedEmail.replace(/\(.*?\)/g, '');
  }

  /**
   * Split the email into local part and domain part.
   * Domain can contain more than one '@'. The domain
   * is always behind the last '@' in the email
   */
  var emailParts = sanitizedEmail.split('@');
  var domain = emailParts.pop();
  var localPart = emailParts.join('@');

  /**
   * If validateLength is true, check if the email is longer
   * than the maximum characters allowed for an email
   * https://datatracker.ietf.org/doc/html/rfc3696#section-3
   */
  if (options.validateLength && (localPart.length > 64 || domain.length > 254 || sanitizedEmail.length > 320)) {
    return false;
  }

  /**
   * If domain doesn't include a dot or starts or
   * ends with a dot, return false
   */
  if (!domain.includes('.') || domain.startsWith('.') || domain.endsWith('.')) {
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
  if (domain.startsWith('-') || domain.endsWith('-') && !EMAIL_ALLOWED_DOMAIN_CHARS.test(domain)) {
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
  var isQuotedString = localPart.startsWith('"') && localPart.endsWith('"');
  // If it's not a quoted string, check if it contains unallowed characters
  if (!isQuotedString) {
    if (localPart.startsWith('.') || localPart.endsWith('.') || /\.{2,}/.test(localPart)) {
      return false;
    }
    if (!EMAIL_ALLOWED_CHARS.test(localPart)) {
      return false;
    }
  }

  /**
   * If local part only contains one ( or ) return false
   */
  if (localPart.includes('(') !== localPart.includes(')')) {
    return false;
  }
  return true;
}