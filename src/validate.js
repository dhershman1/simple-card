import assign from 'kyanite/assign'
import every from 'kyanite/every'
import type from 'kyanite/type'

import validCVN from './cvn'
import validDate from './expired'
import validMatch from './matches'
import validNumber from './number'

/**
 * @name validate
 * @since v2.0.0
 * @category Function
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
  if (type(card) !== 'Object') {
    throw new TypeError('Must send full card object to run full validation')
  }

  const validationResults = [
    validNumber(card.number),
    validCVN(card.cvn),
    validDate(card.date),
    validMatch(card.cvn, card.number)
  ]

  return assign({}, ...validationResults, { isValid: every(x => x.isValid, validationResults) })
}

export default simpleCard
