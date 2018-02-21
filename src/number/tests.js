import number from './index';
import test from 'ava';

test('Test Single String Visa', t => {
  const results = number('4122027811098688');

  t.truthy(results);
  t.truthy(results.isValid, 'Is a valid Visa');
  t.is(results.info, 'visa', 'Info returned as a visa');

});

test('Test Single String Discover', t => {
  const results = number('6011906326377506');

  t.truthy(results);
  t.truthy(results.isValid, 'Is a valid discover');
  t.is(results.info, 'discover', 'Info returned as a discover');

});

test('Test Single String Master', t => {
  const results = number('5387109830289055');

  t.truthy(results);
  t.truthy(results.isValid, 'Is a valid master card');
  t.is(results.info, 'master', 'Info returned as master');

});

test('Test Single String Amex', t => {
  const results = number('341258393919545');

  t.truthy(results);
  t.truthy(results.isValid, 'Is a valid Amex');
  t.is(results.info, 'amex', 'Info returned as a amex');

});

test('Works with number types', t => {
  const results = number(4111111111111111);

  t.true(results.isValid);
  t.is(results.info, 'visa');
});
