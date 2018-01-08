import { isObject, normalizeDate } from '../_internals/index';

const expired = (card = '0') => {
  const e = isObject(card) ? card.expire : card;

  if (!e) {
    return {
      isValid: false,
      info: 'No Data Provided'
    };
  }
  const currDate = normalizeDate();
  const expireDate = new Date(normalizeDate(e));
  const isExpired = currDate > expireDate;

  return {
    isValid: !isExpired,
    info: isExpired
  };
};

export default expired;
