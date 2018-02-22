import expired from './index';
import test from 'ava';

const today = new Date();

test('Test Date validation', t => {
  const { isValid, info } = expired(`${today.getMonth() + 1}/${today.getFullYear}`);

  t.true(isValid, 'Is a valid date');
  t.is(info, 'Not Expired');
});

test('Returns as invalid when given expired date', t => {
  const { isValid, info } = expired('01/17');

  t.false(isValid);
  t.is(info, 'Is Expired');
});

test('Throws type error when not given correct type', t => {
  const err = t.throws(() => {
    expired([]);
  }, TypeError);

  t.is(err.message, 'date should be a string type');
});

test('Throws type error when given date object', t => {
  const err = t.throws(() => {
    expired(today);
  }, TypeError);

  t.is(err.message, 'date should be a string type');
});
