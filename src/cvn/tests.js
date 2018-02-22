import cvn from './index';
import test from 'ava';

test('Test CVN Normal', t => {
  const { isValid, info } = cvn('334');

  t.true(isValid, 'Is a valid cvn');
  t.is(info, 'norm', 'Returned as a normal cvn');

});

test('Test CVN Amex', t => {
  const { isValid, info } = cvn('3534');

  t.true(isValid, 'Is a valid cvn');
  t.is(info, 'amex', 'Returned as an amex cvn');

});

test('Works with number types', t => {
  const { isValid, info } = cvn(333);

  t.true(isValid);
  t.is(info, 'norm');
});

test('Amex works with number types', t => {
  const { isValid, info } = cvn(3333);

  t.true(isValid);
  t.is(info, 'amex');
});

test('Returns invalid with bad CVN code', t => {
  const { isValid, info } = cvn('22');

  t.false(isValid);
  t.is(info, 'Invalid CVN Code');
});

test('Throws type error when not given correct type', t => {
  const err = t.throws(() => {
    cvn([]);
  }, TypeError);

  t.is(err.message, 'cvn should be a string or number type');
});
