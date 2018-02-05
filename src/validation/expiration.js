import { isObject } from '../_internals/index';

const dateTypeCheck = val => {
  if (val && typeof val !== 'string') {
    throw new TypeError('expire is not the proper type String');
  }

  return false;
};

const fullYear = (year = '') => {
  if (year.length === 2) {
    return `20${year}`;
  }

  return year;
};

/**
 * @name generateDate
 * @description Generates a new current date object
 * @returns A new date object for the current date
 */
const generateDate = () => {
  const dateObj = new Date();

  return new Date(`${dateObj.getMonth() + 1}/1/${dateObj.getFullYear()}`);
};

/**
 * @name normalizeDate
 * @param {String} date The date string to normalize
 * @returns A normalized full date (for IE compatibility)
 */
const normalizeDate = (date = '') => {
  const cleanDate = date.replace(/\s/g, '');
  const splitDate = cleanDate.split(/\W/g);

  return `${splitDate[0]}/1/${fullYear(splitDate[1])}`;
};

const expired = (card = '0') => {
  const e = isObject(card) ? card.expire : card;

  dateTypeCheck(e);

  if (!e) {
    return {
      isValid: false,
      info: 'No Data Provided'
    };
  }
  const currDate = generateDate();
  const expireDate = new Date(normalizeDate(e));
  const isExpired = currDate > expireDate;

  return {
    isValid: !isExpired,
    info: isExpired
  };
};

export default expired;
