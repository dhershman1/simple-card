import { extend, isObject, organizeResults, validateType} from './_internals/index';
import validCVN from './validation/cvn';
import validDate from './validation/expiration';
import validNumber from './validation/cnumber';

const validationMethods = {
  validNumber,
  validCVN,
  validDate
};

const normalizeObject = d => {
  if (isObject(d)) {
    return extend({
      number: '0',
      cvn: '0',
      expire: false
    }, d);
  }

  return d;
};

/**
 * @name simpleCard
 * @description Validates a credit card object, or individual pieces of the card that are sent in by string or partial obejcts
 * @param {Object} card The card Object that we wish to be validated
 * @returns {Object} Returns an object of information about the test and whether or not it passed
 *
 * @example
 * const test = simpleCard({
    number: '4111111111111111',
    cvn: '333',
    expire: '09/20'
  }); // => { isValid: true, cardType: 'visa', cvnType: 'norm', expired: false }

  const test = simpleCard('4111111111111111'); // => { isValid: true, cardType: 'visa' }

  const test = simpleCard({
    number: '4111 1111 1111 1111',
    cvn: '333'
  }); // => { isValid: false, cardType: 'visa', cvnType: 'norm', expired: 'No Data Provided' }
 */
const simpleCard = card => {
  const normalCard = normalizeObject(card);
  const results = {};

  if (!isObject(normalCard)) {
    return validationMethods[validateType(normalCard)](normalCard);
  }

  for (const prop in validationMethods) {
    results[prop] = validationMethods[prop](normalCard, results.validNumber);
  }

  return organizeResults(results);
};

export default simpleCard;
