
import {checkObj, normalizeDate} from '../helpers/index';

const validDate = expire => {
	const currDate = new Date();
	const expireDate = new Date(normalizeDate(expire));

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

const validNumber = number => {
	const cards = {
		visa: /^4[0-9]{15}$/,
		discover: /^6[0-9]{15}$/,
		masterCard: /^5[1-5][0-9]{14}$/,
		amex: /^3(4|7)[0-9]{13}$/
	};
	let prop = '';

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

const validCVN = cvn => {
	const cvns = {
		norm: /[0-9]{3}/,
		amex: /[0-9]{4}/
	};
	let prop = '';

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

export default cardObj => {

	if (!cardObj) {
		return {
			validNumber,
			validCVN,
			validDate
		};
	}

	if (checkObj(cardObj)) {
		const {number, cvn, expire} = cardObj;

		return {
			number: validNumber(number),
			cvn: validCVN(cvn),
			date: validDate(expire)
		};
	}

	return {};
};
