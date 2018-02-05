import { isObject } from '../_internals/index';

const cvnTypeCheck = cvn => {
  if (typeof cvn !== 'string') {
    throw new TypeError('cvn is not the proper type String');
  }

  return false;
};

const invalidAmex = (cvn, cardType) => cvn.length === 4 && cardType && cardType.info !== 'amex';

const invalidNorm = (cvn, cardType) => cvn.length === 3 && cardType && cardType.info === 'amex';

const matchesCardType = (cvn = '0', cardType) => {
  if (invalidAmex(cvn, cardType)) {
    return false;
  }

  if (invalidNorm(cvn, cardType)) {
    return false;
  }

  return true;
};

const cvnTypes = cvn => {
  const containsNumbers = (/[0-9]/).test(cvn);

  return {
    norm: containsNumbers && cvn.length === 3,
    amex: containsNumbers && cvn.length === 4
  };
};

const checkMatch = (foundCVN, matching) => foundCVN && matching;

const runValid = (cvn = '', cardType) => {
  const cvns = cvnTypes(cvn);
  const matching = matchesCardType(cvn, cardType);

  for (const prop in cvns) {
    if (checkMatch(cvns[prop], matching)) {
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

  cvnTypeCheck(cvn);

  const sanatizedCVN = cvn.replace(/\W/g, '');

  return runValid(sanatizedCVN, cardType);
};

export default validCVN;
