import { getCardType, typeCheck } from '../_internals';

const invalidAmex = (cvn, cardType) => cvn.length === 4 && cardType !== 'amex';

const invalidNorm = (cvn, cardType) => cvn.length === 3 && cardType === 'amex';

const match = (cvn, type) => {
  if (invalidAmex(cvn, type)) {
    return false;
  }

  if (invalidNorm(cvn, type)) {
    return false;
  }

  return true;
};

/**
 * @name matches
 * @since v2.0.0
 * @description
 * Validates that the card type (generated from the card number) matches and is valid with the cvn provided
 * @param {String|Number} cvn The string cvn we want to validate
 * @param {String|Number} card The string card we want to validate with
 * @return {Boolean} A boolean based on if the match is valid or not
 *
 * @example
 * matches('333', '4111111111111111'); // => true
 * matches('4444', '4111111111111111'); // => false
 */
export default (cvn, card) => {
  if (!typeCheck(cvn) || !typeCheck(card)) {
    throw new TypeError('cvn and card number should be string or number types');
  }

  return match(String(cvn).replace(/\W/g, ''), getCardType(String(card).replace(/\W/g, '')));
};
