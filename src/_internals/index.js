
const range = (from, to) => {
  const result = [];
  let n = from;

  while (n < to) {
    result.push(n);
    n += 1;
  }

  return result;
};

/**
 *
 * @param {Function} f Function to run as we iterate through the list
 * @param {Array} x Array to iterate through
 */
const find = (f, x = '') => {
  const len = x.length;
  let idx = 0;

  while (idx < len) {
    if (f(x[idx])) {
      return x[idx];
    }

    idx += 1;
  }

  return false;
};

/**
 * @name isObject
 * @description Verifies the item is an object
 * @param  {Object} x The item to verify
 * @returns {Boolean} Returns true or false if the item is an object
 */
export const isObject = x => Object.prototype.toString.call(x) === '[object Object]';

/**
 * @name extend
 * @description Extends objects into one single object
 * @param {Object} args Arguments can be as many objects as wanted
 * @returns {Object} Returns the combined object
 */
export const extend = (...args) => args.reduce((acc, x) => {
  let key = '';

  for (key in x) {
    acc[key] = x[key];
  }

  return acc;
}, {});

export const getCardType = (ccNumber = '0') => {
  const types = {
    amex: [34, 37],
    discover: [6011, ...range(622126, 622925), ...range(644, 649), 65],
    master: range(50, 55),
    visa: [4]
  };

  for (const cardType in types) {
    const found = find(n => {
      const reg = new RegExp(`^${n}`);

      return reg.test(ccNumber);

    }, types[cardType]);

    if (found) {
      return cardType;
    }
  }

  return 'No Type Found';
};

export const organizeResults = obj => {
  const results = {
    isValid: true
  };
  const convertProp = {
    validNumber: 'cardType',
    validCVN: 'cvnType',
    validDate: 'expired'
  };
  let count = 0;
  let prop = '';

  for (prop in obj) {
    if (!obj[prop].isValid) {
      count++;
    }

    results[convertProp[prop]] = obj[prop].info;
  }

  results.isValid = count === 0;

  return results;
};
