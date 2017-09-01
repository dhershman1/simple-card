
/**
 * Verifies the item is an object
 * @param  {Object}  x The item to verify
 * @return {Boolean}     Returns true or false if the item is an object
 */
export const isObject = x => Object.prototype.toString.call(x) === '[object Object]';

export const normalizeDate = date => date.replace('/', '/1/');

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
