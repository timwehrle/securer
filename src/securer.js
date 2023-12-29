/**
 * Copyright (c) 2023 Tim Wehrle.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import isValidUrl from "./utils/isValidUrl";
import isValidEmail from "./utils/isValidEmail";
import isValidMessage from "./utils/isValidMessage";
import isValidName from "./utils/isValidName";

const version = "1.0.0";

const secure = {
  isValidUrl,
  isValidEmail,
  isValidMessage,
  isValidName,
  version,
};

export default secure;
