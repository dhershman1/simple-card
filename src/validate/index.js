import { isObject, organizeResults} from '../_internals';
import validCVN from '../cvn';
import validDate from '../expired';
import validMatch from '../matches';
import validNumber from '../number';

/**
 * @name validate
 * @since v2.0.0
 * @description Validates a credit card object comparing and validating each piece of data on the card passed in
 * @param {Object} card The card Object that we wish to be validated
 * @returns {Object} Returns an object of information about the test and whether or not it passed
 *
 * @example
 * const test = simpleCard({
    number: '4111111111111111',
    cvn: '333',
    date: '09/20'
  }); // => { isValid: true, cardType: 'visa', cvnType: 'norm', expired: false }
 */
const simpleCard = card => {
  if (!isObject(card)) {
    throw new TypeError('Must send full card object to run full validation');
  }

  return organizeResults({
    number: validNumber(card.number),
    cvn: validCVN(card.cvn),
    expired: validDate(card.date)
  }, validMatch(card.cvn, card.number));
};

export default simpleCard;
