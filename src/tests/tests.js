const test = require('tape');
const simpleCard = require('../../dist/simple-card.umd.js');
const validData = {
	visaCard: {
		number: '4111111111111111',
		cvn: '342',
		expire: '09/20'
	},
	discoverCard: {
		number: '6111111111111111',
		cvn: '566',
		expire: '07/21'
	},
	masterCard: {
		number: '5511111111111111',
		cvn: '896',
		expire: '12/20'
	},
	amex: {
		number: '341111111111111',
		cvn: '2271',
		expire: '01/19'
	}
};

test('Test Partial Object No Date', t => {
	const result = simpleCard({
		number: '5511111111111111',
		cvn: '896'
	});

	t.ok(result);
	t.notOk(result.date.isValid, 'Date is not valid since one was not provided');
	t.ok(result.number.isValid, 'Card Number is valid');
	t.ok(result.cvn.isValid, 'CVN is valid');
	t.end();
});

test('Test Partial Object No Number', t => {
	const result = simpleCard({
		cvn: '896',
		expire: '01/19'
	});

	t.ok(result);
	t.ok(result.date.isValid, 'Date is valid');
	t.notOk(result.number.isValid, 'Card Number is invalid');
	t.ok(result.cvn.isValid, 'CVN is valid');
	t.end();
});

test('Test Partial Object No CVN', t => {
	const result = simpleCard({
		number: '5511111111111111',
		expire: '01/19'
	});

	t.ok(result);
	t.ok(result.date.isValid, 'Date is valid');
	t.ok(result.number.isValid, 'Card Number is valid');
	t.notOk(result.cvn.isValid, 'CVN is invalid');
	t.end();
});

test('Test visa setup', t => {
	const result = simpleCard(validData.visaCard);

	t.ok(result, 'Results came back');
	t.ok(result.number.isValid, 'Card Number Valid');
	t.ok(result.cvn.isValid, 'Card CVN Valid');
	t.ok(result.date.isValid, 'Card Date Valid');
	t.equal(result.number.info, 'visa', 'Validated as a Visa card');
	t.equal(result.cvn.info, 'norm', 'Validated with a normal cvn');
	t.equal(result.date.info, 'Not Expired', 'Validated as Not Expired');
	t.end();
});

test('Test discover setup', t => {
	const result = simpleCard(validData.discoverCard);

	t.ok(result, 'Results came back');
	t.ok(result.number.isValid, 'Card Number Valid');
	t.ok(result.cvn.isValid, 'Card CVN Valid');
	t.ok(result.date.isValid, 'Card Date Valid');
	t.equal(result.number.info, 'discover', 'Validated as a Discover card');
	t.equal(result.cvn.info, 'norm', 'Validated with a normal cvn');
	t.equal(result.date.info, 'Not Expired', 'Validated as Not Expired');
	t.end();
});

test('Test master card setup', t => {
	const result = simpleCard(validData.masterCard);

	t.ok(result, 'Results came back');
	t.ok(result.number.isValid, 'Card Number Valid');
	t.ok(result.cvn.isValid, 'Card CVN Valid');
	t.ok(result.date.isValid, 'Card Date Valid');
	t.equal(result.number.info, 'master', 'Validated as a Master card');
	t.equal(result.cvn.info, 'norm', 'Validated with a normal cvn');
	t.equal(result.date.info, 'Not Expired', 'Validated as Not Expired');
	t.end();
});

test('Test discover setup', t => {
	const result = simpleCard(validData.amex);

	t.ok(result, 'Results came back');
	t.ok(result.number.isValid, 'Card Number Valid');
	t.ok(result.cvn.isValid, 'Card Amex CVN Valid');
	t.ok(result.date.isValid, 'Card Date Valid');
	t.equal(result.number.info, 'amex', 'Validated as a Amex card');
	t.equal(result.cvn.info, 'amex', 'Validated with a Amex cvn');
	t.equal(result.date.info, 'Not Expired', 'Validated as Not Expired');
	t.end();
});

test('Test Single String Visa', t => {
	const results = simpleCard(validData.visaCard.number);

	t.ok(results);
	t.ok(results.isValid, 'Is a valid Visa');
	t.equal(results.info, 'visa', 'Info returned as a visa');
	t.end();
});

test('Test Single String Discover', t => {
	const results = simpleCard(validData.discoverCard.number);

	t.ok(results);
	t.ok(results.isValid, 'Is a valid discover');
	t.equal(results.info, 'discover', 'Info returned as a discover');
	t.end();
});

test('Test Single String Master', t => {
	const results = simpleCard(validData.masterCard.number);

	t.ok(results);
	t.ok(results.isValid, 'Is a valid master card');
	t.equal(results.info, 'master', 'Info returned as master');
	t.end();
});

test('Test Single String Amex', t => {
	const results = simpleCard(validData.amex.number);

	t.ok(results);
	t.ok(results.isValid, 'Is a valid Amex');
	t.equal(results.info, 'amex', 'Info returned as a amex');
	t.end();
});

test('Test CVN Normal', t => {
	const results = simpleCard('334');

	t.ok(results);
	t.ok(results.isValid, 'Is a valid cvn');
	t.equal(results.info, 'norm', 'Returned as a normal cvn');
	t.end();
});

test('Test CVN Amex', t => {
	const results = simpleCard('3534');

	t.ok(results);
	t.ok(results.isValid, 'Is a valid cvn');
	t.equal(results.info, 'amex', 'Returned as an amex cvn');
	t.end();
});

test('Test Date validation', t => {
	const results = simpleCard('09/20');

	t.ok(results);
	t.ok(results.isValid, 'Is a valid date');
	t.equal(results.info, 'Not Expired', 'Info returned as Not Expired');
	t.end();
});

test('Test Bad Card Number', t => {
	const results = simpleCard('7111111111111111');

	t.ok(results);
	t.notOk(results.isValid, 'This is an invalid card number');
	t.equal(results.info, 'Invalid Card Number', 'Info returned with invalid card number message');
	t.end();
});

test('Test Bad Card CVN', t => {
	const results = simpleCard('55');

	t.ok(results);
	t.notOk(results.isValid, 'This is an invalid card cvn');
	t.equal(results.info, 'Invalid CVN Code', 'Info returned with invalid cvn message');
	t.end();
});

test('Test Expired Date', t => {
	const results = simpleCard('08/16');

	t.ok(results);
	t.notOk(results.isValid, 'This is an Expired Date');
	t.equal(results.info, 'Expired', 'Info returned with expired message');
	t.end();
});
