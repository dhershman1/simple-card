
import { getCardType, luhnChk, matchesCardType, normalizeDate, organizeResults } from '../helpers/index';

const validDate = (expire = '0') => {
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

const validNumber = (number = '0') => {
	const sanitizedNumber = number.replace(/\W/g, '');
	const valid = Boolean(luhnChk(sanitizedNumber));

	return {
		isValid: valid,
		info: valid ? getCardType(sanitizedNumber) : 'Invalid Card Number'
	};
};

const validCVN = (cvn = '0', cardType) => {
	const sanatizedCVN = cvn.replace(/\W/g, '');
	const containsNumbers = (/[0-9]/).test(sanatizedCVN);
	const cvns = {
		norm: containsNumbers && sanatizedCVN.length === 3,
		amex: containsNumbers && sanatizedCVN.length === 4
	};
	let prop = '';

	for (prop in cvns) {
		if (cvns[prop] && matchesCardType(sanatizedCVN, cardType)) {
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

	const { number, cvn, expire } = cardObj;
	const cardType = validNumber(number);
	const cvnType = validCVN(cvn, cardType);
	const expired = validDate(expire);

	return organizeResults({
		cardType,
		cvnType,
		expired
	});

};
