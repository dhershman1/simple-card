import simpleCard from './index';
import test from 'ava';

const today = new Date();
const currDate = `${today.getMonth() + 1}/${today.getFullYear}`;

const validData = {
  visaCard: {
    number: '4122027811098688',
    cvn: '342',
    date: currDate
  },
  discoverCard: {
    number: '6011906326377506',
    cvn: '566',
    date: currDate
  },
  masterCard: {
    number: '5387109830289055',
    cvn: '896',
    date: currDate
  },
  amex: {
    number: '341258393919545',
    cvn: '2271',
    date: currDate
  }
};

test('Test visa setup', t => {
  const result = simpleCard(validData.visaCard);

  t.truthy(result, 'Results came back');
  t.true(result.isValid, 'Card Number Valid');
  t.is(result.cardType, 'visa', 'Validated as a Visa card');
  t.is(result.cvnType, 'norm', 'Validated with a normal cvn');
  t.is(result.expired, 'Not Expired');

});

test('Test discover setup', t => {
  const result = simpleCard(validData.discoverCard);

  t.truthy(result, 'Results came back');
  t.true(result.isValid, 'Card Number Valid');
  t.is(result.cardType, 'discover', 'Validated as a Discover card');
  t.is(result.cvnType, 'norm', 'Validated with a normal cvn');
  t.is(result.expired, 'Not Expired');

});

test('Test master card setup', t => {
  const result = simpleCard(validData.masterCard);

  t.truthy(result, 'Results came back');
  t.true(result.isValid, 'Card Number Valid');
  t.is(result.cardType, 'master', 'Validated as a Master card');
  t.is(result.cvnType, 'norm', 'Validated with a normal cvn');
  t.is(result.expired, 'Not Expired');

});

test('Test amex card setup', t => {
  const result = simpleCard(validData.amex);

  t.truthy(result, 'Results came back');
  t.true(result.isValid, 'Card Number Valid');
  t.is(result.cardType, 'amex', 'Validated as a Amex card');
  t.is(result.cvnType, 'amex', 'Validated with a Amex cvn');
  t.is(result.expired, 'Not Expired');

});

test('Test bad match CVN & Card', t => {
  const results = simpleCard({
    number: '4122027811098688',
    cvn: '3442',
    date: currDate
  });

  t.truthy(results);
  t.false(results.isValid);
  t.is(results.cvnType, 'amex', '4 digit cvv does not match a visa card');
  t.is(results.cardType, 'visa', 'It is a visa card');
  t.is(results.info, 'CVN does not match the found card type');

});

test('Test bad match CVN & Visa default test number', t => {
  const results = simpleCard({
    number: '4111111111111111',
    cvn: '3442',
    date: currDate
  });

  t.truthy(results);
  t.false(results.isValid);
  t.is(results.cvnType, 'amex', '4 digit cvv does not match a visa card');
  t.is(results.cardType, 'visa', 'It is a visa card');
  t.is(results.info, 'CVN does not match the found card type');

});

test('Test sanitize data', t => {
  const results = simpleCard({
    number: '4111 1111 1111 1111',
    cvn: '344',
    date: currDate
  });

  t.truthy(results);
  t.true(results.isValid);
  t.is(results.cvnType, 'norm', 'Valid CVN returned');
  t.is(results.cardType, 'visa', 'It is a visa card');
  t.falsy(results.expire, 'Card is not expired');

});
