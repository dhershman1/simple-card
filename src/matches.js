import and from 'kyanite/and'
import not from 'kyanite/not'
import or from 'kyanite/or'

import getCardType from './_internals/getCardType'
import typeCheck from './_internals/typeCheck'

/**
 * @name matches
 * @since v2.0.0
 * @category Function
 * @description
 * Validates that the card type (generated from the card number) matches and is valid with the cvn provided
 * @param {String|Number} cvn The string cvn we want to validate
 * @param {String|Number} card The string card we want to validate with
 * @return {Boolean} A boolean based on if the match is valid or not
 *
 * @example
 *
 * matches('333', '4111111111111111') // => { isValid: true, match: 'card type matches cvn' }
 * matches(333, 4111111111111111) // => { isValid: true, match: 'card type matches cvn' }
 *
 * // Assuming that amexCardNumber is defined as an American Express Credit Card Number
 * matches('4444', amexCardNumber) // => { isValid: true, match: 'card type matches cvn' }
 * matches(4444, amexCardNumber) // => { isValid: true, match: 'card type matches cvn' }
 *
 * matches('4444', '4111111111111111') // => { isValid: false, match: 'cvn does not match card type' }
 * matches(4444, 4111111111111111) // => { isValid: false, match: 'cvn does not match card type' }
 */
export default (cvn, card) => {
  if (or(!typeCheck(cvn), !typeCheck(card))) {
    throw new TypeError('cvn and card number should be string or number types')
  }

  const cvnLen = String(cvn).replace(/\D/g, '').length
  const cardType = getCardType(String(card).replace(/\D/g, ''))
  const isValid = not(or(and(cvnLen === 4, cardType !== 'amex'), and(cvnLen === 3, cardType === 'amex')))

  return {
    isValid,
    match: !isValid ? 'cvn does not match card type' : 'card type matches cvn'
  }
}
