import { typeCheck } from '../_internals';

const isNorm = cvn => (/[0-9]/).test(cvn) && cvn.length === 3;

const isAmex = cvn => (/[0-9]/).test(cvn) && cvn.length === 4;

const getCvnType = cvn => {
  if (isNorm(cvn)) {
    return 'norm';
  }

  if (isAmex(cvn)) {
    return 'amex';
  }

  return false;
};

/**
 * @name cvn
 * @since v2.0.0
 * @description
 * Validates that the string cvn passed in is a valid cvn number
 * @param {String|Number} cvnCode The string cvn we want to validate
 * @return {Object} An object containing a isValid boolean and some info
 *
 * @example
 * cvn('333'); // => { isValid: true, info: 'norm' }
 * cvn('3333'); // => { isValid: true, info: 'amex' }
 * cvn('33433'); // => { isValid: false, info: 'Invalid CVN Code' }
 */
export default cvnCode => {
  if (!typeCheck(cvnCode)) {
    throw new TypeError('cvn should be a string or number type');
  }

  const sanatizedCVN = String(cvnCode).replace(/\W/g, '');

  const type = getCvnType(sanatizedCVN);

  if (type) {
    return {
      isValid: true,
      info: type
    };
  }

  return {
    isValid: false,
    info: 'Invalid CVN Code'
  };
};
