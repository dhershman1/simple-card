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

test('Throws type error when both arguments are not the correct type', t => {
  const err = t.throws(() => {
    matches([], {});
  }, TypeError);

  t.is(err.message, 'cvn and card number should be string or number types');
});

test('Throws type error when one of the arguments is not the correct type', t => {
  const err = t.throws(() => {
    matches(333, {});
  }, TypeError);

  t.is(err.message, 'cvn and card number should be string or number types');
});

