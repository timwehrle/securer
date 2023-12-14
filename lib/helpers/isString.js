"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isString;
function isString(input) {
  return typeof input === 'string' || input instanceof String;
}