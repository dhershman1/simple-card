import { isObject, matchesCardType } from '../_internals/index';

const runValid = (cvn, cardType) => {
  const containsNumbers = (/[0-9]/).test(cvn);
  const cvns = {
    norm: containsNumbers && cvn.length === 3,
    amex: containsNumbers && cvn.length === 4
  };

  for (const prop in cvns) {
    if (cvns[prop] && matchesCardType(cvn, cardType)) {
      return {
        isValid: true,
        info: prop
      };
    }
    continue;
  }

  return {
    isValid: false,
    info: 'Invalid CVN Code'
  };
};

const validCVN = (card = '0', cardType) => {
  const cvn = isObject(card) ? card.cvn : card;
  const sanatizedCVN = cvn.replace(/\W/g, '');

  return runValid(sanatizedCVN, cardType);
};

export default validCVN;
