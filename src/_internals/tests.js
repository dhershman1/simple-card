import { getCardType } from './index';
import test from 'ava';

test('Testing getCardType functionality', t => {
  const results = getCardType('4122027811098688');

  t.is(results, 'visa');
});
