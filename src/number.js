import getCardType from './_internals/getCardType'
import typeCheck from './_internals/typeCheck'

const luhnChk = value => {
  const numArr = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]
  let len = value.length
  let bit = 1
  let sum = 0
  let num = 0

  while (len) {
    num = parseInt(value.charAt(--len), 10)
    bit ^= 1
    sum += bit ? numArr[num] : num
  }

  return sum && sum % 10 === 0
}

/**
 * @name number
 * @since v2.0.0
 * @category Function
 * @description
 * Validates that the card number is an actual valid number with a luhn algorithm. As well as finds the cards type
 * @param {String|Number} card The string card we want to validate
 * @return {Object} An object containing a isValid boolean and some info
 *
 * @example
 * number('4111111111111111') // => { isValid: true, cardType: 'visa' }
 * number(4111111111111111) // => { isValid: true, cardType: 'visa' }
 * number('33222123') // => { isValid: false, cardType: 'Invalid Card Number' }
 * number(33222123) // => { isValid: false, cardType: 'Invalid Card Number' }
 */
const cNumber = card => {
  if (!typeCheck(card)) {
    throw new TypeError('number should be a string or number type')
  }

  const sanitized = String(card).replace(/\D/g, '')
  const isValid = Boolean(luhnChk(sanitized))

  return {
    isValid,
    cardType: isValid ? getCardType(sanitized) : 'Invalid Card Number'
  }
}

export default cNumber
