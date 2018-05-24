(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.simpleCard = {})));
}(this, (function (exports) { 'use strict';

  var typeCheck = (function (x) {
    return typeof x === 'string' || typeof x === 'number';
  });

  var getCvnType = function getCvnType(cvn) {
    var len = cvn.length;
    if (len === 3) {
      return 'norm';
    }
    if (len === 4) {
      return 'amex';
    }
    return false;
  };
  var validCVN = (function (cvnCode) {
    if (!typeCheck(cvnCode)) {
      throw new TypeError('cvn should be a string or number type');
    }
    var results = {
      isValid: false,
      cvnType: 'Invalid CVN Code'
    };
    var sanitizedCVN = String(cvnCode).replace(/\D/g, '');
    var type = getCvnType(sanitizedCVN);
    if (type) {
      return {
        isValid: true,
        cvnType: type
      };
    }
    return results;
  });

  var fullYear = function fullYear(year) {
    if (year.length === 2) {
      return "20".concat(year);
    }
    return year;
  };
  var generateDate = function generateDate() {
    var dateObj = new Date();
    return new Date("".concat(dateObj.getMonth() + 1, "/1/").concat(dateObj.getFullYear()));
  };
  var normalizeDate = function normalizeDate(date) {
    var cleanDate = date.replace(/\s/g, '');
    var splitDate = cleanDate.split(/\W/g);
    return "".concat(splitDate[0], "/1/").concat(fullYear(splitDate[1]));
  };
  var expired = function expired(date) {
    if (typeof date !== 'string') {
      throw new TypeError('date should be a string type');
    }
    var currDate = generateDate();
    var expireDate = new Date(normalizeDate(date));
    var isExpired = !isNaN(expireDate) ? currDate > expireDate : true;
    return {
      isValid: !isExpired,
      isExpired: isExpired
    };
  };

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var range = function range(from, to) {
    var result = [];
    var i = from;
    for (i; i < to; i++) {
      result.push(i);
    }
    return result;
  };
  var getCardType = (function (ccNumber) {
    var types = {
      amex: [34, 37],
      discover: [6011].concat(_toConsumableArray(range(622126, 622925)), _toConsumableArray(range(644, 649)), [65]),
      master: range(50, 55),
      visa: [4]
    };
    for (var cardType in types) {
      var _types$cardType$filte = types[cardType].filter(function (n) {
        return new RegExp("^".concat(n)).test(ccNumber);
      }),
          _types$cardType$filte2 = _slicedToArray(_types$cardType$filte, 1),
          found = _types$cardType$filte2[0];
      if (found) {
        return cardType;
      }
    }
  });

  var invalidAmex = function invalidAmex(cvn, cardType) {
    return cvn.length === 4 && cardType !== 'amex';
  };
  var invalidNorm = function invalidNorm(cvn, cardType) {
    return cvn.length === 3 && cardType === 'amex';
  };
  var match = function match(cvn, type) {
    if (invalidAmex(cvn, type)) {
      return false;
    }
    if (invalidNorm(cvn, type)) {
      return false;
    }
    return true;
  };
  var validMatch = (function (cvn, card) {
    if (!typeCheck(cvn) || !typeCheck(card)) {
      throw new TypeError('cvn and card number should be string or number types');
    }
    var matches = match(String(cvn).replace(/\W/g, ''), getCardType(String(card).replace(/\W/g, '')));
    return {
      isValid: matches,
      match: !matches ? 'cvn does not match card type' : 'card type matches cvn'
    };
  });

  var luhnChk = function luhnChk(value) {
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
  var cNumber = function cNumber(card) {
    if (!typeCheck(card)) {
      throw new TypeError('number should be a string or number type');
    }
    var sanitizedNumber = String(card).replace(/\W/g, '');
    var valid = Boolean(luhnChk(sanitizedNumber));
    return {
      isValid: valid,
      cardType: valid ? getCardType(sanitizedNumber) : 'Invalid Card Number'
    };
  };

  var validation = function validation(_ref) {
    var number = _ref.number,
        cvn = _ref.cvn,
        date = _ref.date;
    var validationResults = [cNumber(number), validCVN(cvn), expired(date), validMatch(cvn, number)];
    var count = 0;
    var results = validationResults.reduce(function (acc, r) {
      var keys = Object.keys(r);
      var currKey = keys[keys.length - 1];
      if (!r.isValid) {
        count++;
      }
      acc[currKey] = r[currKey];
      return acc;
    }, {});
    results.isValid = count === 0;
    return results;
  };
  var simpleCard = function simpleCard(card) {
    if (Object.prototype.toString.call(card) !== '[object Object]') {
      throw new TypeError('Must send full card object to run full validation');
    }
    return validation(card);
  };

  exports.cvn = validCVN;
  exports.expired = expired;
  exports.matches = validMatch;
  exports.number = cNumber;
  exports.validate = simpleCard;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
