/**
 * Copyright (c) 2023 Tim Wehrle.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import isString from "../helpers/isString";

type Options = {
  minLength?: number,
  maxLength?: number,
  escapeHtml?: boolean,
};

const DEFAULT_OPTIONS: Partial<Options> = {
  minLength: 10,
  maxLength: 500,
  escapeHtml: true,
};

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default function isValidMessage(
  message: string,
  customOptions?: Options,
): boolean {
  if (!isString(message)) {
    return false;
  }

  const options = customOptions
    ? { ...DEFAULT_OPTIONS, ...customOptions }
    : DEFAULT_OPTIONS;

  const processedMessage = options.escapeHtml ? escapeHtml(message) : message;

  if (
    options.minLength !== undefined &&
    processedMessage.length < options.minLength
  ) {
    return false;
  }

  if (
    options.maxLength !== undefined &&
    processedMessage.length > options.maxLength
  ) {
    return false;
  }

  return true;
}
