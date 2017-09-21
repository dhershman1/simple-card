import {isObject, validateType} from './helpers/index';
import validationMethods from './validation/index';

const singleRun = (type, item, debug) => validationMethods()[type](item, debug);

export default (card, debug) => {
	if (!isObject(card)) {
		return singleRun(validateType(card), card, debug);
	}

	return validationMethods(card, debug);
};
