import { getCardType, isObject, organizeResults } from './index';
import test from 'ava';

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
    number: {
      isValid: true,
      info: 'visa'
    },
    cvn: {
      isValid: true,
      info: 'norm'
    },
    expired: {
      isValid: true,
      info: false
    }
  };

  t.deepEqual(organizeResults(validObj, true), {
    isValid: true,
    cardType: 'visa',
    cvnType: 'norm',
    expired: false
  });
});
