import { getCardType, isObject } from '../_internals/index';

const numberTypeCheck = card => {
  if (typeof card !== 'string') {
    throw new TypeError('number is not the proper type String');
  }

  return false;
};

const luhnChk = value => { // eslint-disable-line
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

const cNumber = (card = '0') => {
  const n = isObject(card) ? card.number : card;

  numberTypeCheck(n);

  const sanitizedNumber = n.replace(/\W/g, '');
  const valid = Boolean(luhnChk(sanitizedNumber));

  return {
    isValid: valid,
    info: valid ? getCardType(sanitizedNumber) : 'Invalid Card Number'
  };
};

export default cNumber;
