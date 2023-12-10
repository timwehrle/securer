export default function checkOptions(options, defaults) {
  for (let key in options) {
    if (!defaults.hasOwnProperty(key)) {
      throw new Error(`Invalid option provided: ${key}.`);
    }
  }
}