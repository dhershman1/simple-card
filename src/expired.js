import type from 'kyanite/type'

const fullYear = year => {
  if (year.length === 2) {
    return `${String(new Date().getFullYear()).slice(0, 2)}${year}`
  }

  return year
}

/**
 * @name expired
 * @since v2.0.0
 * @category Function
 * @description
 * Validates that the string date passed in is indeed a valid date and not an old one
 * @param {String} date The string date we want to validate
 * @return {Object} An object containing a isValid boolean and some info
 *
 * @example
 * // Assuming "currDate" is a variable that holds the current date in a XX/XX format
 * expired(currDate) // => { isValid: true, isExpired: false }
 * expired('01/18') // => { isValid: false, isExpired: true }
 */
const expired = date => {
  if (type(date) !== 'String') {
    throw new TypeError('date should be a string type')
  }
  const dateObj = new Date()
  const [month, year] = date.replace(/\s/g, '').split(/\W/g)
  const currDate = new Date(`${dateObj.getMonth() + 1}/1/${dateObj.getFullYear()}`)
  const expireDate = new Date(`${month}/1/${fullYear(year)}`)
  const isExpired = !isNaN(expireDate) ? currDate > expireDate : true

  return {
    isValid: !isExpired,
    isExpired
  }
}

export default expired
