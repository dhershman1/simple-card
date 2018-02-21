import expired from './index';
import test from 'ava';

test('Test Date validation', t => {
  const results = expired('09/20');

  t.truthy(results);
  t.true(results.isValid, 'Is a valid date');
  t.is(results.info, 'Not Expired');

});
