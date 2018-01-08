(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.simpleCard = factory());
}(this, (function () { 'use strict';

/**
 * Verifies the item is an object
 * @param  {Object}  x The item to verify
 * @return {Boolean}     Returns true or false if the item is an object
 */
var isObject = function (x) { return Object.prototype.toString.call(x) === '[object Object]'; };

var extend = function () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.reduce(function (acc, x) {
  var key = '';

  for (key in x) {
    acc[key] = x[key];
  }

  return acc;
}, {});
};

var normalizeDate = function (date) {
  if (date) {
    return date.replace('/', '/1/');
  }

  var dateObj = new Date();

  return new Date(((dateObj.getMonth() + 1) + "/1/" + (dateObj.getFullYear())));
};

var matchesCardType = function (cvn, cardType) {
  if (cvn.length === 4 && cardType && cardType.info !== 'amex') {
    return false;
  }

  if (cvn.length === 3 && cardType && cardType.info === 'amex') {
    return false;
  }

  return true;
};

var range = function (from, to) {
  if (isNaN(from) && isNaN(to)) {
    throw new TypeError('Both arguments to range must be numbers');
  }
  var result = [];
  var n = from;

  while (n < to) {
    result.push(n);
    n += 1;
  }

  return result;
};

/**
 *
 * @param {Function} f Function to run as we iterate through the list
 * @param {Array} x Array to iterate through
 */
var find = function (f, x) {
  var len = x.length;
  var idx = 0;

  while (idx < len) {
    if (f(x[idx])) {
      return x[idx];
    }

    idx += 1;
  }

  return false;
};

var getCardType = function (ccNumber) {
  var types = {
    amex: [34, 37],
    discover: [6011 ].concat( range(622126, 622925), range(644, 649), [65]),
    master: range(50, 55),
    visa: [4]
  };

  for (var cardType in types) {
    var found = find(function (n) {
      var reg = new RegExp(("^" + n));

      return reg.test(ccNumber);

    }, types[cardType]);

    if (found) {
      return cardType;
    }
  }

  return 'No Type Found';
};

var luhnChk = function (value) {
  var numArr = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
  var len = value.length;
  var bit = 1;
  var sum = 0;
  var num = 0;

  while (len) {
    num = parseInt(value.charAt(--len), 10);
    sum += (bit ^= 1) ? numArr[num] : num;
  }

  return sum && sum % 10 === 0;
};

/**
 * Figure out what type of validation we are running if only a string/number is sent in
 * @param  {String}  x The value to check
 * @return {String}   Returns a string containing what method to use
 */
var validateType = function (x) {
  if (String(x).indexOf('/') !== -1) {
    return 'validDate';
  }

  if (String(x).length > 10) {
    return 'validNumber';
  }

  return 'validCVN';
};

var organizeResults = function (obj) {
  var results = {
    isValid: true
  };
  var convertProp = {
    validNumber: 'cardType',
    validCVN: 'cvnType',
    validDate: 'expired'
  };
  var count = 0;
  var prop = '';

  for (prop in obj) {
    if (!obj[prop].isValid) {
      count++;
    }

    results[convertProp[prop]] = obj[prop].info;
  }

  results.isValid = count === 0;

  return results;
};

var runValid = function (cvn, cardType) {
  var containsNumbers = (/[0-9]/).test(cvn);
  var cvns = {
    norm: containsNumbers && cvn.length === 3,
    amex: containsNumbers && cvn.length === 4
  };

  for (var prop in cvns) {
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

var validCVN = function (card, cardType) {
  if ( card === void 0 ) card = '0';

  var cvn = isObject(card) ? card.cvn : card;
  var sanatizedCVN = cvn.replace(/\W/g, '');

  return runValid(sanatizedCVN, cardType);
};

var expired = function (card) {
  if ( card === void 0 ) card = '0';

  var e = isObject(card) ? card.expire : card;

  if (!e) {
    return {
      isValid: false,
      info: 'No Data Provided'
    };
  }
  var currDate = normalizeDate();
  var expireDate = new Date(normalizeDate(e));
  var isExpired = currDate > expireDate;

  return {
    isValid: !isExpired,
    info: isExpired
  };
};

var cNumber = function (card) {
  if ( card === void 0 ) card = '0';

  var n = isObject(card) ? card.number : card;
  var sanitizedNumber = n.replace(/\W/g, '');
  var valid = Boolean(luhnChk(sanitizedNumber));

  return {
    isValid: valid,
    info: valid ? getCardType(sanitizedNumber) : 'Invalid Card Number'
  };
};

var validationMethods = {
  validNumber: cNumber,
  validCVN: validCVN,
  validDate: expired
};

var normalizeObject = function (d) {
  if (isObject(d)) {
    return extend({
      number: '0',
      cvn: '0',
      expire: false
    }, d);
  }

  return d;
};

/**
 * @name simpleCard
 * @description Validates a credit card object, or individual pieces of the card that are sent in by string or partial obejcts
 * @param {Object} card The card Object that we wish to be validated
 * @returns {Object} Returns an object of information about the test and whether or not it passed
 *
 * @example
 * const test = simpleCard({
    number: '4111111111111111',
    cvn: '333',
    expire: '09/20'
  }); // => { isValid: true, cardType: 'visa', cvnType: 'norm', expired: false }

  const test = simpleCard('4111111111111111'); // => { isValid: true, cardType: 'visa' }

  const test = simpleCard({
    number: '4111 1111 1111 1111',
    cvn: '333'
  }); // => { isValid: false, cardType: 'visa', cvnType: 'norm', expired: 'No Data Provided' }
 */
var simpleCard = function (card) {
  var normalCard = normalizeObject(card);
  var results = {};

  if (!isObject(normalCard)) {
    return validationMethods[validateType(normalCard)](normalCard);
  }

  for (var prop in validationMethods) {
    results[prop] = validationMethods[prop](normalCard, results.validNumber);
  }

  return organizeResults(results);
};

return simpleCard;

})));
