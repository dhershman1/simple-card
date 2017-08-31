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

test('Test normal setup', t => {
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
