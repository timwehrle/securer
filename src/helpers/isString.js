// @flow strict

export default function isString(input: mixed): boolean {
    return typeof input === 'string' || input instanceof String;
}