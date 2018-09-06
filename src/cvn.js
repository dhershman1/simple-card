import typeCheck from './_internals/typeCheck'

/**
 * @name cvn
 * @since v2.0.0
 * @category Function
 * @description
 * Validates that the string cvn passed in is a valid cvn number
 * @param {String|Number} cvnCode The string cvn we want to validate
 * @return {Object} An object containing a isValid boolean and some info
 *
 * @example
 * cvn('333') // => { isValid: true, cvnType: 'norm' }
 * cvn(333) // => { isValid: true, cvnType: 'norm' }
 * cvn('4444') // => { isValid: true, cvnType: 'amex' }
 * cvn(4444) // => { isValid: true, cvnType: 'amex' }
 * cvn('55555') // => { isValid: false, cvnType: 'Invalid CVN Code' }
 * cvn(55555) // => { isValid: false, cvnType: 'Invalid CVN Code' }
 */
export default cvnCode => {
  if (!typeCheck(cvnCode)) {
    throw new TypeError('cvn should be a string or number type')
  }

  const sanitized = String(cvnCode).replace(/\D/g, '')
  let type = 'Invalid CVN Code'

  if (sanitized.length === 3) {
    type = 'norm'
  } else if (sanitized.length === 4) {
    type = 'amex'
  }

  return {
    isValid: type !== 'Invalid CVN Code',
    cvnType: type
  }
}
