
/**
 * Verifies the item is an object
 * @param  {Object}  x The item to verify
 * @return {Boolean}     Returns true or false if the item is an object
 */
export const isObject = x => Object.prototype.toString.call(x) === '[object Object]';

export const normalizeDate = date => date.replace('/', '/1/');

export const matchesCardType = (cvn, cardType) => {
	if (cvn.length === 4 && cardType && cardType.info !== 'amex') {
		return false;
	}

	if (cvn.length === 3 && cardType && cardType.info === 'amex') {
		return false;
	}

	return true;
};

const range = (from, to) => {
	if (isNaN(from) && isNaN(to)) {
		throw new TypeError('Both arguments to range must be numbers');
	}
	const result = [];
	let n = from;

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
const find = (f, x) => {
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

	return 'No Type Found';
};

export const luhnChk = value => {
	const numArr = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
	let len = value.length;
	let bit = 1;
	let sum = 0;
	let num = 0;

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
export const validateType = x => {
	if (String(x).indexOf('/') !== -1) {
		return 'validDate';
	}

	if (String(x).length > 4) {
		return 'validNumber';
	}

	return 'validCVN';
};

export const organizeResults = obj => {
	const results = {
		isValid: true
	};
	let count = 0;
	let prop = '';

	for (prop in obj) {
		if (!obj[prop].isValid) {
			count++;
		}

		results[prop] = obj[prop].info;
	}

	results.isValid = count === 0;

	return results;
};
