[![Build Status](https://travis-ci.org/dhershman1/simple-card.svg?branch=master)](https://travis-ci.org/dhershman1/simple-card)
[![npm](https://img.shields.io/npm/v/simple-card.svg?style=flat)](https://www.npmjs.com/package/simple-card) [![dependencies Status](https://david-dm.org/dhershman1/simple-card/status.svg)](https://david-dm.org/dhershman1/simple-card) [![devDependencies Status](https://david-dm.org/dhershman1/simple-card/dev-status.svg)](https://david-dm.org/dhershman1/simple-card?type=dev)

# Simple Card

A simple credit card system that runs validation for credit cards it uses a luhn algorithm for number validation and has a solid array of numbers to find and validate card types against.

## Changelog

You can view the changelog here: https://github.com/dhershman1/simple-card/blob/master/changelog.md

## How To

Simple Card is a plug and play module, `import`, `require`, or even `script` tag it in

Standard JS
```js
import simpleCard from 'simple-card';

simpleCard.validate(data);
```

CommonJS
```js
const simpleCard = require('simple-card');

simpleCard.validate(data);
```

Browser
```html
<script src="/path/to/simple-card.umd.js"></script>
<script>
	simpleCard.validate(data);
</script>
```

## Documentation

You can find most of the documentation for simple card here: http://www.dusty.codes/simple-card

## Methods

As of v2.0.0 simple-card has been broken down to functions that can be used individually.

All methods sanatize the strings (Remove whitespace or special characters like dashes)

### validate(card)

This is the primary validation function which runs the entire process of validating if the card number and cvn are valid, making sure it isn't expired, and making sure the card type matches the cvn provided.

#### Arguments

- `card` - `Object`: The card object to validate
    - `card.number` - `String|Number`: The credit card number
    - `card.cvn` - `String|Number`: The credit card CVN/Security Code
    - `card.date` - `String`: The credit card expiration date

#### Return

Returns an object with an `isValid` and several other info props with card information

- `isValid` - `Boolean`: The Boolean whether or not the value passed the validation
- `cardType` - `String`: The found card type
- `cvnType` - `String`: The found CVN type
- `expired` - `String`: A simple message on if the card is expired or not
- `info` - `String`: **Only has a string if what failed wasn't a rule**
    - Possible Values:
      - `'CVN does not match the found card type'`
      - `''` (If it passed, or if it was a validation rule that failed)

#### Usage

```js
import validate from 'simple-card/validate';

const cardObj = {
  number: '4111111111111111',
  cvn: '342',
  date: currentDate // A simple var which is a string for the current date
};

validate(cardObj); // => { isValid: true, cardType: 'visa', cvnType: 'norm', expired: 'Not Expired', info: '' }

const badCardObj = {
  number: '4111111111111111',
  cvn: '3432',
  date: currentDate // A simple var which is a string for the current date
}

validate(badCardObj); // => { isValid: false, cardType: 'visa', cvnType: 'norm', expired: 'Not Expired', info: 'CVN does not match the found card type' }

```

### number(cardNum)

This is the credit card number validation function, uses a luhn algorithm to strictly validate the number

#### Arguments

- `cardNum` - `String|Number`: The credit card number to validate

#### Return

Returns an object with an `isValid` prop and a `cardType` prop.

- `isValid` - `Boolean`: The Boolean whether or not the value passed the validation
- `cardType` - `String`: The info property is usually what comes back as the Card type
    - Possible Values:
      - `'visa'`: The card number is a `Visa` type of number
      - `'discover'`: The card number is a `Discover` type of number
      - `'master'`: The card number is a `Master Card` type of number
      - `'amex'`: The number is an `American Express` type of number
      - `'Invalid Card Number'`: The provided Number failed validation

#### Usage

```javascript
import number from 'simple-card/number';

number('4111111111111111'); // => { isValid: true, cardType: 'visa' }
number(4111111111111111); // => { isValid: true, cardType: 'visa' }
number('33222123'); // => { isValid: false, cardType: 'Invalid Card Number' }
number(33222123); // => { isValid: false, cardType: 'Invalid Card Number' }
```

### cvn(cardCvn)

This is the cvn or security code validation function. Its job essentially just makes sure its a correct length and doesn't contain any incorrect characters

#### Arguments

- `cardCVN` - `String|Number`: The CVN or security code to validate

#### Return

Returns an object with an `isValid` prop and a `cvnType` prop.

- `isValid` - `Boolean`: The Boolean whether or not the value passed the validation
- `cvnType` - `String`: The info property is usually what comes back as the CVN type
    - Possible Values:
      - `'norm'`: normal 3 digit code
      - `'amex'`: amex 4 digit code
      - `'Invalid CVN Code'`: The provided CVN failed validation

#### Usage

```javascript
import cvn from 'simple-card/cvn';

cvn('333'); // => { isValid: true, cvnType: 'norm' }
cvn(333); // => { isValid: true, cvnType: 'norm' }
cvn('4444'); // => { isValid: true, cvnType: 'amex' }
cvn(4444); // => { isValid: true, cvnType: 'amex' }
cvn('55555'); // => { isValid: false, cvnType: 'Invalid CVN Code' }
cvn(55555); // => { isValid: false, cvnType: 'Invalid CVN Code' }
```

### expired(date)

This function accepts a String of the card expiration date to validate if the card is currently expired or not

#### Arguments

- `date` - `String`: Must be a string this is the date we wish to validate

#### Return

Returns an object with an `isValid` prop and a `isExpired` prop.

- `isValid` - `Boolean`: The Boolean whether or not the value passed the validation
- `isExpired` - `Boolean`: Boolean for true if it is expired false if it isn't

#### Usage

```javascript
import expired from 'simple-card/expired';

// Assuming "currDate" is a variable that holds the current date in a XX/XX format
expired(currDate); // => { isValid: true, isExpired: false }
expired('01/18'); // => { isValid: false, isExpired: true }
```

### matches(cvn, cardNum)

This function takes the cvn and card number, fetches the card type from the number and then validates that the cvn matches up with the card type.

#### Arguments

- `cvn` - `String|Number`: The card cvn to compare with
- `cardNum` - `String|Number`: The cards number to use to fetch the type for comparison

#### Return

Returns an object with an `isValid` prop and a `match` prop.

- `isValid` - `Boolean`: The Boolean whether or not the value passed the validation
- `match` - `String`: The String reply on if the card type matches the cvn provided
    - Possible Values
      - `'card type matches cvn'` if the match is valid
      - `'cvn does not match card type'` if the match is invalid

#### Usage

```javascript
import matches from 'simple-card/matches';

// Assuming "amexCardNumber" is a valid American Express Credit Card Number
matches('333', '4111111111111111'); // => { isValid: true, match: 'card type matches cvn' }
matches(333, 4111111111111111); // => { isValid: true, match: 'card type matches cvn' }
matches('4444', amexCardNumber); // => { isValid: true, match: 'card type matches cvn' }
matches(4444, amexCardNumber); // => { isValid: true, match: 'card type matches cvn' }
matches('4444', '4111111111111111'); // => { isValid: false, match: 'cvn does not match card type' }
matches(4444, 4111111111111111); // => { isValid: false, match: 'cvn does not match card type' }
```
