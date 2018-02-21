import cvn from './index';
import test from 'ava';

test('Test CVN Normal', t => {
  const results = cvn('334');

  t.truthy(results);
  t.truthy(results.isValid, 'Is a valid cvn');
  t.is(results.info, 'norm', 'Returned as a normal cvn');

});

test('Test CVN Amex', t => {
  const results = cvn('3534');

  t.truthy(results);
  t.truthy(results.isValid, 'Is a valid cvn');
  t.is(results.info, 'amex', 'Returned as an amex cvn');

});

test('Works with number types', t => {
  const results = cvn(333);

  t.true(results.isValid);
  t.is(results.info, 'norm');
});
