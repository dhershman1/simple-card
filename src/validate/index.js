import validCVN from '../cvn';
import validDate from '../expired';
import validMatch from '../matches';
import validNumber from '../number';


// Builds out our nice readable object
const validation = ({ number, cvn, date }) => {
  const validationResults = [
    validNumber(number),
    validCVN(cvn),
    validDate(date),
    validMatch(cvn, number)
  ];
  let count = 0;

  const results = validationResults.reduce((acc, r) => {
    const keys = Object.keys(r);
    const currKey = keys[keys.length - 1];

    if (!r.isValid) {
      count++;
    }

    acc[currKey] = r[currKey];

    return acc;
  }, {});

  results.isValid = count === 0;

  return results;
};

/**
 * @name validate
 * @since v2.0.0
 * @description Validates a credit card object comparing and validating each piece of data on the card passed in
 * @param {Object} card The card Object that we wish to be validated
 * @returns {Object} Returns an object of information about the test and whether or not it passed
 *
 * @example
 * const test = validate({
    number: '4111111111111111',
    cvn: '333',
    date: '09/20'
  }); // => { isValid: true, cardType: 'visa', cvnType: 'norm', expired: false }

  validate({
    number: '4111111111111111',
    cvn: '3432',
    date: currentDate // A simple var which is a string for the current date
  }); // => { isValid: false, cardType: 'visa', cvnType: 'norm', expired: 'Not Expired', info: 'CVN does not match the found card type' }
 */
const simpleCard = card => {
  if (Object.prototype.toString.call(card) !== '[object Object]') {
    throw new TypeError('Must send full card object to run full validation');
  }

  return validation(card);
};

export default simpleCard;
