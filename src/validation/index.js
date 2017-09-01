
import {luhnChk, normalizeDate, organizeResults} from '../helpers/index';

const validDate = expire => {
	if (!expire) {
		return {
			isValid: false,
			info: 'No Data Provided'
		};
	}
	const currDate = new Date();
	const expireDate = new Date(normalizeDate(expire));
	const isExpired = currDate > expireDate;

	return {
		isValid: !isExpired,
		info: isExpired
	};
};

const validNumber = number => {
	const cards = {
		visa: /^4[0-9]{13,15}$/,
		discover: /^6[0-9]{15}$/,
		master: /^5[1-5][0-9]{14}$/,
		amex: /^3(4|7)[0-9]{13}$/
	};
	let prop = '';

	for (prop in cards) {
		if (cards[prop].test(number)) {
			return {
				isValid: Boolean(luhnChk(number)),
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
	const containsNumbers = (/[0-9]/).test(cvn);
	const cvns = {
		norm: containsNumbers && cvn.length === 3,
		amex: containsNumbers && cvn.length === 4
	};
	let prop = '';

	for (prop in cvns) {
		if (cvns[prop]) {
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

	const {number, cvn, expire} = cardObj;
	const results = {
		cardType: validNumber(number),
		cvnType: validCVN(cvn),
		expired: validDate(expire)
	};

	return organizeResults(results);

};
