import { getCardType, isObject, luhnChk } from '../_internals/index';

const cNumber = (card = '0') => {
  const n = isObject(card) ? card.number : card;
  const sanitizedNumber = n.replace(/\W/g, '');
  const valid = Boolean(luhnChk(sanitizedNumber));

  return {
    isValid: valid,
    info: valid ? getCardType(sanitizedNumber) : 'Invalid Card Number'
  };
};

export default cNumber;
