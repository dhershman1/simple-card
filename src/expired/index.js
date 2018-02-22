const fullYear = year => {
  if (year.length === 2) {
    return `20${year}`;
  }

  return year;
};

const generateDate = () => {
  const dateObj = new Date();

  return new Date(`${dateObj.getMonth() + 1}/1/${dateObj.getFullYear()}`);
};

const normalizeDate = date => {
  const cleanDate = date.replace(/\s/g, '');
  const splitDate = cleanDate.split(/\W/g);

  return `${splitDate[0]}/1/${fullYear(splitDate[1])}`;
};

/**
 * @name expired
 * @since v2.0.0
 * @description
 * Validates that the string date passed in is indeed a valid date and not an old one
 * @param {String} date The string date we want to validate
 * @return {Object} An object containing a isValid boolean and some info
 *
 * @example
 * expired('04/20'); // => { isValid: true, info: 'Not Expired' }
 * expired('01/17'); // => { isValid: false, info: 'Is Expired' }
 */
const expired = date => {
  if (typeof date !== 'string') {
    throw new TypeError('date should be a string type');
  }

  const currDate = generateDate();
  const expireDate = new Date(normalizeDate(date));
  const isExpired = currDate > expireDate;

  return {
    isValid: !isExpired,
    isExpired
  };
};

export default expired;
