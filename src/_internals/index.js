
const range = (from, to) => {
  const result = [];
  let n = from;

  while (n < to) {
    result.push(n);
    n += 1;
  }

  return result;
};

const find = (f, x = '') => {
  const len = x.length;
  let idx = 0;

  while (idx < len) {
    if (f(x[idx])) {
      return x[idx];
    }

    idx += 1;
  }

  return false;
};

export const isObject = x => Object.prototype.toString.call(x) === '[object Object]';

export const typeCheck = x => typeof x === 'string' || typeof x === 'number';

export const getCardType = ccNumber => {
  const types = {
    amex: [34, 37],
    discover: [6011, ...range(622126, 622925), ...range(644, 649), 65],
    master: range(50, 55),
    visa: [4]
  };

  for (const cardType in types) {
    const found = find(n => {
      const reg = new RegExp(`^${n}`);

      return reg.test(ccNumber);

    }, types[cardType]);

    if (found) {
      return cardType;
    }
  }

  return false;
};

const verify = res => {
  if (res.isValid) {
    return res;
  }

  if (!res.matches) {
    res.info = 'CVN does not match the found card type';
  } else {
    res.info = 'One of our rules failed';
  }

  return res;
};

export const organizeResults = (obj, matches) => {
  const results = {
    isValid: false
  };
  const convertProp = {
    number: 'cardType',
    cvn: 'cvnType',
    expired: 'expired'
  };
  let count = 0;

  Object.keys(obj).forEach(k => {
    const val = obj[k];

    if (!val.isValid) {
      count++;
    } else {
      results[convertProp[k]] = val.info;
    }

  });

  results.isValid = count === 0 && matches;

  return verify(results);
};
