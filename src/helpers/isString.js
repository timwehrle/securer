/**
 * Copyright (c) 2023 Tim Wehrle.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

export default function isString(input: mixed): boolean {
  return (
    (typeof input === "string" || input instanceof String) &&
    input.trim() !== ""
  );
}
