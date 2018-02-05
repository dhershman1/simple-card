import simpleCard from '../index';
import test from 'ava';

const today = new Date();
const currDate = `${today.getMonth() + 1}/${today.getFullYear}`;
const validData = {
  visaCard: {
    number: '4122027811098688',
    cvn: '342',
    expire: currDate
  },
  discoverCard: {
    number: '6011906326377506',
    cvn: '566',
    expire: currDate
  },
  masterCard: {
    number: '5387109830289055',
    cvn: '896',
    expire: currDate
  },
  amex: {
    number: '341258393919545',
    cvn: '2271',
    expire: currDate
  }
};

test('Test Partial Object No Date', t => {
  const result = simpleCard({
    number: '5387109830289055',
    cvn: '893'
  });

  t.truthy(result);
  t.falsy(result.isValid, 'Date is not valid since one was not provided');
  t.is(result.cardType, 'master', 'Validated as a Master card');
  t.is(result.cvnType, 'norm', 'Validated with a normal cvn');

});

test('Test Partial Object No Number', t => {
  const result = simpleCard({
    cvn: '896',
    expire: currDate
  });

  t.truthy(result);
  t.falsy(result.isValid, 'Invalid Since not all data was provided');
  t.is(result.cvnType, 'norm', 'Validated with a normal cvn');
  t.falsy(result.expired, 'Validated as Not Expired');

});

test('Test Partial Object No CVN', t => {
  const result = simpleCard({
    number: '5387109830289055',
    expire: currDate
  });

  t.truthy(result);
  t.falsy(result.isValid, 'Invalid Since not all data was provided');
  t.is(result.cardType, 'master', 'Validated as a Master card');
  t.falsy(result.expired, 'Validated as Not Expired');

});

test('Test visa setup', t => {
  const result = simpleCard(validData.visaCard);

  t.truthy(result, 'Results came back');
  t.truthy(result.isValid, 'Card Number Valid');
  t.is(result.cardType, 'visa', 'Validated as a Visa card');
  t.is(result.cvnType, 'norm', 'Validated with a normal cvn');
  t.falsy(result.expired, 'Validated as Not Expired');

});

test('Test discover setup', t => {
  const result = simpleCard(validData.discoverCard);

  t.truthy(result, 'Results came back');
  t.truthy(result.isValid, 'Card Number Valid');
  t.is(result.cardType, 'discover', 'Validated as a Discover card');
  t.is(result.cvnType, 'norm', 'Validated with a normal cvn');
  t.falsy(result.expired, 'Validated as Not Expired');

});

test('Test master card setup', t => {
  const result = simpleCard(validData.masterCard);

  t.truthy(result, 'Results came back');
  t.truthy(result.isValid, 'Card Number Valid');
  t.is(result.cardType, 'master', 'Validated as a Master card');
  t.is(result.cvnType, 'norm', 'Validated with a normal cvn');
  t.falsy(result.expired, 'Validated as Not Expired');

});

test('Test discover setup', t => {
  const result = simpleCard(validData.amex);

  t.truthy(result, 'Results came back');
  t.truthy(result.isValid, 'Card Number Valid');
  t.is(result.cardType, 'amex', 'Validated as a Amex card');
  t.is(result.cvnType, 'amex', 'Validated with a Amex cvn');
  t.falsy(result.expired, 'Validated as Not Expired');

});

test('Test Single String Visa', t => {
  const results = simpleCard(validData.visaCard.number);

  t.truthy(results);
  t.truthy(results.isValid, 'Is a valid Visa');
  t.is(results.info, 'visa', 'Info returned as a visa');

});

test('Test Single String Discover', t => {
  const results = simpleCard(validData.discoverCard.number);

  t.truthy(results);
  t.truthy(results.isValid, 'Is a valid discover');
  t.is(results.info, 'discover', 'Info returned as a discover');

});

test('Test Single String Master', t => {
  const results = simpleCard(validData.masterCard.number);

  t.truthy(results);
  t.truthy(results.isValid, 'Is a valid master card');
  t.is(results.info, 'master', 'Info returned as master');

});

test('Test Single String Amex', t => {
  const results = simpleCard(validData.amex.number);

  t.truthy(results);
  t.truthy(results.isValid, 'Is a valid Amex');
  t.is(results.info, 'amex', 'Info returned as a amex');

});

