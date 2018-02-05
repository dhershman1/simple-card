import { extend, getCardType, isObject, organizeResults } from './index';
import test from 'ava';

test('Testing extend functionality', t => {
  const results = extend({ test: 1 }, { thing: 2 });

  t.deepEqual(results, {
    test: 1,
    thing: 2
  });
});

test('Testing getCardType functionality', t => {
  const results = getCardType('4122027811098688');

  t.is(results, 'visa');
});

test('Testing isObject functionality', t => {
  t.truthy(isObject({}));
  t.falsy(isObject([]));
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
