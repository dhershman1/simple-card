const fullYear = year => {
  if (year.length === 2) {
    return `20${year}`
  }

  return year
}

const generateDate = () => {
  const dateObj = new Date()

  return new Date(`${dateObj.getMonth() + 1}/1/${dateObj.getFullYear()}`)
}

const normalizeDate = date => {
  const cleanDate = date.replace(/\s/g, '')
  const splitDate = cleanDate.split(/\W/g)

  return `${splitDate[0]}/1/${fullYear(splitDate[1])}`
}

/**
 * @name expired
 * @since v2.0.0
 * @description
 * Validates that the string date passed in is indeed a valid date and not an old one
 * @param {String} date The string date we want to validate
 * @return {Object} An object containing a isValid boolean and some info
 *
 * @example
 * // Assuming "currDate" is a variable that holds the current date in a XX/XX format
 * expired(currDate); // => { isValid: true, isExpired: false }
 * expired('01/18'); // => { isValid: false, isExpired: true }
 */
const expired = date => {
  if (typeof date !== 'string') {
    throw new TypeError('date should be a string type')
  }

  const currDate = generateDate()
  const expireDate = new Date(normalizeDate(date))
  const isExpired = !isNaN(expireDate) ? currDate > expireDate : true

  return {
    isValid: !isExpired,
    isExpired
  }
}

export default expired