test('Test CVN Normal', t => {
  const results = simpleCard('334');

  t.truthy(results);
  t.truthy(results.isValid, 'Is a valid cvn');
  t.is(results.info, 'norm', 'Returned as a normal cvn');

});

test('Test CVN Amex', t => {
  const results = simpleCard('3534');

  t.truthy(results);
  t.truthy(results.isValid, 'Is a valid cvn');
  t.is(results.info, 'amex', 'Returned as an amex cvn');

});

test('Test Date validation', t => {
  const results = simpleCard('09/20');

  t.truthy(results);
  t.truthy(results.isValid, 'Is a valid date');
  t.falsy(results.info, 'Info returned as Not Expired');

});

test('Test Bad Card Number', t => {
  const results = simpleCard('7111111111111111');

  t.truthy(results);
  t.falsy(results.isValid, 'This is an invalid card number');
  t.is(results.info, 'Invalid Card Number', 'Info returned with invalid card number message');

});

test('Test Bad Card CVN', t => {
  const results = simpleCard('55');

  t.truthy(results);
  t.falsy(results.isValid, 'This is an invalid card cvn');
  t.is(results.info, 'Invalid CVN Code', 'Info returned with invalid cvn message');

});

test('Test Expired Date', t => {
  const results = simpleCard('08/16');

  t.truthy(results);
  t.falsy(results.isValid, 'This is an Expired Date');
  t.truthy(results.info, 'Info returned expired');

});

test('Test bad match CVN & Card', t => {
  const results = simpleCard({
    number: '4122027811098688',
    cvn: '3442',
    expire: currDate
  });

  t.truthy(results);
  t.falsy(results.isValid);
  t.is(results.cvnType.toLowerCase(), 'invalid cvn code', '4 digit cvv does not match a visa card');
  t.is(results.cardType, 'visa', 'It is a visa card');

});

test('Test bad match CVN & Visa default test number', t => {
  const results = simpleCard({
    number: '4111111111111111',
    cvn: '3442',
    expire: currDate
  });

  t.truthy(results);
  t.falsy(results.isValid);
  t.is(results.cvnType.toLowerCase(), 'invalid cvn code', '4 digit cvv does not match a visa card');
  t.is(results.cardType, 'visa', 'It is a visa card');

});

test('Test sanitize data', t => {
  const results = simpleCard({
    number: '4111 1111 1111 1111',
    cvn: '344',
    expire: currDate
  });

  t.truthy(results);
  t.truthy(results.isValid);
  t.is(results.cvnType, 'norm', 'Valid CVN returned');
  t.is(results.cardType, 'visa', 'It is a visa card');
  t.falsy(results.expire, 'Card is not expired');

});


test('Test bad match CVN & sanitize data', t => {
  const results = simpleCard({
    number: '4111 1111 1111 1111',
    cvn: '3442',
    expire: currDate
  });

  t.truthy(results);
  t.falsy(results.isValid);
  t.is(results.cvnType.toLowerCase(), 'invalid cvn code', '4 digit cvv does not match a visa card');
  t.is(results.cardType, 'visa', 'It is a visa card');
  t.falsy(results.expire, 'Card is not expired');

});

test('Test to make sure current date is not expired', t => {
  const results = simpleCard(currDate);

  t.truthy(results);
  t.truthy(results.isValid);

});

// Testing type errors are being thrown

test('Test to make sure card number throws a type error on validation', t => {
  const error = t.throws(() => {
    simpleCard({
      number: ['4111 1111 1111 1111'],
      cvn: '344',
      expire: currDate
    });
  }, TypeError);

  t.truthy(error);
  t.is(error.message, 'number is not the proper type String');
});

test('Test to make sure card CVN throws a type error on validation', t => {
  const error = t.throws(() => {
    simpleCard({
      number: '4111 1111 1111 1111',
      cvn: ['344'],
      expire: currDate
    });
  }, TypeError);

  t.truthy(error);
  t.is(error.message, 'cvn is not the proper type String');
});

test('Test to make sure card number throws a type error on validation', t => {
  const error = t.throws(() => {
    simpleCard({
      number: '4111 1111 1111 1111',
      cvn: '344',
      expire: [currDate]
    });
  }, TypeError);

  t.truthy(error);
  t.is(error.message, 'expire is not the proper type String');
});
