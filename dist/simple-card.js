(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('kyanite/or'), require('kyanite/type'), require('kyanite/find'), require('kyanite/range'), require('kyanite/some'), require('kyanite/and'), require('kyanite/not'), require('kyanite/assign'), require('kyanite/every')) :
  typeof define === 'function' && define.amd ? define(['exports', 'kyanite/or', 'kyanite/type', 'kyanite/find', 'kyanite/range', 'kyanite/some', 'kyanite/and', 'kyanite/not', 'kyanite/assign', 'kyanite/every'], factory) :
  (factory((global.simpleCard = {}),global.or,global.type,global.find,global.range,global.some,global.and,global.not,global.assign,global.every));
}(this, (function (exports,or,type,find,range,some,and,not,assign,every) { 'use strict';

  or = or && or.hasOwnProperty('default') ? or['default'] : or;
  type = type && type.hasOwnProperty('default') ? type['default'] : type;
  find = find && find.hasOwnProperty('default') ? find['default'] : find;
  range = range && range.hasOwnProperty('default') ? range['default'] : range;
  some = some && some.hasOwnProperty('default') ? some['default'] : some;
  and = and && and.hasOwnProperty('default') ? and['default'] : and;
  not = not && not.hasOwnProperty('default') ? not['default'] : not;
  assign = assign && assign.hasOwnProperty('default') ? assign['default'] : assign;
  every = every && every.hasOwnProperty('default') ? every['default'] : every;

  var typeCheck = (function (x) {
    return or(type(x) === 'String', type(x) === 'Number');
  });

  var validCVN = (function (cvnCode) {
    if (!typeCheck(cvnCode)) {
      throw new TypeError('cvn should be a string or number type');
    }
    var sanitized = String(cvnCode).replace(/\D/g, '');
    var type$$1 = 'Invalid CVN Code';
    if (sanitized.length === 3) {
      type$$1 = 'norm';
    } else if (sanitized.length === 4) {
      type$$1 = 'amex';
    }
    return {
      isValid: type$$1 !== 'Invalid CVN Code',
      cvnType: type$$1
    };
  });

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

  var fullYear = function fullYear(year) {
    if (year.length === 2) {
      return "".concat(String(new Date().getFullYear()).slice(0, 2)).concat(year);
    }
    return year;
  };
  var expired = function expired(date) {
    if (type(date) !== 'String') {
      throw new TypeError('date should be a string type');
    }
    var dateObj = new Date();
    var _date$replace$split = date.replace(/\s/g, '').split(/\W/g),
        _date$replace$split2 = _slicedToArray(_date$replace$split, 2),
        month = _date$replace$split2[0],
        year = _date$replace$split2[1];
    var currDate = new Date("".concat(dateObj.getMonth() + 1, "/1/").concat(dateObj.getFullYear()));
    var expireDate = new Date("".concat(month, "/1/").concat(fullYear(year)));
    var isExpired = !isNaN(expireDate) ? currDate > expireDate : true;
    return {
      isValid: !isExpired,
      isExpired: isExpired
    };
  };

  var getCardType = (function (ccNumber) {
    var types = {
      amex: [34, 37],
      discover: [6011].concat(_toConsumableArray(range(622126, 622926)), _toConsumableArray(range(644, 650)), [65]),
      master: range(50, 56),
      visa: [4]
    };
    return find(function (k) {
      return some(function (n) {
        return new RegExp("^".concat(n)).test(ccNumber);
      }, types[k]);
    }, Object.keys(types));
  });

  var validMatch = (function (cvn, card) {
    if (or(!typeCheck(cvn), !typeCheck(card))) {
      throw new TypeError('cvn and card number should be string or number types');
    }
    var cvnLen = String(cvn).replace(/\D/g, '').length;
    var cardType = getCardType(String(card).replace(/\D/g, ''));
    var isValid = not(or(and(cvnLen === 4, cardType !== 'amex'), and(cvnLen === 3, cardType === 'amex')));
    return {
      isValid: isValid,
      match: !isValid ? 'cvn does not match card type' : 'card type matches cvn'
    };
  });

  var luhnChk = function luhnChk(value) {
    if (/[^0-9-\s]+/.test(value)) {
      return false;
    }
    var numArr = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
    var len = value.length;
    var bit = 1;
    var sum = 0;
    var num = 0;
    while (len) {
      num = parseInt(value.charAt(--len), 10);
      bit ^= 1;
      sum += bit ? numArr[num] : num;
    }
    return sum && sum % 10 === 0;
  };
  var cNumber = function cNumber(card) {
    if (!typeCheck(card)) {
      throw new TypeError('number should be a string or number type');
    }
    var sanitized = String(card).replace(/\D/g, '');
    var isValid = Boolean(luhnChk(sanitized));
    return {
      isValid: isValid,
      cardType: isValid ? getCardType(sanitized) : 'Invalid Card Number'
    };
  };

  var simpleCard = function simpleCard(card) {
    if (type(card) !== 'Object') {
      throw new TypeError('Must send full card object to run full validation');
    }
    var validationResults = [cNumber(card.number), validCVN(card.cvn), expired(card.date), validMatch(card.cvn, card.number)];
    return assign.apply(void 0, [{}].concat(validationResults, [{
      isValid: every(function (x) {
        return x.isValid;
      }, validationResults)
    }]));
  };

  exports.cvn = validCVN;
  exports.expired = expired;
  exports.matches = validMatch;
  exports.number = cNumber;
  exports.validate = simpleCard;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
