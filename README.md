[![npm](https://img.shields.io/npm/v/simple-card.svg?style=flat-square)](https://www.npmjs.com/package/simple-card)
[![David](https://img.shields.io/david/dhershman1/simple-card.svg?style=flat-square)](https://david-dm.org/dhershman1/simple-card)
[![David](https://img.shields.io/david/dev/dhershman1/simple-card.svg?style=flat-square)](https://david-dm.org/dhershman1/simple-card?type=dev)
[![Travis](https://img.shields.io/travis/dhershman1/simple-card.svg?style=flat-square)](https://travis-ci.org/dhershman1/simple-card)
[![Coverage Status](https://img.shields.io/coveralls/github/dhershman1/simple-card.svg?style=flat-square)](https://coveralls.io/github/dhershman1/simple-card?branch=master)

# Simple Card

A simple credit card system that runs validation for credit cards it uses a luhn algorithm for number validation and has a solid array of numbers to find and validate card types against.

## Changelog

You can view the changelog here: https://github.com/dhershman1/simple-card/blob/master/changelog.md

## How To

Simple Card is a plug and play module, `import`, `require`, or even `script` tag it in

Standard JS
```js
import { validate } from 'simple-card';

validate(data);
```

CommonJS
```js
const { validate } = require('simple-card');

validate(data);
```

Browser
```html
<script src="/path/to/simple-card.min.js"></script>
<script>
	simpleCard.validate(data);
</script>
```

## Documentation

You can find most of the documentation for simple card here: https://www.dusty.codes/simple-card

## Modular

Simple Card is completely modular which means each piece of functionality can be imported by itself directly, or with destructuring.

Example:

```js
import validate from 'simple-card/validate'
import num from 'simple-card/number'
import cvn from 'simple-card/cvn'
import expired from 'simple-card/expired'
import matches from 'simple-card/matches'

// Or with destructuring

import { validate, number, cvn, matches, expired } from 'simple-card'
```

You can then call each function individually.

This also works with `commonjs` you just need to point directly to the file you want

**NOTE:** In order to use `validate` you need to pass a full card object to it like so:

```js
{
  number: '4111 1111 1111 1111',
  cvn: '342',
  date: '12/20'
}
```
