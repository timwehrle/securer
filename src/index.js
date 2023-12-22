/* eslint-disable no-unused-vars */
import isValidUrl from "./utils/isValidUrl";
// @flow strict

import isValidEmail from "./utils/isValidEmail";
import isValidMessage from "./utils/isValidMessage";
import isValidName from "./utils/isValidName";

const version = "0.0.1";

const secure = {
  isValidUrl,
  isValidEmail,
  isValidMessage,
  isValidName,
  version,
};

export default secure;
