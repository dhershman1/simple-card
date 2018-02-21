import { getCardType, typeCheck } from '../_internals';

const luhnChk = value => { // eslint-disable-line complexity
  const numArr = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
  let len = value.length;
  let bit = 1;
  let sum = 0;
  let num = 0;

  while (len) {
    num = parseInt(value.charAt(--len), 10);
    sum += (bit ^= 1) ? numArr[num] : num;
  }

  return sum && sum % 10 === 0;
};

/**
 * @name number
 * @since v2.0.0
 * @description
 * Validates that the card number is an actual valid number with a luhn algorithm. As well as finds the cards type
 * @param {String|Number} card The string card we want to validate
 * @return {Object} An object containing a isValid boolean and some info
 *
 * @example
 * number('4111111111111111'); // => { isValid: true, info: 'visa' }
 * number('4444'); // => { isValid: false, info: 'Invalid Card Number' }
 */
const cNumber = card => {
  if (!typeCheck(card)) {
    throw new TypeError('number should be a string or number type');
  }

  const sanitizedNumber = String(card).replace(/\W/g, '');
  const valid = Boolean(luhnChk(sanitizedNumber));

  return {
    isValid: valid,
    info: valid ? getCardType(sanitizedNumber) : 'Invalid Card Number'
  };
};

export default cNumber;
