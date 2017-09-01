[![Build Status](https://travis-ci.org/dhershman1/simple-card.svg?branch=master)](https://travis-ci.org/dhershman1/simple-card)
[![npm](https://img.shields.io/npm/v/simple-card.svg?style=flat)](https://www.npmjs.com/package/simple-card) [![Downloads](https://img.shields.io/npm/dm/simple-card.svg?style=flat)](https://www.npmjs.com/package/simple-card) [![dependencies Status](https://david-dm.org/dhershman1/simple-card/status.svg)](https://david-dm.org/dhershman1/simple-card) [![devDependencies Status](https://david-dm.org/dhershman1/simple-card/dev-status.svg)](https://david-dm.org/dhershman1/simple-card?type=dev)

# Simple Card

A smaller surogate to my [simply_valid](https://github.com/dhershman1/simply_valid) module

A simple validation system for your credit card fields can provide you some extra data on return, do note that this only validates that a cards format is valid not that the card itself is valid for payment.

## Changelog

You can view the changelog here: https://github.com/dhershman1/simple-card/blob/master/changelog.md

## How To

Simple Card is a plug and play module, `import`, `require`, or even `script` tag it in

Standard JS
```js
import simpleCard from 'simple-card';

simpleCard(data);
```

CommonJS
```js
const simpleCard = require('simple-card');

simpleCard(data);
```

Browser
```html
<script src="/path/to/simple-card.umd.js"></script>
<script>
	simpleCard(data);
</script>
```

## Usage

The parameters of Simple Card are very flexible.

### Validate Card Object

```js
import simpleCard from 'simple-card';

const validationObj = simpleCard({
	number: '4111111111111111',
	cvn: '342',
	expire: '09/20'
});

```

The output of `validationObj` would be:

```js
{
	isValid: true,
	cardType: 'visa',
	cvnType: 'norm',
	expired: false
}
```

You can also send in partial objects to only validate certain pieces:

```js
import simpleCard from 'simple-card';

const validationObj = simpleCard({
	number: '4111111111111111',
	expire: '09/20'
});
```

Your output would then be:

```js
{
	{
		isValid: false,
		cardType: 'visa',
		cvnType: 'Invalid CVN Code',
		expired: false
	}
}
```

Notice the `cvn` made the validation returned falsey, since it was not provided

## Or, send in single data pieces

You can also send in single string data pieces so just a `card number`, `cvn`, or `date`

```js
import simpleCard from 'simple-card';

const validNumber = simpleCard('4111111111111111');
// Output: {isValid: true, info: 'visa'}
const validCVN = simpleCard('333');
// Output: {isValid: true, info: 'norm'}
const validCVN = simpleCard('4444');
// Output: {isValid: true, info: 'amex'}
const validDate = simpleCard('08/20');
// Output: {isValid: true, info: false}
```
