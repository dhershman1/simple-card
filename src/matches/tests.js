import matches from './index';
import test from 'ava';

test('Matches normal cvn code with a valid card', t => {
  t.true(matches('333', '4111111111111111'));
});

test('Matches amex cvn with an amex card', t => {
  t.true(matches('4444', '341258393919545'));
});

test('Returns false when the match is invalid', t => {
  t.false(matches('333', '341258393919545'));
});

test('Works with number types', t => {

  t.true(matches(333, 4111111111111111));
});
