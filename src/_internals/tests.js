import {
  extend, generateDate, getCardType, isObject, luhnChk, matchesCardType, normalizeDate, organizeResults, validateType
} from './index';
import test from 'ava';

test('Testing extend functionality', t => {
  const results = extend({ test: 1 }, { thing: 2 });

  t.deepEqual(results, {
    test: 1,
    thing: 2
  });
});

test('Testing generateDate functionality', t => {
  const results = generateDate();
  const dateObj = new Date();

  t.deepEqual(results, new Date(`${dateObj.getMonth() + 1}/1/${dateObj.getFullYear()}`));
});

test('Testing getCardType functionality', t => {
  const results = getCardType('4122027811098688');

  t.is(results, 'visa');
});

test('Testing isObject functionality', t => {
  t.truthy(isObject({}));
  t.falsy(isObject([]));
});

test('Testing luhnCheck functionality', t => {
  t.truthy(luhnChk('4122027811098688'));
  t.falsy(luhnChk('4'));
});

test('Testing matchesCardType functionality', t => {
  t.truthy(matchesCardType('333', { info: 'visa' }));
  t.truthy(matchesCardType('3333', { info: 'amex' }));
  t.falsy(matchesCardType('333', { info: 'amex' }));
  t.falsy(matchesCardType('3333', { info: 'visa' }));
});

test('Testing normalizeDate functionality', t => {
  t.is(normalizeDate('1/19'), '1/1/2019');
  t.is(normalizeDate('1 / 19'), '1/1/2019');
  t.is(normalizeDate('1-19'), '1/1/2019');
});

test('Testing organizeResults functionality', t => {
  const validObj = {
    validNumber: {
      isValid: true,
      info: 'visa'
    },
    validCVN: {
      isValid: true,
      info: 'norm'
    },
    validDate: {
      isValid: true,
      info: false
    }
  };

  t.deepEqual(organizeResults(validObj), {
    isValid: true,
    cardType: 'visa',
    cvnType: 'norm',
    expired: false
  });
});

test('Test validateType functionality', t => {
  t.is(validateType('1/19'), 'validDate');
  t.is(validateType('4122027811098688'), 'validNumber');
  t.is(validateType('333'), 'validCVN');
});
