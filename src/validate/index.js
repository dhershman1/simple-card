import validCVN from '../cvn';
import validDate from '../expired';
import validMatch from '../matches';
import validNumber from '../number';

// Go through and make sure every validation result came back valid
const allValid = (number, cvn, expired) =>
  number.isValid && cvn.isValid && expired.isValid;

// Builds out our nice readable object
const organizeResults = (number, cvn, expired) => {
  const matches = validMatch(cvn, number);

  return {
    isValid: allValid(number, cvn, expired) && matches,
    cardType: number.info,
    cvnType: cvn.info,
    expired: expired.info,
    info: !matches ? 'CVN does not match the found card type' : ''
  };
};

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
  if (Object.prototype.toString.call(card) !== '[object Object]') {
    throw new TypeError('Must send full card object to run full validation');
  }

  return organizeResults(validNumber(card.number), validCVN(card.cvn), validDate(card.date));
};

export default simpleCard;
