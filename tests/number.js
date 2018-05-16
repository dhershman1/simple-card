import number from '../src/number'
import test from 'ava'

test('Test Single String Visa', t => {
  const { isValid, cardType } = number('4122027811098688')

  t.truthy(isValid, 'Is a valid Visa')
  t.is(cardType, 'visa', 'cardType returned as a visa')
})

test('Test Single String Discover', t => {
  const { isValid, cardType } = number('6011906326377506')

  t.truthy(isValid, 'Is a valid discover')
  t.is(cardType, 'discover', 'cardType returned as a discover')
})

test('Test Single String Master', t => {
  const { isValid, cardType } = number('5387109830289055')

  t.truthy(isValid, 'Is a valid master card')
  t.is(cardType, 'master', 'cardType returned as master')
})

test('Test Single String Amex', t => {
  const { isValid, cardType } = number('341258393919545')

  t.truthy(isValid, 'Is a valid Amex')
  t.is(cardType, 'amex', 'cardType returned as a amex')
})

test('Works with number types', t => {
  const { isValid, cardType } = number(4111111111111111)

  t.true(isValid)
  t.is(cardType, 'visa')
})

test('Throws type error when not given correct type', t => {
  const err = t.throws(() => {
    number([])
  }, TypeError)

  t.is(err.message, 'number should be a string or number type')
})
