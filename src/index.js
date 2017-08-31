import {isObject, validateType} from './helpers/index';
import validationMethods from './validation/index';

const singleRun = (type, item) => validationMethods()[type](item);

export default card => {
	if (!isObject(card)) {
		return singleRun(validateType(card), card);
	}

	return validationMethods(card);
};
