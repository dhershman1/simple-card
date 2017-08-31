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

var normalizeDate = function (date) { return date.replace('/', '/1/'); };

/**
 * Figure out what type of validation we are running if only a string/number is sent in
 * @param  {String}  x The value to check
 * @return {String}   Returns a string containing what method to use
 */
var validateType = function (x) {
	if (String(x).indexOf('/') !== -1) {
		return 'validDate';
	}

	if (String(x).length > 4) {
		return 'validNumber';
	}

	return 'validCVN';
};

var passCounter = function (obj, count) {
	if (count < 3) {
		return obj;
	}

	return false;
};

var checkObj = function (x) {
	var results = {};
	var noneCounter = 0;
	var prop = '';

	for (prop in x) {
		if (!x[prop]) {
			noneCounter++;
			results[prop] = 'None';
			continue;
		}

		results[prop] = x[prop];
	}

	return passCounter(results, noneCounter);
};

var validDate = function (expire) {
	var currDate = new Date();
	var expireDate = new Date(normalizeDate(expire));

	if (currDate < expireDate) {
		return {
			isValid: true,
			info: 'Not Expired'
		};
	}

	return {
		isValid: false,
		info: 'Expired'
	};
};

var validNumber = function (number) {
	var cards = {
		visa: /^4[0-9]{15}$/,
		discover: /^6[0-9]{15}$/,
		masterCard: /^5[1-5][0-9]{14}$/,
		amex: /^3(4|7)[0-9]{13}$/
	};
	var prop = '';

	for (prop in cards) {
		if (cards[prop].test(number)) {
			return {
				isValid: true,
				info: prop
			};
		}
		continue;
	}

	return {
		isValid: false,
		info: 'Invalid Card Number'
	};
};

var validCVN = function (cvn) {
	var cvns = {
		norm: /[0-9]{3}/,
		amex: /[0-9]{4}/
	};
	var prop = '';

	for (prop in cvns) {
		if (cvns[prop].test(cvn)) {
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

var validationMethods = function (cardObj) {

	if (!cardObj) {
		return {
			validNumber: validNumber,
			validCVN: validCVN,
			validDate: validDate
		};
	}

	if (checkObj(cardObj)) {
		var number = cardObj.number;
		var cvn = cardObj.cvn;
		var expire = cardObj.expire;

		return {
			number: validNumber(number),
			cvn: validCVN(cvn),
			date: validDate(expire)
		};
	}

	return {};
};

var singleRun = function (type, item) { return validationMethods()[type](item); };

var index = function (card) {
	if (!isObject(card)) {
		return singleRun(validateType(card), card);
	}

	return validationMethods(card);
};

return index;

})));
