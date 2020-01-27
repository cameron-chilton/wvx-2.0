
/**
 * Removes any key/value pairs from the given object who's values are "falsy".
 * Similar to lodash's compact method this will however operate on objects.
 *
 * NOTE:
 * - Falsy meaning the value will not pass JavaScript's Boolean test,
 * with an exception made for the value 'false'.
 *   - e.g. null, undefined, NaN, 0
 * - Will only inspect one level deep on the main object passed in.
 *
 * @param {object} obj The object you want to remove entries from
 * @param {?object} options Conditional removal options
 *
 * Available Options:
 * @param {?boolean} keepFalse When erasing empty fields, values of
 *                   boolean 'false' should not be removed (Default: true)
 * @param {?boolean} keepZero When erasing empty fields, values of
 *                   zero (0) should not be removed (Default: false)
 */
export const compactObj = (obj, options) => {
  const defaultOptions = {
    keepFalse: true,
    keepZero: false,
  };
  options = { ...defaultOptions, ...options };

  const retVal = {};
  for (const key in obj) {
    if (obj[key]) {
      retVal[key] = obj[key];
    }
    if (options.keepFalse && obj[key] === false) {
      retVal[key] = obj[key];
    }
    if (options.keepZero && obj[key] === 0) {
      retVal[key] = obj[key];
    }
  }

  return retVal;
};
